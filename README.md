# Slack Message

[![GitHub](https://badge.fury.io/gh/someimportantcompany%2Fgithub-actions-slack-message.svg)](https://badge.fury.io/gh/someimportantcompany%2Fgithub-actions-slack-message)
[![CICD](https://github.com/someimportantcompany/github-actions-slack-message/workflows/CICD/badge.svg?branch=master&event=push)](https://github.com/someimportantcompany/github-actions-slack-message/actions?query=workflow%3ACICD)
[![Coverage](https://coveralls.io/repos/github/someimportantcompany/github-actions-slack-message/badge.svg)](https://coveralls.io/github/someimportantcompany/github-actions-slack-message)

Send messages to Slack from GitHub Actions.

This action sends message to Slack during your GitHub Actions workflow. It takes a minimalist approach, showing a handful of metadata options like repository, branch & commit. You can optionally update message in-place to reduce noise in your Slack channel.

## Usage

```yml
- uses: someimportantcompany/github-actions-slack-message@v1
  with:
    channel: ${{ env.SLACK_CHANNEL }}
    bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
    text: Firing a bot-token message

- uses: someimportantcompany/github-actions-slack-message@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    text: Firing a webhook message
```

![Individual messages](./Screenshot%202020-08-30%20at%2022.49.56.png)

- Including a `color` wraps your message in a (soon to be deprecated) `attachments` block.
- Links refer back to your repository, the branch & the commit.

### Updating an existing message

If you are planning to send multiple Slack messages per invocation, and you'd prefer to update a single message instead of posting multiple messages, you can pass the first Slack message's `message-id` to future calls, thus updating in place. **A `bot-token` is required to update messages.**

```yml
- uses: someimportantcompany/github-actions-slack-message@v1
  id: slack
  with:
    channel: ${{ env.SLACK_CHANNEL }}
    bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
    text: Deployment started

- run: npm run deploy

- uses: someimportantcompany/github-actions-slack-message@v1
  with:
    channel: ${{ env.SLACK_CHANNEL }}
    bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
    text: Deployment finished
    color: good
    message-id: ${{ steps.slack.outputs.message-id }}
```

![Updating message](./Screenshot%202020-08-30%20at%2022.48.56.gif)

### Additional colors

Alongside the Slack default colors `good`, `warning` & `danger`, this action supports some additional colors for convenience:

| Key | Value |
| ---- | ---- |
| `success` | `good` |
| `failure` | `danger` |
| `info` | ![#17a2b8](https://via.placeholder.com/25/17a2b8/000000?text=+) |
| `gray` | ![#B6B6B6](https://via.placeholder.com/25/B6B6B6/000000?text=+) |
| `grey` | ![#B6B6B6](https://via.placeholder.com/25/B6B6B6/000000?text=+) |
| `orange` | ![#FF4500](https://via.placeholder.com/25/FF4500/000000?text=+) |
| `purple` | ![#9400D3](https://via.placeholder.com/25/9400D3/000000?text=+) |

```yml
- uses: someimportantcompany/github-actions-slack-message@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    text: Build finished
    color: good # Slack already-supported color

- uses: someimportantcompany/github-actions-slack-message@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    text: Build failed
    color: failed # Aliased color
```

### Running if-success or if-failure

Using built-in Actions conditionals, you can send an error if the job succeeded or failed.

```yml
- uses: someimportantcompany/github-actions-slack-message@v1
  if: success()
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    text: Build passed
    color: success
- uses: someimportantcompany/github-actions-slack-message@v1
  if: failure()
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    text: Build failed
    color: failure
```

## Inputs

| Key | Description |
| ---- | ---- |
| `text` | **Required**. The text to send to Slack, see [Slack's documentation for formatting](https://api.slack.com/reference/surfaces/formatting#basics). |
| `color` | Specify the color of the Slack attachment. |
| `bot-token` | **Required if** `webhook-url` was not provided - a Slack bot token to send messages with. |
| `webhook-url` | **Required if** `bot-token` was not provided - a Slack webhook URL to send messages to. |
| `channel` | A channel to send messages to - required if `bot-token` was provided. |
| `message-id` | The ID of the existing Slack message to update - only valid if `bot-token` was provided. |
| `title` | The title of the Slack message, optional. |
| `image-url` | The image URL for attachment |
| `thumb-url` | The thumb URL for attachment |

## Outputs

| Key | Description |
| ---- | ---- |
| `message-id` | The ID of the message sent to Slack - pass to the `message-id` input to update. |

## Setup

To use this GitHub Action with your Slack workspace, you'll need a [Slack bot token](https://api.slack.com/methods/chat.postMessage) or [Slack webhook URL](https://api.slack.com/messaging/webhooks), both can be generated by [making a Slack app](https://api.slack.com/authentication/basics).
