export type MigrationAnswers = Record<string, string>;
export type MigrationQuestion = { id: string; section: string; title: string; help: string; options: { value: string; label: string }[]; source?: string };
export type MigrationHistory = { id: string; question: string; answer: string; value: string };
export type MigrationResult = {
  title: string; status: 'review' | 'pending' | 'priority'; summary: string;
  alerts: string[]; missing: string[]; steps: string[]; documents: string[];
  authority: string; limits: string; alternatives: string[]; sources: { label: string; url: string }[];
};
export type MigrationResponse = { question: MigrationQuestion | null; history: MigrationHistory[]; result: MigrationResult | null; version: string };
