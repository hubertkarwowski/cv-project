"""Seed the `dictionaries` table with the core CV lookup data.

Idempotent: skips any (category, code) pair that already exists, so it is safe
to re-run. Run from the backend/ directory:

    python -m app.db.seed_dictionaries
"""

from sqlalchemy import select

from app.db.db import SessionLocal, create_tables
from app.models.dictionary import Dictionary
from app.schemas.Dictionary import DictionaryCategory

SEED_DATA: dict[DictionaryCategory, list[tuple[str, str]]] = {
    DictionaryCategory.LANGUAGE: [
        ("polish", "Polski"),
        ("english", "Angielski"),
        ("german", "Niemiecki"),
        ("french", "Francuski"),
        ("spanish", "Hiszpański"),
        ("italian", "Włoski"),
        ("russian", "Rosyjski"),
        ("ukrainian", "Ukraiński"),
    ],
    DictionaryCategory.LANGUAGE_LEVEL: [
        ("native", "Język ojczysty"),
        ("c2", "C2 — biegły"),
        ("c1", "C1 — zaawansowany"),
        ("b2", "B2 — wyższy średnio zaawansowany"),
        ("b1", "B1 — średnio zaawansowany"),
        ("a2", "A2 — podstawowy wyższy"),
        ("a1", "A1 — początkujący"),
    ],
    DictionaryCategory.SKILL_LEVEL: [
        ("beginner", "Podstawowy"),
        ("intermediate", "Średnio zaawansowany"),
        ("advanced", "Zaawansowany"),
        ("expert", "Ekspert"),
    ],
    DictionaryCategory.CONTRACT_TYPE: [
        ("uop", "Umowa o pracę"),
        ("uz", "Umowa zlecenie"),
        ("uod", "Umowa o dzieło"),
        ("b2b", "Kontrakt B2B"),
        ("internship", "Staż / praktyki"),
    ],
    DictionaryCategory.EDUCATION_LEVEL: [
        ("primary", "Wykształcenie podstawowe"),
        ("vocational", "Wykształcenie zawodowe"),
        ("secondary", "Wykształcenie średnie"),
        ("bachelor", "Licencjat / inżynier"),
        ("master", "Magister"),
        ("phd", "Doktorat"),
    ],
}


def seed() -> None:
    create_tables()
    db = SessionLocal()
    try:
        existing = {
            (cat, code)
            for cat, code in db.execute(
                select(Dictionary.category, Dictionary.code)
            ).all()
        }

        added = 0
        for category, entries in SEED_DATA.items():
            for sort_order, (code, label) in enumerate(entries):
                normalized_code = code.strip().lower()
                if (category, normalized_code) in existing:
                    continue
                db.add(
                    Dictionary(
                        category=category,
                        code=normalized_code,
                        label=label,
                        sort_order=sort_order,
                    )
                )
                existing.add((category, normalized_code))
                added += 1
                )
                added += 1

        db.commit()
        print(f"Seed complete: {added} new entries inserted.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
