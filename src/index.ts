// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "../node_modules/danger/distribution/dsl/DangerDSL"
declare var danger: DangerDSLType
declare function message(message: string): void
declare function warn(message: string): void
declare function fail(message: string): void

import { EmptyLineRule } from "./rules/EmptyLineRule"
import { SubjectCapRule } from "./rules/SubjectCapRule"
import { SubjectLengthRule } from "./rules/SubjectLengthRule"
import { SubjectPeriodRule } from "./rules/SubjectPeriodRule"
import { SubjectWordsRule } from "./rules/SubjectWordsRule"
import { CommitLintRuleName, CommitLintRuleNameUnion } from "./types"

export interface CommitLintOptions {
  warn?: true | Array<CommitLintRuleName | CommitLintRuleNameUnion>
  fail?: true | Array<CommitLintRuleName | CommitLintRuleNameUnion>
  disable?: true | Array<CommitLintRuleName | CommitLintRuleNameUnion>
}

const rules = [EmptyLineRule, SubjectCapRule, SubjectLengthRule, SubjectPeriodRule, SubjectWordsRule]

/**
 * This is a Danger Plugin that ensures nice and tidy commit messages.
 */
export function check(options: CommitLintOptions = {}) {
  if (options.disable === true) {
    message("All commit-lint checks were disabled, nothing to do.")
    return
  }

  rules.forEach(ruleClass => {
    danger.git.commits.forEach(commit => {
      const [subject, emptyLine] = commit.message.split("\n")
      const rule = new ruleClass()

      const error = rule.check({
        subject,
        emptyLine,
        sha: commit.sha,
      })

      if (error) {
        const shouldDisable = options.disable && (options.disable === true || options.disable.indexOf(rule.name) > -1)

        if (!shouldDisable) {
          if (options.warn && (options.warn === true || options.warn.indexOf(rule.name) > -1)) {
            warn(`${error}\n${commit.sha}`)
          } else if (
            typeof options.fail === "undefined" ||
            (options.fail && (options.fail === true || options.fail.indexOf(rule.name) > -1))
          ) {
            fail(`${error}\n${commit.sha}`)
          }
        }
      }
    })
  })
}

export { CommitLintRuleName }
