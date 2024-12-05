#!/usr/bin/env node

const https = require('https');

if (process.env.TELEGRAM_BOT_TOKEN) {
    console.log('\x1b[36mFetching recent updates from your bot...\x1b[0m');
    console.log('Make sure you have:');
    console.log('1. Added your bot as an admin to the group');
    console.log('2. Sent at least one message in the group\n');

    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (!response.ok) {
                    console.error('\x1b[31mError:\x1b[0m', response.description);
                    process.exit(1);
                }

                if (response.result.length === 0) {
                    console.log('\x1b[33mNo recent updates found!\x1b[0m');
                    console.log('Please:');
                    console.log('1. Make sure your bot is an admin in the group');
                    console.log('2. Send a message in the group');
                    console.log('3. Run this script again');
                    process.exit(0);
                }

                console.log('\x1b[32mFound groups:\x1b[0m\n');
                const groups = new Set();
                
                response.result.forEach(update => {
                    if (update.message && update.message.chat.type.includes('group')) {
                        const { id, title, type } = update.message.chat;
                        groups.add(`Group ID: ${id}\nName: ${title}\nType: ${type}\n`);
                    }
                });

                if (groups.size === 0) {
                    console.log('\x1b[33mNo groups found in recent updates\x1b[0m');
                    return;
                }

                groups.forEach(group => console.log(group));
                
            } catch (error) {
                console.error('\x1b[31mError parsing response:\x1b[0m', error.message);
                process.exit(1);
            }
        });
    });

    req.on('error', (error) => {
        console.error('\x1b[31mNetwork error:\x1b[0m', error.message);
        process.exit(1);
    });

    req.end();
} else {
    console.error('\x1b[31mError:\x1b[0m TELEGRAM_BOT_TOKEN environment variable is not set');
    process.exit(1);
}
