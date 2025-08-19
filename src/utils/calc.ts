import type { FoodItem, PFC } from "../types/nutrition";

export function sum(items: FoodItem[]): PFC {
  return items.reduce(
    (acc, it) => {
      const factor = it.amount / 100;
      return {
        calories: acc.calories + it.per100g.calories * factor,
        protein:  acc.protein  + it.per100g.protein  * factor,
        fat:      acc.fat      + it.per100g.fat      * factor,
        carbs:    acc.carbs    + it.per100g.carbs    * factor,
      };
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export function roundPFC(p: PFC, digits = 1): PFC {
  const r = (n: number) => Math.round(n * 10 ** digits) / 10 ** digits;
  return { calories: r(p.calories), protein: r(p.protein), fat: r(p.fat), carbs: r(p.carbs) };
};
