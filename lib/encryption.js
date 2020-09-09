const bcrypt = require('bcrypt');

exports.encrypt = async payload => {
    // If there is nothing to encrypt return null (rather than a hashed version of undefined) ;)
    if (!payload) return null;
    const saltRounds = 12;
    const hash = await bcrypt.hash(payload, saltRounds);
    return hash;
}

exports.check = async (clear, hash) => {
    // Return true or false depending on whether a given string matches the hash (for authentication)
    return await bcrypt.compare(clear, hash);
}