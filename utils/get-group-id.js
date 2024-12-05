#!/usr/bin/env node

const https = require('https');

if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('\x1b[31mError:\x1b[0m TELEGRAM_BOT_TOKEN environment variable is not set');
    process.exit(1);
}

console.log('\x1b[36mChecking bot access...\x1b[0m');

// First verify the bot token
const checkOptions = {
    hostname: 'api.telegram.org',
    path: `/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`,
    method: 'GET'
};

const checkReq = https.request(checkOptions, (checkRes) => {
    let checkData = '';
    
    checkRes.on('data', (chunk) => {
        checkData += chunk;
    });

    checkRes.on('end', () => {
        try {
            const checkResponse = JSON.parse(checkData);
            if (!checkResponse.ok) {
                console.error('\x1b[31mError:\x1b[0m Invalid bot token or bot is not accessible');
                process.exit(1);
            }
            
            console.log('\x1b[32mBot connected successfully!\x1b[0m');
            console.log(`Bot name: @${checkResponse.result.username}\n`);
            console.log('\x1b[36mFetching group updates...\x1b[0m');
            console.log('Important steps:');
            console.log('1. Add this bot (@' + checkResponse.result.username + ') as an admin to your group');
            console.log('2. Grant these permissions to the bot in group settings:');
            console.log('   - Can invite users through invite link');
            console.log('3. Send any message in the group');
            console.log('4. Run this script again\n');

            // After successful bot check, get updates
            const updateOptions = {
                hostname: 'api.telegram.org',
                path: `/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`,
                method: 'GET'
            };

            const updateReq = https.request(updateOptions, (updateRes) => {
                let updateData = '';

                updateRes.on('data', (chunk) => {
                    updateData += chunk;
                });

                updateRes.on('end', () => {
                    try {
                        const response = JSON.parse(updateData);
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

            updateReq.on('error', (error) => {
                console.error('\x1b[31mNetwork error:\x1b[0m', error.message);
                process.exit(1);
            });

            updateReq.end();

        } catch (error) {
            console.error('\x1b[31mError parsing bot check response:\x1b[0m', error.message);
            process.exit(1);
        }
    });
});

checkReq.on('error', (error) => {
    console.error('\x1b[31mNetwork error:\x1b[0m', error.message);
    process.exit(1);
});

checkReq.end();
