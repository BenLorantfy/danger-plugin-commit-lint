import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectCapRule extends CommitLintRule {
  name = CommitLintRuleName.subject_cap
  check(info: CommitInfo) {
    const isFail = info.subject[0].toUpperCase() !== info.subject[0]
    if (isFail) {
      return "Please start commit subject with capital letter."
    }

    return null
  }
}
