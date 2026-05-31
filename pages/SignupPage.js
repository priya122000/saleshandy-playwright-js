const { expect } = require('@playwright/test');

class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByRole('link', { name: /sign up|start free|get started/i });
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.fullNameInput = page.getByLabel(/full name|name/i);
    this.companyInput = page.getByLabel(/company|organization/i);
    this.roleInput = page.getByLabel(/role|job title/i);
    this.teamSizeSelect = page.getByLabel(/team size|company size/i);
    this.submitButton = page.getByRole('button', { name: /sign up|create account|continue/i });
  }

  async goto() {
    await this.page.goto('/');
    if (await this.signupLink.isVisible().catch(() => false)) {
      await this.signupLink.click();
    }
    await expect(this.page).toHaveURL(/signup|register|auth/i);
  }

  async chooseAccountType(account) {
    const accountOption = this.page
      .getByTestId(`account-type-${account.key}`)
      .or(this.page.getByRole('button', { name: new RegExp(account.signupOption, 'i') }))
      .or(this.page.getByText(new RegExp(account.signupOption, 'i')));

    await accountOption.first().click();
  }

  async fillCommonFields(account) {
    await this.emailInput.fill(account.user.email);
    await this.passwordInput.fill(account.user.password);
    await this.fullNameInput.fill(account.signupFields.fullName);
  }

  async fillAccountSpecificFields(account) {
    const { companyName, role, teamSize } = account.signupFields;

    if (companyName && await this.companyInput.isVisible().catch(() => false)) {
      await this.companyInput.fill(companyName);
    }

    if (role && await this.roleInput.isVisible().catch(() => false)) {
      await this.roleInput.fill(role);
    }

    if (teamSize && await this.teamSizeSelect.isVisible().catch(() => false)) {
      await this.teamSizeSelect.selectOption({ label: teamSize }).catch(async () => {
        await this.teamSizeSelect.fill(teamSize);
      });
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async signup(account) {
    await this.goto();
    await this.chooseAccountType(account);
    await this.fillCommonFields(account);
    await this.fillAccountSpecificFields(account);
    await this.submit();
  }

  async expectValidationMessage(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}

module.exports = {
  SignupPage
};
