import { Income } from '@/types/income';

const STORAGE_KEY = 'halal-income-tracker';

export function saveIncomes(incomes: Income[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incomes));
}

export function loadIncomes(): Income[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
