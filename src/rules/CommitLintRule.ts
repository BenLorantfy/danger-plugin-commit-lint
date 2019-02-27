import { CommitInfo } from "../types"

export abstract class CommitLintRule {
  constructor(info: CommitInfo) {}
  public abstract fail(info: CommitInfo): boolean
}
