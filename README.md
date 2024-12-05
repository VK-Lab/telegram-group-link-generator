# Telegram Invite Link Generator

A command-line tool to generate invite links for private Telegram groups with customizable expiration options and member limits.

## Features

- Generate invite links with preset expiration times (24h, 7d, 30d)
- Set custom expiration time in hours
- Set member limits (up to 99,999 users)
- Easy-to-use command-line interface
- Input validation and error handling

## Prerequisites

- Node.js 14.0.0 or higher
- A Telegram Bot with admin privileges in the target group
- The group ID where you want to generate the invite link

## Installation

1. Clone this repository:
```bash
git clone https://github.com/VK-Lab/telegram-group-link-generator.git
cd telegram-invite-link-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a Telegram bot and get the bot token:
   - Talk to [@BotFather](https://t.me/botfather) on Telegram
   - Create a new bot using the `/newbot` command
   - Copy the bot token provided

4. Get your group ID:
```bash
# First, set your bot token
export TELEGRAM_BOT_TOKEN='your_bot_token_here'

# Then run the helper script
node utils/get-group-id.js
```

## Usage

Generate an invite link with various options:

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

## Configuration

The application's configuration can be found in `config.js`. You can modify:
- Maximum member limit (default: 99,999)
- Maximum expiration time (default: 1 year)
- Preset expiration durations

## Error Handling

The application includes comprehensive error handling for:
- Invalid bot tokens
- Invalid group IDs
- Network errors
- API response errors
- Invalid input parameters

## License

MIT License. See LICENSE file for details.
