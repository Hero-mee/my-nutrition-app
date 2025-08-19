import type { FoodItem, PFC } from "../types/nutrition";

const DICT: Record<string, PFC> = {
  // 100g あたりの目安（ダミー）。後で正式DBへ差替。
  "鶏むね肉": { calories: 116, protein: 23, fat: 1.9, carbs: 0 },
  "キャベツ": { calories: 23, protein: 1.3, fat: 0.2, carbs: 5.2 },
  "グリークヨーグルト": { calories: 60, protein: 10, fat: 0, carbs: 3.6 },
  "冷凍ベリー": { calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
  "グラノーラ": { calories: 450, protein: 10, fat: 15, carbs: 68 },
};

export function parseLine(line: string): { name: string; amount: number; unit?: string } | null {
  // 例: "鶏むね肉100g" / "キャベツ50g" / "ヨーグルト 120g"
  const m = line.trim().match(/([^0-9]+)\s*(\d+)\s*(g|ml|個)?/);
  if (!m) return null;
  const name = m[1].trim();
  const amount = parseInt(m[2], 10);
  const unit = m[3] || "g";
  return { name, amount, unit };
}

export function toFoodItem(line: string): FoodItem | null {
  const hit = parseLine(line);
  if (!hit) return null;
  const per100g = DICT[hit.name];
  if (!per100g) return null; // 未登録はMVPではスキップ
  return {
    name: hit.name,
    amount: hit.amount,
    unit: hit.unit,
    per100g,
  };
}

export function parseMulti(text: string): FoodItem[] {
  return text
    .split(/[\n,、]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(toFoodItem)
    .filter((x): x is FoodItem => !!x);
}