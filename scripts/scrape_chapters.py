import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

from scrape_core_group_members import fetch, parse_members

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images" / "chapters"
OUTPUT = ROOT / "src" / "data" / "chaptersOfficial.json"

CHAPTERS = [
    ("Ahmedabad Chapter", "ahmedabad-chapter"), ("Bangaluru Chapter", "bangaluru-chapter"),
    ("Bhopal Chapter", "bhopal-chapter"), ("Bhubaneswar Chapter", "bhubaneswar-chapter"),
    ("Chandigarh Chapter", "chandigarh-chapter"), ("Chennai Chapter", "chennai-chapter"),
    ("Cochin Chapter", "cochin-chapter"), ("Coimbatore Chapter", "coimbatore-chapter"),
    ("Delhi Chapter", "delhi-chapter"), ("Etawah Chapter", "etawah-chapter"),
    ("Faridabad Chapter", "faridabad-chapter"), ("Guwahati Chapter", "guwahati-chapter"),
    ("Hyderabad Chapter", "hyderabad-chapter"), ("Indore Chapter", "indore-chapter"),
    ("Kannur Chapter", "kannur-chapter"), ("Kolkata Chapter", "kolkata-chapter"),
    ("Lucknow Chapter", "lucknow-chapter"), ("Ludhiana Chapter", "ludhiana-chapter"),
    ("Mangaluru Chapter", "mangaluru-chapter"), ("Meerut Chapter", "meerut-chapter"),
    ("Mumbai Chapter", "mumbai-chapter"), ("Nagpur Chapter", "nagpur-chapter"),
    ("Nashik Chapter", "nashik-chapter"), ("Navi Mumbai Chapter", "navi-mumbai-chapter"),
    ("Patna Chapter", "patna-chapter"), ("Prayagraj Chapter", "prayagraj-chapter"),
    ("Puducherry Chapter", "puducherry-chapter"), ("Pune Chapter", "pune-chapter"),
    ("Raipur Chapter", "raipur-chapter"), ("Ranchi Chapter", "ranchi-chapter"),
    ("Sambhajinagar Chapter", "sambhajinagar-chapter"), ("Surat Chapter", "surat-chapter"),
    ("Vadodara Chapter", "vadodara-chapter"), ("Varanasi Chapter", "varanasi-chapter"),
    ("Vijayawada Chapter", "vijayawada-chapter"), ("Vizag Chapter", "vizag-chapter"),
]


def download(url, slug, index):
    if not url:
        return ""
    extension = Path(urlparse(url).path).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        extension = ".jpg"
    filename = f"{slug}-{index + 1}{extension}"
    destination = IMAGE_DIR / filename
    if not destination.exists():
        destination.write_bytes(fetch(url))
    return f"/images/chapters/{filename}"


def main():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    result = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else []
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    size = int(sys.argv[2]) if len(sys.argv) > 2 else len(CHAPTERS)

    for name, slug in CHAPTERS[start:start + size]:
        try:
            source = f"https://iapenindia.org/{slug}/"
            page = fetch(source).decode("utf-8", errors="replace")
            members = parse_members(page)
            for index, member in enumerate(members):
                try:
                    member["image"] = download(member.pop("imageUrl"), slug, index)
                except Exception as error:
                    member["image"] = ""
                    print(f"  image failed: {member['title']} ({error})", flush=True)
            emails = list(dict.fromkeys(html.unescape(value) for value in re.findall(r'href=["\']mailto:([^"\']+)', page, re.I)))
            record = {"name": name, "slug": slug, "source": source, "email": emails[0] if emails else "", "members": members}
            result = [chapter for chapter in result if chapter["name"] != name]
            result.append(record)
            result.sort(key=lambda chapter: [item[0] for item in CHAPTERS].index(chapter["name"]))
            OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"{name}: {len(members)} profiles", flush=True)
        except Exception as error:
            print(f"{name}: FAILED ({error})", flush=True)


if __name__ == "__main__":
    main()
