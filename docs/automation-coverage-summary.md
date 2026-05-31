# Automation Coverage Summary

## Covered

| Area | Coverage |
| --- | --- |
| Parameterized sign-up | One reusable `SignupPage.signup(account)` flow supports Personal Use, Business, and Client accounts. |
| Account-specific forms | Form data comes from `data/accountTypes.js`; fields are filled only when relevant and visible. |
| Onboarding | `OnboardingPage.complete(account)` uses account-specific onboarding steps from centralized data. |
| Account-specific UI | Dashboard assertions validate expected UI and absence of forbidden UI for each account type. |
| Negative validation | Invalid email validation is automated as a representative negative sign-up case. |
| Authentication reuse | `auth.setup.js` creates or logs in once per account type and saves `storageState` for authenticated specs. |

## Recommended Next Scenarios

| Priority | Scenario |
| --- | --- |
| High | Duplicate email sign-up validation. |
| High | Weak password validation and password policy boundaries. |
| High | Required-field validation per account type. |
| Medium | Browser back/refresh during onboarding. |
| Medium | Resume onboarding after logout/login. |
| Medium | Mobile viewport smoke coverage. |
| Low | Accessibility checks for form labels and focus order. |

## Notes

Stable selectors should be added in the application for long-term reliability:

- `data-testid="account-type-personal"`
- `data-testid="account-type-business"`
- `data-testid="account-type-client"`
- `data-testid` values for onboarding step options

The framework currently uses accessible locators and test-id fallbacks so it remains readable and maintainable.
