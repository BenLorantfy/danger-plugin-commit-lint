import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class EmptyLineRule extends CommitLintRule {
  name = CommitLintRuleName.empty_line
  check(info: CommitInfo) {
    const isFail = Boolean(info.emptyLine && info.emptyLine.length > 0)
    if (isFail) {
      return "Please separate commit subject from body with newline."
    }

    return null
  }
}
