import { CommitInfo, CommitLintRuleName } from "../types"

export abstract class CommitLintRule {
  public abstract readonly name: CommitLintRuleName
  public abstract readonly message: string
  public abstract check(info: CommitInfo): boolean
}
