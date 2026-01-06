
import { DateState, CalculationResult, CalculationType } from '../types';

export interface TimeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDecimalMonths: number;
}

/**
 * Calculates time breakdown between two dates.
 */
export const calculateTimeBreakdown = (start: DateState, end: DateState): TimeBreakdown => {
  const y1 = parseInt(start.year) || 0;
  const m1 = parseInt(start.month) || 0;
  const d1 = parseInt(start.day) || 0;

  const y2 = parseInt(end.year) || 0;
  const m2 = parseInt(end.month) || 0;
  const d2 = parseInt(end.day) || 0;

  let yearDiff = y2 - y1;
  let monthDiff = m2 - m1;
  let dayDiff = d2 - d1;

  if (dayDiff < 0) {
    monthDiff -= 1;
    dayDiff += 30; // Standard 30-day month for local calculation
  }
  if (monthDiff < 0) {
    yearDiff -= 1;
    monthDiff += 12;
  }

  const totalDecimalMonths = (yearDiff * 12) + monthDiff + (dayDiff / 30);

  return {
    years: Math.max(0, yearDiff),
    months: Math.max(0, monthDiff),
    days: Math.max(0, dayDiff),
    totalDecimalMonths: Math.max(0, totalDecimalMonths)
  };
};

/**
 * Compounded Interest Calculation.
 */
export const calculateInterest = (
  p: number, 
  monthlyRate: number, 
  time: TimeBreakdown,
  type: CalculationType
): CalculationResult => {
  if (p <= 0 || monthlyRate < 0) {
    return { totalMonths: time.totalDecimalMonths, totalInterest: 0, totalAmount: p };
  }

  let finalAmount = 0;

  if (type === 'nepali') {
    // Nepali Style: Yearly Compounding
    const annualRate = (monthlyRate * 12) / 100;
    const years = time.years;
    const amountAfterYears = p * Math.pow(1 + annualRate, years);
    const remainingMonths = time.months + (time.days / 30);
    finalAmount = amountAfterYears * (1 + (monthlyRate / 100) * remainingMonths);
  } else {
    // Standard Style: Monthly Compounding
    // Formula: A = P(1 + r)^n where r is monthly rate and n is total months
    const r = monthlyRate / 100;
    finalAmount = p * Math.pow(1 + r, time.totalDecimalMonths);
  }
  
  const totalInterest = finalAmount - p;

  return {
    totalMonths: time.totalDecimalMonths,
    totalInterest,
    totalAmount: finalAmount
  };
};

/**
 * Custom Nepali Number System Formatter (Lakh/Crore System)
 * Format: 1,23,45,678 (3-2-2 grouping)
 */
const formatNepaliNumberSystem = (num: number): string => {
  const rounded = Math.round(num);
  let x = rounded.toString();
  
  if (x.length <= 3) return x;

  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  
  return formattedOther + "," + lastThree;
};

export const formatCurrency = (amount: number): string => {
  return formatNepaliNumberSystem(amount);
};

export const formatNumber = (num: number): string => {
  return formatNepaliNumberSystem(num);
};
