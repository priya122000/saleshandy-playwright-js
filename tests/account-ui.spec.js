const { test } = require('@playwright/test');
const { getAccountTypes } = require('../data/accountTypes');
const { DashboardPage } = require('../pages/DashboardPage');

for (const account of getAccountTypes()) {
  test.describe(`${account.displayName} dashboard`, () => {
    test.use({ storageState: `playwright/.auth/${account.key}.json` });

    test(`dashboard validates ${account.displayName} specific UI ${account.tag}`, async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.goto();
      await dashboardPage.expectAccountSpecificUi(account);
    });
  });
}
