module.exports = {
    version: '1.0.0',
    telegramApiBase: 'https://api.telegram.org',
    maxMemberLimit: 99999,
    maxExpireHours: 8760, // 1 year
    presetExpirations: {
        '24h': 24,
        '7d': 168,    // 7 * 24
        '30d': 720    // 30 * 24
    }
};
