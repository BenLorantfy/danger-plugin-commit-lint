import * as commitLint from "./index"
import { EmptyLineRule } from "./rules/EmptyLineRule"

declare const global: any

const TEST_MESSAGES = {
  subject_cap: "this subject needs a capital",
  subject_words: "Fixed",
  subject_length: "This is a really long subject line and should result in an error",
  subject_period: "This subject line ends in a period.",
  empty_line: "This subject line is fine\nBut then I forgot the empty line separating the subject and the body.",
  all_errors: "this is a really long subject and it even ends in a period.\nNot to mention the missing empty line!",
  valid:  "This is a valid message\n\nYou can tell because it meets all the criteria and the linter does not complain.",
}

describe("commitLint()", () => {
  beforeEach(() => {
    global.warn = jest.fn()
    global.message = jest.fn()
    global.fail = jest.fn()
    global.markdown = jest.fn()
  })

  afterEach(() => {
    global.warn = undefined
    global.message = undefined
    global.fail = undefined
    global.markdown = undefined
  })

  it("should produce no errors", () => {
    global.danger = {
      // https://danger.systems/js/reference.html#GitDSL
      git: {
        commits: [
          {
            message: TEST_MESSAGES.valid,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).not.toBeCalled()
  })

  it("should error for empty line", () => {
    global.danger = {
      git: {
        commits: [
          {
            message: TEST_MESSAGES.empty_line,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).toHaveBeenCalledWith(`${EmptyLineRule.MESSAGE}\n123456`)
  })
})
