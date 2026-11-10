import codecs
import html
import json
import os
import re
import urllib.request
import time
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images" / "core-groups"
OUTPUT = ROOT / "src" / "data" / "coreGroupsOfficial.json"

GROUPS = [
    ("Community Nutrition", "community-nutrtion"),
    ("Nutrition and Diabetes India", "core-groups-diabetes-india"),
    ("Critical Care", "critical-care"),
    ("Digitization in Nutrition", "digitization-in-nutrition"),
    ("Dysphagia", "dysphagia-core-group"),
    ("ERAS Core Group", "eras-core-group"),
    ("Fertility and Maternal Nutrition", "fertility-maternal-nutrition"),
    ("Gastrointestinal Nutrition", "gastrointestinal-nutrition"),
    ("Geriatric Nutrition", "geriatric-nutrition"),
    ("Hypertension Core Group", "hypertension-core-group"),
    ("Integrated Nutrition and Dietetics", "integrated-nutrition-and-dietetics"),
    ("Metabolic Syndrome and Nutrition", "metabolic-syndrome-and-nutrition"),
    ("Neuro Nutrition", "neuro-nutrition"),
    ("Nutrition in Transplant", "nutrition-in-transplant"),
    ("ONCO Core Group", "onco-core"),
    ("Pediatric Core Group", "pediatric-core-group"),
    ("Renal Core Group", "renal-core-group-iapen"),
]

HEADERS = {"User-Agent": "Mozilla/5.0 (IAPEN India website content sync)"}


def fetch(url):
    last_error = None
    for attempt in range(5):
        try:
            request = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read()
        except Exception as error:
            last_error = error
            time.sleep(2 + attempt * 2)
    raise last_error


def _cp1252_fallback(error):
    bad = error.object[error.start:error.end]
    return bad.decode("cp1252", errors="replace"), error.end


codecs.register_error("cp1252_fallback", _cp1252_fallback)


def decode_page(raw):
    # Some pages mix UTF-8 with stray Windows-1252 bytes (e.g. "M\xe9dical").
    return raw.decode("utf-8", errors="cp1252_fallback")


def clean_markup(value):
    value = re.sub(r"<li[^>]*>", "\n• ", value, flags=re.I)
    value = re.sub(r"</?(?:ul|ol|li|div|h\d)[^>]*>", "\n", value, flags=re.I)
    value = re.sub(r"<\s*br\s*/?\s*>", "\n", value, flags=re.I)
    value = re.sub(r"</?p[^>]*>", "\n", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    lines = [re.sub(r"\s+", " ", line).strip() for line in value.splitlines()]
    lines = [line for line in lines if line]
    merged = []
    for line in lines:
        # A bullet whose text sat inside a nested tag ends up alone; join it to that text.
        if merged and merged[-1] == "•":
            merged[-1] = line if line.startswith("•") else f"• {line}"
        else:
            merged.append(line)
    return "\n".join(line for line in merged if line != "•")


def parse_members(page):
    starts = [match.start() for match in re.finditer(r'<div[^>]+class="[^"]*elementor-image-box-wrapper[^"]*"', page, re.I)]
    members = []
    for index, start in enumerate(starts):
        end = starts[index + 1] if index + 1 < len(starts) else min(len(page), start + 30000)
        block = page[start:end]
        image_match = re.search(r'<img[^>]+src="([^"]+)"', block, re.I)
        title_match = re.search(r'<h3[^>]*class="[^"]*elementor-image-box-title[^"]*"[^>]*>(.*?)</h3>', block, re.I | re.S)
        # The bio is everything after the title up to the end of the content box. Some
        # profiles leave the <p> description empty and put the bio in a sibling <ul>.
        description_match = re.search(r'elementor-image-box-title[^>]*>.*?</h3>(.*?)</div>', block, re.I | re.S)
        if not title_match:
            continue
        title = clean_markup(title_match.group(1))
        description = clean_markup(description_match.group(1)) if description_match else ""
        image_url = html.unescape(image_match.group(1)) if image_match else ""
        members.append({"title": title, "details": description, "imageUrl": image_url})
    return members


EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
MEMBERS = object()
# Labels that only introduce the member grid, which the site renders on its own.
TRAILING_MEMBER_LABEL = re.compile(r"\n?meet (?:the|our) team\s*:?\s*$", re.I)
MEMBER_LABEL = re.compile(r"^(meet (?:the|our) team|executive members|core group members|members|mentor)\s*:?$", re.I)
CONTACT_LINE = re.compile(r"^please\s+(contact|email)\s+us\b", re.I)


def upload_path(url):
    """The /wp-content/... path of an upload, whether served directly or via the Jetpack CDN."""
    return re.sub(r"^/iapenindia\.org", "", urlparse(html.unescape(url)).path)


def image_key(url):
    """Identify an upload regardless of CDN host, resize query or WordPress size suffix."""
    return re.sub(r"-\d+x\d+(?=\.\w+$)", "", upload_path(url)).lower()


def widget_segments(page):
    """Yield (widget_type, html) for each Elementor widget, in page order."""
    page = page.split("<footer", 1)[0]
    marks = [(m.group(1), page.rfind("<div", 0, m.start())) for m in re.finditer(r'data-widget_type="([^"]+)"', page)]
    for index, (kind, start) in enumerate(marks):
        end = marks[index + 1][1] if index + 1 < len(marks) else len(page)
        yield kind.split(".")[0], page[start:end]


def segment_images(segment):
    images = []
    for tag in re.findall(r"<img[^>]+>", segment, re.I):
        attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
        src = attrs.get("data-src") or attrs.get("data-lazy-src") or attrs.get("src", "")
        if not src or src.startswith("data:"):
            continue
        images.append({"url": html.unescape(src), "alt": html.unescape(attrs.get("alt", "")).strip()})
    return images


def parse_content(page, slug, member_photo_keys):
    """Copy the page's own text, galleries and videos (everything except member cards), de-duplicated."""
    # Blocks in page order; MEMBERS marks where each member card sat.
    target, seen_text, seen_images = [], set(), set(member_photo_keys)
    page_title, email = "", ""
    for kind, segment in widget_segments(page):
        if kind == "image-box":
            target.append(MEMBERS)
            continue
        if kind in {"heading", "text-editor"}:
            text = TRAILING_MEMBER_LABEL.sub("", clean_markup(segment)).strip()
            if kind == "heading" and not page_title:
                page_title = text
                continue
            found = EMAIL.search(text)
            if found and not email:
                email = found.group(0)
            if not text or MEMBER_LABEL.match(text) or CONTACT_LINE.match(text):
                continue
            key = re.sub(r"\W+", " ", text).strip().lower()
            if key in seen_text:
                continue
            seen_text.add(key)
            # Long paragraphs styled as headings on the live site read better as body text.
            is_heading = kind == "heading" and len(text) <= 120
            target.append({"type": "heading" if is_heading else "text", "text": text})
        elif kind in {"image", "image-gallery", "image-carousel"}:
            images = []
            for image in segment_images(segment):
                key = image_key(image["url"])
                if key in seen_images:
                    continue
                seen_images.add(key)
                images.append({"src": download_content_image(image["url"], slug), "alt": image["alt"]})
            if images:
                # Consecutive single-image widgets read as one gallery.
                if target and target[-1] is not MEMBERS and target[-1]["type"] == "gallery" and kind == "image":
                    target[-1]["images"].extend(images)
                else:
                    target.append({"type": "gallery", "images": images})
        elif kind == "video":
            settings = html.unescape(re.search(r'data-settings="([^"]*)"', segment).group(1))
            url = json.loads(settings).get("youtube_url", "")
            video_id = re.search(r"(?:v=|youtu\.be/|embed/)([\w-]{11})", url)
            if video_id and video_id.group(1) not in seen_text:
                seen_text.add(video_id.group(1))
                target.append({"type": "video", "youtubeId": video_id.group(1)})
    # A heading directly followed by a member card is a grid label ("Founder", "Research Committee").
    target = [
        block for index, block in enumerate(target)
        if block is MEMBERS or block["type"] != "heading"
        or index + 1 >= len(target) or target[index + 1] is not MEMBERS
    ]
    marks = [index for index, block in enumerate(target) if block is MEMBERS]
    if not marks:
        return {"pageTitle": page_title, "email": email, "intro": target, "activities": []}
    first, last = marks[0], marks[-1]
    between = [block for block in target[first:last] if block is not MEMBERS]
    return {
        "pageTitle": page_title,
        "email": email,
        "intro": target[:first],
        "activities": between + target[last + 1:],
    }


def download_content_image(url, slug):
    path = upload_path(url)
    # Keep the upload year/month so same-named files from different months don't collide.
    filename = re.sub(r"[^a-z0-9._-]", "-", path.lower().split("/uploads/")[-1].strip("/"))
    folder = IMAGE_DIR / "content" / slug
    folder.mkdir(parents=True, exist_ok=True)
    destination = folder / filename
    if not destination.exists():
        # Fetch through the CDN capped at 1200px wide rather than the full-size original.
        destination.write_bytes(fetch(f"https://i0.wp.com/iapenindia.org{path}?w=1200&ssl=1"))
    return f"/images/core-groups/content/{slug}/{filename}"


def member_key(title):
    name = title.split("\n")[-1]
    name = re.sub(r"^(dr|mr|mrs|ms|prof)\.?\s+", "", name.strip(), flags=re.I)
    return re.sub(r"[^a-z]", "", name.lower())


def dedupe_members(members):
    """Collapse people listed more than once on a page into one profile, joining their roles."""
    seen = {}
    for member in members:
        key = member_key(member["title"])
        if key not in seen:
            seen[key] = member
            continue
        kept = seen[key]
        kept_lines, new_lines = kept["title"].split("\n"), member["title"].split("\n")
        if len(kept_lines) > 1 and len(new_lines) > 1 and new_lines[0] not in kept_lines[0]:
            kept["title"] = f"{kept_lines[0]} / {new_lines[0]}\n{kept_lines[-1]}"
        if len(member["details"]) > len(kept["details"]):
            kept["details"] = member["details"]
        if not kept.get("imageUrl"):
            kept["imageUrl"] = member.get("imageUrl", "")
    return list(seen.values())


def fetch_page(slug):
    cache = os.environ.get("CORE_GROUP_PAGE_CACHE")
    if cache and (Path(cache) / f"{slug}.html").exists():
        return (Path(cache) / f"{slug}.html").read_text(encoding="utf-8")
    page = decode_page(fetch(f"https://iapenindia.org/{slug}/"))
    if parse_members(page):
        return page
    # Some group pages are still published but no longer served at their public URL.
    api = f"https://iapenindia.org/wp-json/wp/v2/pages?slug={slug}&_fields=content"
    pages = json.loads(fetch(api))
    return pages[0]["content"]["rendered"] if pages else page


def download_member_image(url, slug, index):
    if not url:
        return ""
    clean_url = html.unescape(url)
    extension = Path(urlparse(clean_url).path).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        extension = ".jpg"
    filename = f"{slug}-{index + 1}{extension}"
    destination = IMAGE_DIR / filename
    # Always refresh: files are named by position, so a reordered page must not keep stale photos.
    destination.write_bytes(fetch(clean_url))
    return f"/images/core-groups/{filename}"


def main():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    result = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else []
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    batch_size = int(sys.argv[2]) if len(sys.argv) > 2 else len(GROUPS)
    for name, slug in GROUPS[start:start + batch_size]:
        try:
            url = f"https://iapenindia.org/{slug}/"
            page = fetch_page(slug)
            members = dedupe_members(parse_members(page))
            photo_keys = {image_key(member["imageUrl"]) for member in members if member.get("imageUrl")}
            content = parse_content(page, slug, photo_keys)
            for index, member in enumerate(members):
                try:
                    member["image"] = download_member_image(member.pop("imageUrl"), slug, index)
                except Exception as error:
                    member["image"] = ""
                    print(f"  image failed: {member['title']} ({error})", flush=True)
            record = {"name": name, "source": url, "pageTitle": content["pageTitle"], "email": content["email"],
                      "intro": content["intro"], "members": members, "activities": content["activities"]}
            result = [group for group in result if group["name"] != name]
            result.append(record)
            result.sort(key=lambda group: [item[0] for item in GROUPS].index(group["name"]))
            OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
            blocks = len(content["intro"]) + len(content["activities"])
            print(f"{name}: {len(members)} members, {blocks} content blocks", flush=True)
        except Exception as error:
            print(f"{name}: FAILED ({error!r})", flush=True)
        time.sleep(2)  # the live site starts returning 503s under rapid requests


if __name__ == "__main__":
    main()
