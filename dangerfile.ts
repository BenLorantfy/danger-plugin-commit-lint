import { message } from "danger"
import { check } from "danger-plugin-commit-lint"

message("This is a test message")
check({
  warn: true,
})
