const { test } = require('@playwright/test');
const { getAccountTypes } = require('../data/accountTypes');
const { buildSignupAccount } = require('../utils/accountFactory');
const { SignupPage } = require('../pages/SignupPage');
const { OnboardingPage } = require('../pages/OnboardingPage');
const { DashboardPage } = require('../pages/DashboardPage');

for (const accountType of getAccountTypes()) {
  test(`sign up and complete onboarding for ${accountType.displayName} ${accountType.tag}`, async ({ page }) => {
    const account = buildSignupAccount(accountType.key);
    const signupPage = new SignupPage(page);
    const onboardingPage = new OnboardingPage(page);
    const dashboardPage = new DashboardPage(page);

    await signupPage.signup(account);
    await onboardingPage.complete(account);
    await dashboardPage.expectAccountSpecificUi(account);
  });
}

test('shows validation for invalid email', async ({ page }) => {
  const account = buildSignupAccount('Personal Use');
  account.user.email = 'invalid-email';

  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.chooseAccountType(account);
  await signupPage.fillCommonFields(account);
  await signupPage.submit();
  await signupPage.expectValidationMessage(/valid email|invalid email/i);
});
