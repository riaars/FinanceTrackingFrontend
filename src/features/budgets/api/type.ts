export type BudgetCategory = keyof Budget["budget_per_categories"];

// Partial update; backend merges into the existing budget and casts values
export type BudgetUpdate = {
  budget_per_categories: Partial<Record<BudgetCategory, number | string>>;
};

export type Budget = {
  budget_per_categories: {
    bills_utilities: number;
    education: number;
    entertainment: number;
    food_dining: number;
    health_fitness: number;
    housing: number;
    insurance: number;
    miscellaneaous: number;
    personal_care: number;
    shopping: number;
    transportation: number;
    travel: number;
  };
};
