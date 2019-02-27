import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectPeriodRule extends CommitLintRule {
  name = CommitLintRuleName.subject_period
  check(info: CommitInfo) {
    const isFail = info.subject[info.subject.length - 1] === "."
    if (isFail) {
      return "Please remove period from end of commit subject line."
    }

    return null
  }
}
