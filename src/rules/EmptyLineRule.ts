import { CommitInfo } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class EmptyLineRule extends CommitLintRule {
  static MESSAGE = "Please separate commit subject from body with newline."
  private emptyLine: string

  constructor(info: CommitInfo) {
    super(info)
    this.emptyLine = info.emptyLine
  }

  fail() {
    return Boolean(this.emptyLine && this.emptyLine.length > 0)
  }
}
