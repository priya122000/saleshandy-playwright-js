const { test } = require('@playwright/test');
const { getAccountTypes } = require('../data/accountTypes');
const { OnboardingPage } = require('../pages/OnboardingPage');

for (const account of getAccountTypes()) {
  test.describe(`${account.displayName} onboarding`, () => {
    test.use({ storageState: `playwright/.auth/${account.key}.json` });

    test(`authenticated user sees ${account.displayName} onboarding shape ${account.tag}`, async ({ page }) => {
      await page.goto('/onboarding');
      const onboardingPage = new OnboardingPage(page);
      await onboardingPage.expectLoaded(account);
    });
  });
}
