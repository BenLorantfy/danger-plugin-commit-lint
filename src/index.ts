// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import {DangerDSLType} from "../node_modules/danger/distribution/dsl/DangerDSL"
declare var danger: DangerDSLType
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

import { EmptyLineRule } from "./rules/EmptyLineRule"

export enum CommitLintRules {
  subject_cap = "subject_cap",
  subject_words = "subject_words",
  subject_length = "subject_length",
  subject_period = "subject_period",
  empty_line = "empty_line",
}

export interface CommitLintOptions {
  warn?: true | CommitLintRules[];
  fail?: true | CommitLintRules[];
  disable?: true | CommitLintRules[];
}

const rules = [
  EmptyLineRule,
]

/**
 * This is a Danger Plugin that ensures nice and tidy commit messages.
 * 
 */
export function check(options: CommitLintOptions = {}) {
  rules.forEach((ruleClass) => {
    danger.git.commits.forEach((commit) => {
      const [subject, emptyLine] = commit.message.split("\n")
      const rule = new (ruleClass)({
        subject,
        emptyLine,
        sha: commit.sha,
      })

      if (rule.fail()) {
        fail(`${ruleClass.MESSAGE}\n${commit.sha}`)
      }
    })
  })
}
