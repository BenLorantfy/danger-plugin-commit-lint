import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectLengthRule extends CommitLintRule {
  name = CommitLintRuleName.subject_length
  check(info: CommitInfo) {
    const isFail = info.subject.length > 50
    if (isFail) {
      return "Please limit commit subject line to 50 characters."
    }

    return null
  }
}
