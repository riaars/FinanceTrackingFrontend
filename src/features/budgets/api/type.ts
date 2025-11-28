export type Budget = {
  budget_per_categories: Partial<{
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
  }>;
};
