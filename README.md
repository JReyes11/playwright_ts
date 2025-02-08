

# Playwright Automation in TypeScript

This repository contains automation testing written in TypeScript using the Playwright framework. Tests are designed to run against a local installation of the Cypress Real World App. 


## 🚀 Setup Instructions

### Prerequisites
- Ensure you have Node.js and Git installed. 
- Install the [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app) 
- Start the Cypress Real World App on your local machine via: `yarn dev`


This starts the application at http://localhost:3000.

#
### Clone This Repository 
Clone the test repository and install dependencies.

- `git clone https://github.com/JReyes11/playwright_ts.git`
- `cd playwright_ts`
- `npm install` 

#
### Install Playwright 
Install necessary browsers (Chromium, Firefox, and WebKit) via:
- `npx playwright install`

#
### Running Tests

*Run all tests*

- `npx playwright test`

*Run tests in headed mode (for debugging)*

- `npx playwright test --headed`

*Run a specific test file*

- `npx playwright test tests/example.spec.ts`

Debug mode (with Playwright Inspector)

- `npx playwright test --debug`

#
### Viewing Test Reports

After running tests, view the test report:

`npx playwright show-report`


