const crypto = require('crypto');
function encrypt(value) {
    return crypto.createHmac('sha256', 'hacktiv8').update(value).digest('hex');
}

module.exports = encrypt