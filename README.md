# Log Automobilies Cypress Testing

This repository contains automated tests for the Log Automobilies platform using Cypress. The tests follow the Page Object Model (POM) design pattern and include comprehensive scenarios for signup and login functionalities.

## Project Structure

```text
logAutomobilies/
├── cypress/
│   ├── e2e/                           # Test spec files
│   │   └── 01-become-member/
│   │       ├── login_test.cy.js       # Positive login tests
│   │       ├── login_negative_test.cy.js # Negative, edge, and security login tests
│   │       ├── signup_test.cy.js      # Positive signup tests
│   │       └── signup_negative_test.cy.js # Negative signup tests
│   ├── fixtures/                      # Test data (JSON and images)
│   │   ├── login.json
│   │   ├── loginInvalid.json
│   │   ├── signUp.json
│   │   └── signUpInvalid.json
│   ├── pages/                         # Page Object classes
│   │   ├── LoginPage.js
│   │   └── SignupPage.js
│   └── support/                       # Custom commands and global configuration
│       ├── commands.js
│       └── e2e.js
├── allure-results/                    # Raw test results for Allure
├── allure-report/                     # Generated Allure report
├── package.json                       # Project dependencies and scripts
└── cypress.config.js                  # Cypress configuration
```

## Packages & Dependencies

The project uses the following key packages:

- **Cypress**: Core end-to-end testing framework.
- **cypress-xpath**: Adds XPath selector support to Cypress.
- **allure-cypress**: Allure integration for Cypress to generate detailed reports.
- **allure-commandline**: CLI tool to generate and serve Allure reports.

## Installation

To set up the project locally, ensure you have Node.js installed, then run:

```bash
npm install
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cy:open
```

### Run All Tests (Headless Mode)
```bash
npm run test
# OR
npm run cy:run
```

### Run Specific Test Spec
```bash
npx cypress run --spec cypress/e2e/01-become-member/login_negative_test.cy.js
```

## Reporting

The project is integrated with Allure for enhanced reporting.

### Generate and Open Report
```bash
npm run report
```

### Individual Steps
- Generate Report: `npm run allure:generate`
- Open Generated Report: `npm run allure:open`
- Serve Report (Live): `npm run allure:serve`
