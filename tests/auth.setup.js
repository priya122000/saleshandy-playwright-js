const { test } = require('@playwright/test');
const path = require('path');
const { buildSignupAccount } = require('../utils/accountFactory');
const { getAccountTypes } = require('../data/accountTypes');
const { LoginPage } = require('../pages/LoginPage');
const { SignupPage } = require('../pages/SignupPage');
const { OnboardingPage } = require('../pages/OnboardingPage');

for (const accountType of getAccountTypes()) {
  test(`create or reuse authenticated ${accountType.displayName} user`, async ({ page }) => {
    const account = buildSignupAccount(accountType.key);
    const authFile = path.join(__dirname, '..', 'playwright', '.auth', `${account.key}.json`);

    const accountSpecificEmail = process.env[`SALES_${account.key.toUpperCase()}_EMAIL`];
    const accountSpecificPassword = process.env[`SALES_${account.key.toUpperCase()}_PASSWORD`];
    const genericEmail = process.env.SALES_ACCOUNT_EMAIL;
    const genericPassword = process.env.SALES_ACCOUNT_PASSWORD;

    if ((accountSpecificEmail && accountSpecificPassword) || (genericEmail && genericPassword)) {
      const loginPage = new LoginPage(page);
      await loginPage.login(account.user);
    } else {
      const signupPage = new SignupPage(page);
      const onboardingPage = new OnboardingPage(page);

      await signupPage.signup(account);
      await onboardingPage.complete(account);
    }

    await page.context().storageState({ path: authFile });
  });
}
