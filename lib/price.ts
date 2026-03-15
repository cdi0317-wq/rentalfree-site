export function parsePriceToNumber(price?: string): number | null {
  if (!price) return null;

  const onlyNumber = price.replace(/[^\d]/g, "");
  if (!onlyNumber) return null;

  return Number(onlyNumber);
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString()}원`;
}