const { expect } = require('@playwright/test');

class OnboardingPage {
  constructor(page) {
    this.page = page;
  }

  async expectLoaded(account) {
    await expect(this.page.getByRole('heading', { name: account.onboarding.expectedHeading })).toBeVisible();
  }

  async complete(account) {
    await this.expectLoaded(account);

    for (const step of account.onboarding.steps) {
      const option = this.page
        .getByTestId(`${account.key}-${step.name.toLowerCase().replace(/\s+/g, '-')}`)
        .or(this.page.getByRole('button', { name: new RegExp(step.option, 'i') }))
        .or(this.page.getByText(new RegExp(step.option, 'i')));

      if (await option.first().isVisible().catch(() => false)) {
        await option.first().click();
      }
    }

    await expect(this.page).toHaveURL(/dashboard|app|campaign/i);
  }
}

module.exports = {
  OnboardingPage
};
