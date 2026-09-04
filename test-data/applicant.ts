export type Applicant = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentType: 'employee' | 'self-employed' | 'student' | 'other';
  monthlyIncome: number;
  monthlyExpenses: number;
};

export const validApplicant: Applicant = {
  firstName: 'Kamilla',
  lastName: 'Example',
  email: 'kamilla.qa@example.com',
  phone: '+420 777 123 456',
  employmentType: 'employee',
  monthlyIncome: 55_000,
  monthlyExpenses: 24_000
};

export function applicant(overrides: Partial<Applicant> = {}): Applicant {
  return { ...validApplicant, ...overrides };
}
