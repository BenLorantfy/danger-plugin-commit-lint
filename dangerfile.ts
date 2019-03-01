import { message } from "danger"
import * as commitLint from "danger-plugin-commit-lint"

commitLint.check()
message("This is a test message to make sure danger is working")
