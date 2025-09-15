export interface EMIInputs {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

export interface CostComparison {
  petrol: number;
  ev: number;
  savings: number;
  dailyKm: number;
}

export interface CalculatorData {
  sectionTitle: string;
  sectionSubtitle?: string;
}

export interface CalculatorProps {
  data: CalculatorData;
}