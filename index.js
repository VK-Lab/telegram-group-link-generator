#!/usr/bin/env node

const { program } = require('commander');
const { generateInviteLink } = require('./utils/telegram');
const { validateInput } = require('./utils/validation');
const { version } = require('./config');

// Configure CLI
program
    .version(version)
    .description('Generate Telegram invite links for private groups')
    .option('-t, --token <token>', 'Telegram Bot API token')
    .option('-g, --group <groupId>', 'Telegram group ID (can be negative)')
    .option('-e, --expires <hours>', 'Link expiration time in hours (optional)', parseInt)
    .option('-m, --member-limit <limit>', 'Maximum number of users that can join (optional)', parseInt)
    .parse(process.argv);

const options = program.opts();

async function main() {
    try {
        // Validate inputs
        const validationError = validateInput(options);
        if (validationError) {
            console.error('\x1b[31mError:\x1b[0m', validationError);
            process.exit(1);
        }

        console.log('\x1b[36mGenerating invite link...\x1b[0m');

        const inviteLink = await generateInviteLink({
            token: options.token,
            groupId: options.group,
            expireHours: options.expires,
            memberLimit: options.memberLimit
        });

        console.log('\x1b[32mSuccess!\x1b[0m');
        console.log('\nInvite Link:', '\x1b[4m' + inviteLink + '\x1b[0m');
    } catch (error) {
        console.error('\x1b[31mError:\x1b[0m', error.message);
        process.exit(1);
    }
}

main();
