const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/dashboard');
    await expect(this.page).toHaveURL(/dashboard|app/i);
  }

  async expectAccountSpecificUi(account) {
    for (const expected of account.expectedUi) {
      await expect(this.page.getByText(expected).first()).toBeVisible();
    }

    for (const forbidden of account.forbiddenUi) {
      await expect(this.page.getByText(forbidden).first()).toHaveCount(0);
    }
  }
}

module.exports = {
  DashboardPage
};
