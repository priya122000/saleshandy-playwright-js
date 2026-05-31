const { getEnv } = require('../utils/env');

function existingUser(accountType) {
  const prefix = accountType.key.toUpperCase();
  const email = process.env[`SALES_${prefix}_EMAIL`] || process.env.SALES_ACCOUNT_EMAIL;
  const password = process.env[`SALES_${prefix}_PASSWORD`] || process.env.SALES_ACCOUNT_PASSWORD;

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

function generatedUser(accountType) {
  const domain = getEnv('TEST_EMAIL_DOMAIN', 'example.test');
  const password = getEnv('TEST_PASSWORD', 'StrongPass123!');
  const timestamp = Date.now();
  const email = `qa.${accountType.key}.${timestamp}@${domain}`;

  return { email, password };
}

module.exports = {
  existingUser,
  generatedUser
};
