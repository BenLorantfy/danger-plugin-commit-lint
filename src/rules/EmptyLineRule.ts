import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class EmptyLineRule extends CommitLintRule {
  name = CommitLintRuleName.empty_line
  message = "Please separate commit subject from body with newline."

  check(info: CommitInfo) {
    return Boolean(info.emptyLine && info.emptyLine.length > 0)
  }
}
