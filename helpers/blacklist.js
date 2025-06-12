const blacklistedTokens = [];
module.exports = {
  addToken(token) {
    blacklistedTokens.push(token);
  },
  isBlacklisted(token) {
    return blacklistedTokens.includes(token);
  }
};
