import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectCapRule extends CommitLintRule {
  name = CommitLintRuleName.subject_cap
  message = "Please start commit subject with capital letter."

  check(info: CommitInfo) {
    return info.subject[0].toUpperCase() !== info.subject[0]
  }
}
