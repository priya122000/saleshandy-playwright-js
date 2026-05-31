const { getAccountType } = require('../data/accountTypes');
const { existingUser, generatedUser } = require('../data/testUsers');

function buildSignupAccount(accountTypeName) {
  const account = getAccountType(accountTypeName);
  const user = existingUser(account) || generatedUser(account);

  return {
    ...account,
    user
  };
}

module.exports = {
  buildSignupAccount
};
