const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.yourProfileHeader = page.locator('h2:has-text("Your Profile")');
    this.employeesPageLink = page.getByRole('link', { name: 'Employees' });
  }

  async expectProfileHeaderVisible() {
    await expect(this.yourProfileHeader).toBeVisible();
  }
};



