import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectWordsRule extends CommitLintRule {
  name = CommitLintRuleName.subject_words
  check(info: CommitInfo) {
    const isFail = info.subject.trim().split(" ").length < 2
    if (isFail) {
      return "Please use more than one word in commit message."
    }

    return null
  }
}
