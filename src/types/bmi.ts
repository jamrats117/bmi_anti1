export type Gender = 'male' | 'female' | 'other';

export interface UserInfo {
  firstName: string;
  lastName: string;
  age: number | '';
  gender: Gender;
  weight: number | '';
  height: number | '';
}

export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2';

export interface BmiResultData {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  categoryDescription: string;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
  badgeClass: string;
  idealWeightMin: number;
  idealWeightMax: number;
  weightDiff: number; // Difference from normal range
  healthRisks: string[];
  dietAdvice: string[];
  exerciseAdvice: string[];
  calculatedAt: string;
}
