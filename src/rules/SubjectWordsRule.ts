import { CommitInfo, CommitLintRuleName } from "../types"
import { CommitLintRule } from "./CommitLintRule"

export class SubjectWordsRule extends CommitLintRule {
  name = CommitLintRuleName.subject_words
  message = "Please use more than one word in commit message."

  check(info: CommitInfo) {
    return info.subject.trim().split(" ").length < 2
  }
}
