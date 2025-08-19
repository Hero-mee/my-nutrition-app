import type { Recipe } from "../types/nutrition";
import { sum } from "../utils/calc";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totals = sum(recipe.items);
  return (
    <div className="p-3" style={{ border: "1px solid #eee", borderRadius: 12, marginBottom: 8 }}>
      <strong>{recipe.title}</strong>
      <div style={{ fontSize: 12, opacity: 0.8 }}>Calories {Math.round(totals.calories)} / P {totals.protein.toFixed(1)} / F {totals.fat.toFixed(1)} / C {totals.carbs.toFixed(1)}</div>
      <ul>
        {recipe.items.map((it, idx) => (
          <li key={idx}>{it.name} {it.amount}{it.unit || "g"}</li>
        ))}
      </ul>
    </div>
  );
}