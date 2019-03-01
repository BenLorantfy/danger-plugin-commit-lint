
# Commit Lint for Danger.js

[![CircleCI](https://circleci.com/gh/BenLorantfy/danger-plugin-commit-lint/tree/master.svg?style=svg)](https://circleci.com/gh/BenLorantfy/danger-plugin-commit-lint/tree/master)

This is a [Danger Plugin][danger] that ensures nice and tidy commit messages. The checks performed on each commit message are inspired by [Tim Pope's blog post][tpope] on good commit messages, echoed by [git's own documentation][book] on the subject. This is almost a direct typescript port of the ruby version, which you can find [here][ruby_version]. Thanks to [@jonallured][jonallured] for creating the ruby version.

[jonallured]: https://github.com/jonallured
[ruby_version]: https://github.com/jonallured/danger-commit_lint
[danger]: https://github.com/danger/danger-js
[tpope]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[book]: https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#Commit-Guidelines

## Installation

```sh
yarn add danger-plugin-commit-lint -D
```

## Usage

Simply add this to your Dangerfile:

```typescript
import * as commitLint from 'danger-plugin-commit-lint'

commitLint.check()
```

That will check each commit in the PR to ensure the following is true:

* Commit subject begins with a capital letter (`subject_cap`)
* Commit subject is more than one word (`subject_words`)
* Commit subject is no longer than 50 characters (`subject_length`)
* Commit subject does not end in a period (`subject_period`)
* Commit subject and body are separated by an empty line (`empty_line`)

By default, Commit Lint fails, but you can configure this behavior.

## Configuration

Configuring Commit Lint is done by passing a hash. The three keys that can be passed are:

* `disable`
* `fail`
* `warn`

To each of these keys you can pass `true` or an array of checks. Here are some ways you could configure Commit Lint:

```typescript
// warn on all checks (instead of failing)
commitLint.check({ warn: true })

// disable the `subject_period` check
commitLint.check({ disable: ["subject_period"] })
```

Remember, by default all checks are run and they will fail. Think of this as the default:

```typescript
commitLint.check({ fail: true })
```

Also note that there is one more way that Commit Lint can behave:

```typescript
commitLint.check({ disable: true })
```

This will actually throw a warning that Commit Lint isn't doing anything.

## Changelog

See the GitHub [release history](https://github.com/BenLorantfy/danger-plugin-commit-lint/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
