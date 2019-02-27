import { CommitInfo } from "../types"

export abstract class CommitLintRule {
  // tslint:disable-next-line no-empty
  constructor(info: CommitInfo) {}
  public abstract fail(info: CommitInfo): boolean
}
