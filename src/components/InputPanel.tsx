import { useState } from "react";
import { parseMulti } from "../utils/parse";
import type { FoodItem, Targets } from "../types/nutrition";

type Props = {
  onParse: (items: FoodItem[]) => void;
  targets: Targets;
  onUpdateTargets: (t: Targets) => void;
};

export default function InputPanel({ onParse, targets, onUpdateTargets }: Props) {
  const [raw, setRaw] = useState("");

  return (
    <div className="p-3" style={{ border: "1px solid #eee", borderRadius: 12 }}>
      <h3>レシピ入力（例：鶏むね肉100g、キャベツ50g）</h3>
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={3} style={{ width: "100%" }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onParse(parseMulti(raw))}>抽出（モック）</button>
      </div>

      <hr />
      <h4>目標（kcal）</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        <label>
          Total
          <input type="number" value={targets.dailyCalories}
            onChange={(e) => onUpdateTargets({ ...targets, dailyCalories: Number(e.target.value) })} />
        </label>
        <label>
          朝
          <input type="number" value={targets.breakfast}
            onChange={(e) => onUpdateTargets({ ...targets, breakfast: Number(e.target.value) })} />
        </label>
        <label>
          昼
          <input type="number" value={targets.lunch}
            onChange={(e) => onUpdateTargets({ ...targets, lunch: Number(e.target.value) })} />
        </label>
        <label>
          夜
          <input type="number" value={targets.dinner}
            onChange={(e) => onUpdateTargets({ ...targets, dinner: Number(e.target.value) })} />
        </label>
      </div>
    </div>
  );
}