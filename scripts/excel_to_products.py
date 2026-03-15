import pandas as pd
from pathlib import Path
import json

BASE_DIR = Path(r"C:\rentalfree\rentalfree-site")
EXCEL_FILE = BASE_DIR / "data" / "코웨이 완성본.xlsx"
OUTPUT_FILE = BASE_DIR / "app" / "data" / "products.ts"

COLOR_MAP = {
    "WT": "화이트",
    "GR": "그레이",
    "PK": "핑크",
    "BU": "블루",
    "BG": "베이지",
    "SL": "실버",
    "BR": "브라운",
}

CATEGORY_MAP = {
    "정수기": "정수기",
    "얼음정수기": "얼음정수기",
    "업소용정수기": "업소용정수기",
    "공기청정기": "공기청정기",
    "비데": "비데",
    "매트리스": "매트리스",
    "기타": "기타",
    "빌트인정수기": "정수기",
    "스탠드정수기": "업소용정수기",
}

COLOR_ORDER = ["화이트", "그레이", "핑크", "블루", "베이지", "실버", "브라운"]


def slugify_model(model: str) -> str:
    return model.strip().lower()


def normalize_category(cat: str) -> str:
    if not isinstance(cat, str):
        return "기타"
    cat = cat.strip()
    return CATEGORY_MAP.get(cat, cat if cat in CATEGORY_MAP.values() else "기타")


def to_number(value):
    if pd.isna(value):
        return None
    if isinstance(value, (int, float)):
        return int(value)
    value = str(value).replace(",", "").replace("원", "").replace("월", "").strip()
    if value == "":
        return None
    try:
        return int(float(value))
    except:
        return None


def image_group_for_model(model: str):
    """
    이미지 폴더 규칙:
    색상 없는 제품: CHP-700L_1.png
    색상 있는 제품: CHP-1111N_BR1.png
    """
    images_dir = BASE_DIR / "public" / "images" / "coway"
    result = {}

    if not images_dir.exists():
        return {"기본": []}

    model_files = list(images_dir.glob(f"{model}_*.*"))

    if not model_files:
        return {"기본": []}

    # 색상 없는 제품: _1, _2, _3 ...
    basic_files = sorted(
        [f.name for f in model_files if f.stem.startswith(f"{model}_") and f.stem[len(model) + 1 :].isdigit()]
    )
    if basic_files:
        result["기본"] = [f"/images/coway/{name}" for name in basic_files]
        return result

    # 색상 있는 제품: _WT1, _BR1 등
    color_buckets = {}
    for f in model_files:
        stem = f.stem  # 예: CHP-1111N_BR1
        suffix = stem.replace(f"{model}_", "")  # BR1
        if len(suffix) < 3:
            continue
        code = suffix[:2]
        number = suffix[2:]
        if not number.isdigit():
            continue
        color_name = COLOR_MAP.get(code)
        if not color_name:
            continue
        color_buckets.setdefault(color_name, []).append(f.name)

    ordered = {}
    for color in COLOR_ORDER:
        if color in color_buckets:
            ordered[color] = [f"/images/coway/{name}" for name in sorted(color_buckets[color])]

    return ordered if ordered else {"기본": []}


def build_product_object(idx, row):
    model = str(row["모델명"]).strip()
    name = str(row["제품명"]).strip()
    brand = str(row.get("브랜드", "코웨이")).strip()
    category = normalize_category(row.get("카테고리", "기타"))

    contracts = {
        "36개월": to_number(row.get("36개월")),
        "48개월": to_number(row.get("48개월")),
        "60개월": to_number(row.get("60개월")),
        "72개월": to_number(row.get("72개월")),
        "84개월": to_number(row.get("84개월")),
    }

    manage = str(row.get("관리유형", "")).strip()
    manage_types = []
    if manage:
        if "/" in manage:
            manage_types = [x.strip() for x in manage.split("/") if x.strip()]
        else:
            manage_types = [manage]
    if not manage_types:
        manage_types = ["방문관리"]

    images = image_group_for_model(model)

    return {
        "id": f"cw{idx+1}",
        "slug": slugify_model(model),
        "brand": brand,
        "name": name,
        "model": model,
        "category": category,
        "cardDiscountPrice": None,
        "manageTypes": manage_types,
        "contracts": contracts,
        "colors": images,
    }


def to_ts(obj, indent=2):
    return json.dumps(obj, ensure_ascii=False, indent=indent).replace("null", "null")


def main():
    df = pd.read_excel(EXCEL_FILE)

    required = ["제품명", "모델명"]
    for col in required:
        if col not in df.columns:
            raise ValueError(f"엑셀에 '{col}' 열이 없습니다.")

    # 빈 제품명 제거
    df = df[df["제품명"].notna()].copy()

    products = []
    for idx, (_, row) in enumerate(df.iterrows()):
        products.append(build_product_object(idx, row))

    ts_lines = ["export const products = ", to_ts(products, indent=2), ";\n"]
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text("".join(ts_lines), encoding="utf-8")

    print(f"완료: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()