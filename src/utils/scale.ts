import type { FoodItem } from "../types/nutrition";
import { sum } from "./calc";

/**
 * 目標カロリーに合わせて **全食材の比率を固定したまま** 総量をスケーリング
 */
export function scaleRecipeByCalories(items: FoodItem[], targetCalories: number): FoodItem[] {
  const totals = sum(items);
  if (totals.calories <= 0) return items;
  const factor = targetCalories / totals.calories;
  return items.map((it) => ({ ...it, amount: Math.max(0, Math.round(it.amount * factor)) }));
}