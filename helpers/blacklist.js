const blacklistedTokens = [];

module.exports = {
  addToken(token) {
    blacklistedTokens.push(token); // add token on logout
  },
  isBlacklisted(token) {
    return blacklistedTokens.includes(token); // check if token is already logged out
  }
};
