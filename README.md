# Telegram Invite Link Generator

A command-line tool to generate invite links for private Telegram groups.

## Prerequisites

- Node.js 14.0.0 or higher
- A Telegram Bot with admin privileges in the target group
- The group ID where you want to generate the invite link

## Installation

## Usage

Generate an invite link with various expiration options:

```bash
# Generate a link that expires in 24 hours
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -e 24h

# Generate a link that expires in 7 days
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -e 7d

# Generate a link that expires in 30 days
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -e 30d

# Generate a link with custom expiration time (in hours)
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -e 48
```

