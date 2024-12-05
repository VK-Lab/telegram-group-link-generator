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

# Generate a link with member limit (maximum users that can join)
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -m 100

# Combine both expiration and member limit
node index.js -t YOUR_BOT_TOKEN -g GROUP_ID -e 24h -m 50
```

## Member Limits

You can set a maximum number of users that can join through the invite link. Once this limit is reached, the link will automatically stop working. The maximum allowed limit is 99,999 users.

Some examples of using member limits:
- `-m 10` - Only allow 10 users to join
- `-m 100` - Set limit to 100 users
- `-m 1000` - Allow up to 1000 users

