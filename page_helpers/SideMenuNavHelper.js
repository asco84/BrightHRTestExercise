const { expect } = require('@playwright/test');

exports.SideMenuNavHelper = class SideMenuNavHelper {
  constructor(page) {
    this.page = page;
    this.employeesPageLink = page.getByTestId('sideBar').getByRole('link', { name: 'Employees' });
  }

  async navigateToEmployeesPage() {
    await this.employeesPageLink.click();
    await expect(this.page).toHaveURL(/.*employee-hub/);
  }
};
