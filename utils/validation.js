const { maxMemberLimit, maxExpireHours } = require('../config');

/**
 * Validate user input
 * @param {Object} options - CLI options
 * @returns {string|null} Error message or null if valid
 */
function validateInput(options) {
    if (!options.token) {
        return 'Bot token is required (use -t or --token)';
    }

    if (!options.group) {
        return 'Group ID is required (use -g or --group)';
    }

    if (!/^\d+:[A-Za-z0-9_-]{35}$/.test(options.token)) {
        return 'Invalid bot token format';
    }

    if (options.expires !== undefined) {
        if (isNaN(options.expires) || options.expires <= 0) {
            return 'Expiration time must be a positive number';
        }
        if (options.expires > maxExpireHours) {
            return `Expiration time cannot exceed ${maxExpireHours} hours`;
        }
    }

    if (options.memberLimit !== undefined) {
        if (isNaN(options.memberLimit) || options.memberLimit <= 0) {
            return 'Member limit must be a positive number';
        }
        if (options.memberLimit > maxMemberLimit) {
            return `Member limit cannot exceed ${maxMemberLimit}`;
        }
    }

    return null;
}

module.exports = {
    validateInput
};
