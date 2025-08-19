import type { Recipe, Targets } from "../types/nutrition";

const KEY_RECIPES = "recipes_v1";
const KEY_TARGETS = "targets_v1";

export const StorageRepo = {
  loadRecipes(): Recipe[] {
    try {
      const raw = localStorage.getItem(KEY_RECIPES);
      return raw ? (JSON.parse(raw) as Recipe[]) : [];
    } catch {
      return [];
    }
  },
  saveRecipes(list: Recipe[]) {
    localStorage.setItem(KEY_RECIPES, JSON.stringify(list));
  },
  loadTargets(): Targets | null {
    try {
      const raw = localStorage.getItem(KEY_TARGETS);
      return raw ? (JSON.parse(raw) as Targets) : null;
    } catch {
      return null;
    }
  },
  saveTargets(t: Targets) {
    localStorage.setItem(KEY_TARGETS, JSON.stringify(t));
  },
};