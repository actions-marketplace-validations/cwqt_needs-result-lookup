import * as core from '@actions/core'

// https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-context
type Result = "success" | "failure" | "cancelled" | "skipped";

async function run(): Promise<void> {
  try {
    const result: Result = core.getInput('result', {required: true})

    const options:{[index in Result]:string} = {
      success: core.getInput("on-success"),
      failure: core.getInput("on-failure"),
      cancelled: core.getInput("on-cancelled"),
      skipped: core.getInput("on-skipped")
    }

    core.setOutput('value', options[result])
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
