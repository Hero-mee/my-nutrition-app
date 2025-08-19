import type { Recipe } from "../types/nutrition";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (!recipes.length) return <p>まだレシピがありません</p>;
  return (
    <div>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}