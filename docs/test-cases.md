# Saleshandy Manual Test Cases

## Sign-Up Flow

| ID | Type | Account | Scenario | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-SU-001 | Positive | Personal Use | Sign up with valid personal user data | Open app, choose Personal Use, enter valid name/email/password, submit | Account is created and Personal onboarding opens |
| TC-SU-002 | Positive | Business | Sign up with valid business data | Open app, choose Business, enter user and company details, submit | Account is created and Business onboarding opens |
| TC-SU-003 | Positive | Client | Sign up with valid client/agency data | Open app, choose Client, enter required details, submit | Account is created and Client onboarding opens |
| TC-SU-004 | Negative | All | Invalid email format | Enter `abc` as email and submit | Email validation message is shown |
| TC-SU-005 | Negative | All | Empty required fields | Submit without required values | Required-field validation appears and user remains on sign-up page |
| TC-SU-006 | Negative | All | Weak password | Enter password below policy and submit | Password policy validation is shown |
| TC-SU-007 | Negative | All | Duplicate email | Sign up using an existing email | Duplicate account validation is shown |
| TC-SU-008 | Edge | All | Email with plus alias | Enter `qa+personal@example.com` | Email is accepted if domain is valid |
| TC-SU-009 | Edge | All | Leading/trailing spaces | Enter spaces around name and email | Values are trimmed or validation is shown |
| TC-SU-010 | Edge | Business, Client | Long company name | Enter maximum-length company name | Field accepts allowed length or shows clear validation |

## Onboarding Flow

| ID | Type | Account | Scenario | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-OB-001 | Positive | Personal Use | Complete personal onboarding | Create Personal account and complete Personal-specific steps | Personal dashboard is displayed |
| TC-OB-002 | Positive | Business | Complete business onboarding | Create Business account and complete Business-specific steps | Business dashboard is displayed |
| TC-OB-003 | Positive | Client | Complete client onboarding | Create Client account and complete Client-specific steps | Client dashboard is displayed |
| TC-OB-004 | Negative | All | Skip optional step | Select skip where available | User proceeds without blocking |
| TC-OB-005 | Edge | All | Refresh during onboarding | Refresh page mid-onboarding | User stays on same step or resumes correctly |
| TC-OB-006 | Edge | All | Logout during onboarding | Logout, log back in | User is returned to incomplete onboarding |
| TC-OB-007 | Edge | All | Browser back navigation | Use browser back after completing a step | Completed state remains consistent |

## Account-Specific Validations

| ID | Type | Account | Scenario | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-UI-001 | Positive | Personal Use | Personal-only UI | Log in as Personal user | Personal workspace and personal campaign UI are visible |
| TC-UI-002 | Positive | Business | Business-only UI | Log in as Business user | Team, billing, and business workspace UI are visible |
| TC-UI-003 | Positive | Client | Client-only UI | Log in as Client user | Clients/client management UI is visible |
| TC-UI-004 | Negative | Personal Use | No client management for personal user | Log in as Personal user | Client management UI is not visible |
| TC-UI-005 | Negative | Business | No client portal for business user | Log in as Business user | Client portal UI is not visible unless enabled for plan |
| TC-UI-006 | Negative | Client | No personal workspace label for client user | Log in as Client user | Personal workspace UI is not visible |
| TC-UI-007 | Edge | All | Direct URL access to another account type area | Navigate directly to restricted URL | User sees 403, redirect, or unavailable state |
