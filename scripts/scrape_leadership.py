import json
from pathlib import Path
from urllib.parse import urlparse

from scrape_core_group_members import fetch, parse_members

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images" / "leadership"
OUTPUT = ROOT / "src" / "data" / "leadershipOfficial.json"

PAGES = [
    ("officeBearers", "office-bearers"),
    ("advisoryBoard", "advisory-board"),
]


def download(url, prefix, index):
    if not url:
        return ""
    extension = Path(urlparse(url).path).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        extension = ".jpg"
    filename = f"{prefix}-{index + 1}{extension}"
    destination = IMAGE_DIR / filename
    destination.write_bytes(fetch(url))
    return f"/images/leadership/{filename}"


def main():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    output = {}
    for key, slug in PAGES:
        source = f"https://iapenindia.org/{slug}/"
        page = fetch(source).decode("utf-8", errors="replace")
        members = parse_members(page)
        for index, member in enumerate(members):
            member["image"] = download(member.pop("imageUrl"), slug, index)
        output[key] = {"source": source, "members": members}
        print(f"{key}: {len(members)} profiles", flush=True)
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
