import { useMemo, useState } from "react";
import InputPanel from "./components/InputPanel";
import NutritionTotals from "./components/NutritionTotals";
import RecipeList from "./components/RecipeList";
import type { FoodItem, Recipe, Targets } from "./types/nutrition";
import { sum } from "./utils/calc";
import { scaleRecipeByCalories } from "./utils/scale";
import { StorageRepo } from "./utils/storage";

const initialTargets: Targets = StorageRepo.loadTargets() || {
  dailyCalories: 1000,
  breakfast: 300,
  lunch: 400,
  dinner: 300,
};

export default function App() {
  const [targets, setTargets] = useState<Targets>(initialTargets);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(StorageRepo.loadRecipes());
  const [title, setTitle] = useState("");

  const totals = useMemo(() => sum(items), [items]);

  const scaledToBreakfast = useMemo(() => scaleRecipeByCalories(items, targets.breakfast), [items, targets.breakfast]);
  const scaledBreakfastTotals = useMemo(() => sum(scaledToBreakfast), [scaledToBreakfast]);
  const pctBreakfast = Math.round((scaledBreakfastTotals.calories / targets.breakfast) * 100);

  function handleSave() {
    const r: Recipe = { id: crypto.randomUUID(), title: title || "無題レシピ", items };
    const next = [r, ...recipes];
    setRecipes(next);
    StorageRepo.saveRecipes(next);
  }

  function handleTargets(t: Targets) {
    setTargets(t);
    StorageRepo.saveTargets(t);
  }

  function handleDelete(id: string) {
  const next = recipes.filter(r => r.id !== id);
  setRecipes(next);
  StorageRepo.saveRecipes(next);
}

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2>栄養スケーリングMVP</h2>

      <InputPanel onParse={setItems} targets={targets} onUpdateTargets={handleTargets} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
        <NutritionTotals totals={totals} title="現在の合計" />
        <NutritionTotals totals={scaledBreakfastTotals} title={`朝(${targets.breakfast}kcal)にスケール`} />
      </div>
      <div style={{fontSize:12, opacity:.8}}>朝 目標達成率: {isFinite(pctBreakfast) ? pctBreakfast : 0}%</div>

      <div style={{ marginTop: 12, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <h4>レシピとして保存</h4>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="レシピ名" />
        <button onClick={handleSave} disabled={!items.length}>保存</button>
      </div>

      <h3 style={{ marginTop: 16 }}>登録済みレシピ</h3>
      <RecipeList recipes={recipes} onDelete={handleDelete} />
    </div>
  );
}