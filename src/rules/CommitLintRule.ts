import { CommitInfo, CommitLintRuleName } from "../types"

export abstract class CommitLintRule {
  public abstract readonly name: CommitLintRuleName
  public abstract check(info: CommitInfo): string | null
}
