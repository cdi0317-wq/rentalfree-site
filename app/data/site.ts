export const categoryLabels = {
  water: "정수기",
  air: "공기청정기",
  bidet: "비데",
  mattress: "매트리스",
  appliance: "가전",
} as const;

export const brandLabels = {
  coway: "코웨이",
  cuckoo: "쿠쿠",
  lg: "LG",
  skmagic: "SK매직",
  chungho: "청호",
  hyundai: "현대",
} as const;

export const categoryBrandMap = {
  water: ["coway", "cuckoo", "lg", "skmagic", "chungho", "hyundai"],
  air: ["coway", "cuckoo", "lg", "skmagic", "chungho", "hyundai"],
  bidet: ["coway", "cuckoo", "lg", "skmagic", "chungho", "hyundai"],
  mattress: ["coway", "cuckoo", "skmagic", "chungho", "hyundai"],
  appliance: ["coway", "cuckoo", "lg", "skmagic", "chungho", "hyundai"],
} as const;
