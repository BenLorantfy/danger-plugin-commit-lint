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
import { CommitInfo, CommitLintRuleName, CommitLintRuleNameUnion } from "./types"

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

  const infos: CommitInfo[] = danger.git.commits.map(commit => {
    const [subject, emptyLine] = commit.message.split("\n")

    return {
      subject,
      emptyLine,
      sha: commit.sha,
    }
  })

  rules.forEach(ruleClass => {
    const rule = new ruleClass()
    const shouldDisable = options.disable && (options.disable === true || options.disable.indexOf(rule.name) > -1)

    if (!shouldDisable) {
      const failingShas = infos.filter(info => rule.check(info)).map(info => info.sha)

      if (failingShas.length > 0) {
        const failMessage = [rule.message, ...failingShas].join("\n")

        if (options.warn && (options.warn === true || options.warn.indexOf(rule.name) > -1)) {
          warn(failMessage)
        } else if (
          typeof options.fail === "undefined" ||
          (options.fail && (options.fail === true || options.fail.indexOf(rule.name) > -1))
        ) {
          fail(failMessage)
        }
      }
    }
  })
}

export { CommitLintRuleName }
