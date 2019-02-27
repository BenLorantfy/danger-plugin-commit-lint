import * as commitLint from "./index"
import { CommitLintRuleName } from "./types"

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

  it("should produce message", () => {
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

    commitLint.check({ disable: true })

    expect(global.message).toBeCalledWith("All commit-lint checks were disabled, nothing to do.")
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

    expect(global.fail).toHaveBeenCalledWith("Please separate commit subject from body with newline.\n123456")
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should warn for empty line", () => {
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

    commitLint.check({
      warn: [CommitLintRuleName.empty_line],
    })

    expect(global.fail).not.toHaveBeenCalled()
    expect(global.warn).toHaveBeenCalledWith("Please separate commit subject from body with newline.\n123456")
  })

  it("should not error for empty line if disabled", () => {
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

    commitLint.check({
      disable: [CommitLintRuleName.empty_line],
    })

    expect(global.fail).not.toHaveBeenCalled()
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should not warn for empty line if disabled", () => {
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

    commitLint.check({
      disable: [CommitLintRuleName.empty_line],
      warn: [CommitLintRuleName.empty_line],
    })

    expect(global.fail).not.toHaveBeenCalled()
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should not fail for empty line if disabled", () => {
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

    commitLint.check({
      disable: [CommitLintRuleName.empty_line],
      fail: [CommitLintRuleName.empty_line],
    })

    expect(global.fail).not.toHaveBeenCalled()
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should prioritize warn over fail", () => {
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

    commitLint.check({
      warn: [CommitLintRuleName.empty_line],
      fail: [CommitLintRuleName.empty_line],
    })

    expect(global.fail).not.toHaveBeenCalled()
    expect(global.warn).toHaveBeenCalled()
  })

  it("should error for lowercase commit subject", () => {
    global.danger = {
      git: {
        commits: [
          {
            message: TEST_MESSAGES.subject_cap,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).toHaveBeenCalledWith("Please start commit subject with capital letter.\n123456")
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should error for lowercase commit subject", () => {
    global.danger = {
      git: {
        commits: [
          {
            message: TEST_MESSAGES.subject_length,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).toHaveBeenCalledWith("Please limit commit subject line to 50 characters.\n123456")
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should error for subject ending in a period", () => {
    global.danger = {
      git: {
        commits: [
          {
            message: TEST_MESSAGES.subject_period,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).toHaveBeenCalledWith("Please remove period from end of commit subject line.\n123456")
    expect(global.warn).not.toHaveBeenCalled()
  })

  it("should error for subject that is one word", () => {
    global.danger = {
      git: {
        commits: [
          {
            message: TEST_MESSAGES.subject_words,
            sha: "123456",
          },
        ],
      },
    }

    commitLint.check()

    expect(global.fail).toHaveBeenCalledWith("Please use more than one word in commit message.\n123456")
    expect(global.warn).not.toHaveBeenCalled()
  })
})
