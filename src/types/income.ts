export type ComplianceCategory = 'halal' | 'doubtful' | 'haram';

export interface Income {
  id: string;
  source: string;
  amount: number;
  description?: string;
  category: ComplianceCategory;
  reasoning: string;
  createdAt: string;
}
