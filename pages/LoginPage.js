const { expect } = require('@playwright/test');
const { DashboardPage } = require('./DashboardPage.js');
require('dotenv').config();

if(!process.env.EMAIL || !process.env.PASSWORD) {
  console.error('EMAIL and PASSWORD environment variables could not be found.');
  process.exit(1);
};

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.getByTestId('login-button');
  }

  async loginToBrightHRSandbox(username=process.env.EMAIL, password=process.env.PASSWORD) {
      await this.#navigateToUrlAndVerifySuccessfulHttpResponse();
      await this.#completeAndSubmitLogin(username, password)
      const dashboardpage = new DashboardPage(this.page);
      await dashboardpage.expectProfileHeaderVisible();
  }

  async #navigateToUrlAndVerifySuccessfulHttpResponse() {
      const response = await this.page.goto(process.env.URL)
      expect(response.status()).toBe(200);
  }

  async #completeAndSubmitLogin(username, password){
      await this.username.fill(username);
      await this.password.fill(password);
      await this.loginButton.click();
  }
};

