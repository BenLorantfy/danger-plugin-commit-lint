import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectLengthRule extends CommitLintRule {
  name = CommitLintRuleName.subject_length
  message = "Please limit commit subject line to 50 characters."

  check(info: CommitInfo) {
    return info.subject.length > 50
  }
}
