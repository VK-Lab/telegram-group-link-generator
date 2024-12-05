const https = require('https');
const { telegramApiBase, presetExpirations } = require('../config');

/**
 * Generate an invite link for a Telegram group
 * @param {Object} params - Parameters for generating the invite link
 * @param {string} params.token - Telegram Bot API token
 * @param {string} params.groupId - Group ID
 * @param {number} [params.expireHours] - Link expiration time in hours
 * @param {number} [params.memberLimit] - Maximum number of users that can join
 * @returns {Promise<string>} Invite link
 */
async function generateInviteLink({ token, groupId, expireHours, memberLimit }) {
    const params = new URLSearchParams({
        chat_id: groupId
    });

    if (expireHours) {
        const hours = typeof expireHours === 'string' ? presetExpirations[expireHours] : expireHours;
        params.append('expire_date', Math.floor(Date.now() / 1000 + hours * 3600));
    }

    if (memberLimit) {
        params.append('member_limit', memberLimit);
    }

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${token}/createChatInviteLink?${params.toString()}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
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
                        reject(new Error(response.description || 'Failed to generate invite link'));
                        return;
                    }
                    resolve(response.result.invite_link);
                } catch (error) {
                    reject(new Error('Failed to parse Telegram API response'));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Network error: ${error.message}`));
        });

        req.end();
    });
}

module.exports = {
    generateInviteLink
};
