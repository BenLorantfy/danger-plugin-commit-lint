import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectPeriodRule extends CommitLintRule {
  name = CommitLintRuleName.subject_period
  message = "Please remove period from end of commit subject line."

  check(info: CommitInfo) {
    return info.subject[info.subject.length - 1] === "."
  }
}
