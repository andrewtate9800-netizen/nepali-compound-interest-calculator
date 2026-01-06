
export type Language = 'ne' | 'en';

export type CalculationType = 'nepali' | 'standard';

export interface DateState {
  year: string;
  month: string;
  day: string;
}

export interface CalculationResult {
  totalMonths: number;
  totalInterest: number;
  totalAmount: number;
}
