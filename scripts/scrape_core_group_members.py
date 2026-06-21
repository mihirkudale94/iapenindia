import html
import json
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


def clean_markup(value):
    value = re.sub(r"<\s*br\s*/?\s*>", "\n", value, flags=re.I)
    value = re.sub(r"</?p[^>]*>", "\n", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    lines = [re.sub(r"\s+", " ", line).strip() for line in value.splitlines()]
    return "\n".join(line for line in lines if line)


def parse_members(page):
    starts = [match.start() for match in re.finditer(r'<div[^>]+class="[^"]*elementor-image-box-wrapper[^"]*"', page, re.I)]
    members = []
    for index, start in enumerate(starts):
        end = starts[index + 1] if index + 1 < len(starts) else min(len(page), start + 30000)
        block = page[start:end]
        image_match = re.search(r'<img[^>]+src="([^"]+)"', block, re.I)
        title_match = re.search(r'<h3[^>]*class="[^"]*elementor-image-box-title[^"]*"[^>]*>(.*?)</h3>', block, re.I | re.S)
        description_match = re.search(r'<p[^>]*class="[^"]*elementor-image-box-description[^"]*"[^>]*>(.*?)(?:</p>|</div>)', block, re.I | re.S)
        if not title_match:
            continue
        title = clean_markup(title_match.group(1))
        description = clean_markup(description_match.group(1)) if description_match else ""
        image_url = html.unescape(image_match.group(1)) if image_match else ""
        members.append({"title": title, "details": description, "imageUrl": image_url})
    return members


def download_member_image(url, slug, index):
    if not url:
        return ""
    clean_url = html.unescape(url)
    extension = Path(urlparse(clean_url).path).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        extension = ".jpg"
    filename = f"{slug}-{index + 1}{extension}"
    destination = IMAGE_DIR / filename
    if not destination.exists():
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
            page = fetch(url).decode("utf-8", errors="replace")
            members = parse_members(page)
            for index, member in enumerate(members):
                try:
                    member["image"] = download_member_image(member.pop("imageUrl"), slug, index)
                except Exception as error:
                    member["image"] = ""
                    print(f"  image failed: {member['title']} ({error})", flush=True)
            result = [group for group in result if group["name"] != name]
            result.append({"name": name, "source": url, "members": members})
            result.sort(key=lambda group: [item[0] for item in GROUPS].index(group["name"]))
            OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"{name}: {len(members)} members", flush=True)
        except Exception as error:
            print(f"{name}: FAILED ({error})", flush=True)


if __name__ == "__main__":
    main()
