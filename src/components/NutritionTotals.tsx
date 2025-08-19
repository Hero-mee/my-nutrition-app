import type { PFC } from "../types/nutrition";

export default function NutritionTotals({ totals, title = "合計" }: { totals: PFC; title?: string }) {
  return (
    <div className="p-3" style={{ border: "1px solid #eee", borderRadius: 12 }}>
      <h4>{title}</h4>
      <ul>
        <li>Calories: {Math.round(totals.calories)} kcal</li>
        <li>P: {totals.protein.toFixed(1)} g</li>
        <li>F: {totals.fat.toFixed(1)} g</li>
        <li>C: {totals.carbs.toFixed(1)} g</li>
      </ul>
    </div>
  );
}