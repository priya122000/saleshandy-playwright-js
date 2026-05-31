# Saleshandy Playwright JS Automation

This repository contains a reusable Playwright JavaScript test framework for Saleshandy account sign-up, onboarding, and account-specific UI validation.

## Goal

Saleshandy supports three account types:

- Personal Use
- Business
- Client

The automation uses one generic sign-up and onboarding flow. The account type is passed as input, and account-specific form fields, onboarding steps, and UI assertions are resolved from centralized test data.

## Tech Stack

- Playwright Test
- JavaScript
- Node.js
- VS Code with the Playwright extension
- Environment-based configuration using `dotenv`

## Project Structure

```text
saleshandy-playwright-js/
  .vscode/
  data/
    accountTypes.js
    testUsers.js
  docs/
    automation-coverage-summary.md
    test-cases.csv
    test-cases.md
  pages/
    DashboardPage.js
    LoginPage.js
    OnboardingPage.js
    SignupPage.js
  tests/
    auth.setup.js
    account-ui.spec.js
    onboarding.spec.js
    signup.spec.js
  utils/
    accountFactory.js
    env.js
  playwright.config.js
  package.json
```

## Setup

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Install Playwright browsers:

```bash
npx playwright install
```

5. Copy `.env.example` to `.env` and update values if needed.

## Run Tests

Run all tests:

```bash
npm test
```

Run headed:

```bash
npm run test:headed
```

Run only one account type:

```bash
npm run test:personal
npm run test:business
npm run test:client
```

Open the HTML report:

```bash
npm run report
```

## Parameterized Sign-Up Design

The test data in `data/accountTypes.js` defines:

- Signup option label
- Signup form fields
- Onboarding steps
- Account-specific UI elements

Tests call:

```js
await signupPage.signup(account);
await onboardingPage.complete(account);
await dashboardPage.expectAccountSpecificUi(account);
```

The same code path supports `Personal Use`, `Business`, and `Client`; only the input data changes.

## Avoiding Repeated Login

`tests/auth.setup.js` creates or reuses one user per account type and saves browser sessions to:

```text
playwright/.auth/personal.json
playwright/.auth/business.json
playwright/.auth/client.json
```

Authenticated tests use these files through Playwright `storageState`, so login is not repeated in every test. This makes execution faster and keeps authentication maintenance in one setup file.

If account-specific variables such as `SALES_BUSINESS_EMAIL` and `SALES_BUSINESS_PASSWORD` are provided, setup logs in with those existing users. Otherwise, it creates new users for each account type.

## Assumptions

- The target QA environment allows automated sign-up with a test email domain.
- Email verification is disabled, bypassed, or handled outside this demo framework.
- Stable `data-testid` attributes are recommended. The current locators combine accessible roles, labels, and expected test IDs to show the intended structure.
- Account labels are treated as `Personal Use`, `Business`, and `Client`. If the product UI says `Clients`, update only `data/accountTypes.js`.

## Deliverables

- Automation code in this repository.
- Manual test cases in `docs/test-cases.md` and `docs/test-cases.csv`.
- Automation coverage summary in `docs/automation-coverage-summary.md`.
