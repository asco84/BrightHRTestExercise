# BrightHR Playwright Test Exercise

## Overview

This project is an automated test suite for the BrightHR Lite application, focusing on employee addition features. Tests are written in JavaScript/Node.js using Playwright Test framework with a Page Object Model pattern for maintainability and scalability.

## Features

- Page Object Model architecture for clean, maintainable code
- CI/CD integration with GitHub Actions
- User credentials stored as GitHub secrets to ensure security and protection of personal data
- HTML reporting and trace retention on failures
- Automatic retry logic for flaky network conditions
- Environment-based configuration with `.env` support

## Prerequisites

- Node.js 24+ installed
- npm (comes with Node.js)
- Manually create and verify a BrightHR Lite account at https://sandbox-app.brighthr.com/lite

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

3. **Configure environment variables for running and testing locally**
   Create an `.env` file in the root directory and use the credentials you used to create your BrightHR Lite account:
   ```
   URL=https://sandbox-login.brighthr.com/login
   EMAIL=your-email@example.com
   PASSWORD=your-password
   ```
Note: .env file containing visible user credentials **MUST NOT** be commited to repository. Add to .gitignore.

## Running Tests

**Run all tests in headed mode:**
```bash
npx playwright test --headed
```

**Run tests in headless mode:**
```bash
npx playwright test
```

**Run tests with UI mode:**
```bash
npx playwright test --ui
```

**Run specific test file:**
```bash
npx playwright test tests/BrightHR_Exercise.test.js
```

**Run with debug mode:**
```bash
npx playwright test --debug
```

## Test Structure

### Current Tests

**Add Two Employee Records and Verify They Are Displayed**
- Tests employee addition workflow by adding two consecutive employees to BrightHR Lite, filling in all required and optional fields
- Verifies success messages appears on completion of each, and checks for the employee name within the success message itself as an extra assertion during the test run
- Confirms employees created are displayed in the main employees page and asserts against full name and job title
- Uses `.first()` to handle duplicate test data, however another solid method would have been to use test.afterEach to remove the test data.
- NOTE: Playwright did not like the checkbox for some reason, so despite planning to uncheck it, I omitted it in the end.

### Page Objects

- **LoginPage**: Handles authentication with the BrightHR sandbox
- **DashboardPage**: Handles dashboard interactions
- **EmployeesPage**: Handles employee creation and assertions
- **SideMenuNavHelper**: Navigation utilities
- **EmployeeData**: Contains test data for each employee to be added to BrightHR

## Configuration

### playwright.config.js

Key settings:
- **Timeout**: 30 seconds per test
- **Expect Timeout**: 10 seconds for assertions
- **Retries**: 1 (automatic retry on failure)
- **Workers**: 1 (sequential execution to prevent data conflicts)
- **Reporter**: HTML report with traces on failure

## CI/CD Pipeline

Tests are currently on run on manual workflow dispatch, however can easily be expanded to run automatically on pushes to main branch or on pull requests on the same.

### Workflow Features
- Node 24 runtime
- .env file generated during workflow using GitHub secrets (Credentials) and variable (URL)
- Dependency caching for speed
- Playwright browser caching
- HTML report artifacts
- Test trace artifacts

**View reports**: After workflow runs, download artifacts from GitHub Actions

## Debugging

### View Failures

1. **HTML Report**
   ```bash
   npx playwright show-report
   ```

2. **Debug Mode**
   ```bash
   npx playwright test --debug
   ```

3. **Screenshots**
   - Automatically captured on test failure
   - Located in `test-results/` folder

4. **Traces**
   - Full browser traces retained on failure
   - View in Playwright Inspector
