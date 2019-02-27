export enum CommitLintRuleName {
  subject_cap = "subject_cap",
  subject_words = "subject_words",
  subject_length = "subject_length",
  subject_period = "subject_period",
  empty_line = "empty_line",
}

export type CommitLintRuleNameUnion = keyof typeof CommitLintRuleName

export interface CommitInfo {
  subject: string;
  emptyLine: string;
  sha: string;
}
