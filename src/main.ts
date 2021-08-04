import * as core from '@actions/core'

// https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-context
type Result = "success" | "failure" | "cancelled" | "skipped";

async function run(): Promise<void> {
  try {
    const result = core.getInput('result', {required: true}) as Result

    const options:{[index in Result]:string} = {
      success: core.getInput("if-success"),
      failure: core.getInput("if-failure"),
      cancelled: core.getInput("if-cancelled"),
      skipped: core.getInput("if-skipped")
    }

    core.setOutput('value', options[result])
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
