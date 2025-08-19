export type PFC = {
  calories: number; // kcal
  protein: number;  // g
  fat: number;      // g
  carbs: number;    // g
};

export type FoodItem = {
  name: string;
  amount: number;   // g or ml
  unit?: string;    // "g", "ml", "個" など（表示用）
  per100g: PFC;     // 100g あたり栄養
};

export type Recipe = {
  id: string;
  title: string;
  items: FoodItem[];
  note?: string;
};

export type Targets = {
  dailyCalories: number; // 例: 1000
  breakfast: number;     // 例: 300
  lunch: number;         // 例: 400
  dinner: number;        // 例: 300
  pRatio?: number;       // P: 例 0.3
  fRatio?: number;       // F: 例 0.25
  cRatio?: number;       // C: 例 0.45
};