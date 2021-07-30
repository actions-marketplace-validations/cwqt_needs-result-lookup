# Needs result lookup

Map `needs.id.result` to some value

```yaml
inputs:
  result:
    description: "Result of need e.g. ${{ needs.id.result }}"
    required: true
  if-success:
    description: 'Output if result is "success"'
    default: ""
    required: false
  if-failed:
    description: 'Output if result is "failed"'
    default: ""
    required: false
  if-cancelled:
    description: 'Output if result is "cancalled"'
    default: ""
    required: false
  if-skipped:
    description: 'Output if result is "skipped"'
    default: ""
    required: false

outputs:
  value:
    description: "Mapped result"
```

## Usage

```yaml
needs: [some_job]
steps:
  - uses: cwqt/needs-result-lookup@v1.0.0
    id: message
    with:
      result: ${{ needs.some_job.result }}
      if-success: Deploy success!
      if-failure: Deploy failed!
      if-cancelled: Deploy cancelled
      if-skipped: Deploy skipped

  - name: Post to a Slack channel
    id: slack
    uses: slackapi/slack-github-action@v1.14.0
    with:
      slack-message: ${{ steps.message.outputs.value }}
      channel-id: "SOME_ID"
    env:
      SLACK_BOT_TOKEN: ${{ secrets.SLACK_OAUTH }}
```
