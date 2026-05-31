const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /log in|login|sign in/i });
  }

  async goto() {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
  }

  async login(user) {
    await this.goto();
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/dashboard|onboarding|app/i);
  }
}

module.exports = {
  LoginPage
};
