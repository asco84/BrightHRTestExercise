const { expect } = require('@playwright/test');

exports.EmployeesPage = class EmployeesPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('h1:has-text("Employee Hub")');
    this.addEmployeeButton = page.getByRole('button', { name: 'Add employee' });
    this.formHeader = page.locator('h2:has-text("Add new employee")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]');
    this.startDateInput = page.locator('#startDate');
    this.jobTitleInput = page.locator('input[name="jobTitle"]');
    this.saveButton = page.getByRole('button', { name: 'Save new employee' });
    this.successMessage = page.getByText(/added to BrightHR Lite/i);
    this.addAnotherEmployeeButton = page.getByRole('button', { name: 'Add another employee' });
    this.closeModalButton = page.getByRole('button', { name: 'Close modal' });
    this.employeeCard = this.page.locator('div:has(a[data-testid="EditButton"])');
  }

  async verifyEmployeesPageVisible() {
        await expect(this.pageHeader).toBeVisible();
  }

  async clickAddEmployeeButton() {
        await this.addEmployeeButton.click();
        await expect(this.formHeader).toBeVisible();
  }

  async addEmployeeDataAndSave(employee) {
        await this.firstNameInput.fill(employee.firstName);
        await this.lastNameInput.fill(employee.lastName);
        await this.emailInput.fill(employee.email);
        await this.phoneNumberInput.fill(employee.phoneNumber);
        await this.jobTitleInput.fill(employee.jobTitle);
        await this.startDateInput.fill(employee.startDate);

        await this.saveButton.click();
  }

  async checkSuccessMessageForEmployeeName(employee) {
        const displayedName = employee.firstName;
        await expect(this.successMessage).toContainText(displayedName);
  }

  async addAnotherEmployee() {
        await this.addAnotherEmployeeButton.click();
        await expect(this.formHeader).toBeVisible();
  }

  async closeAddEmployeeModal() {
        await this.closeModalButton.click();
        await expect(this.pageHeader).toBeVisible();
  }
  
  async verifyCreatedEmployeesAreDisplayed(...employees) {
        for (const employee of employees) {
            await expect(
              this.#getEmployeeCard(employee.firstName, employee.lastName, employee.jobTitle)
            ).toBeVisible();
        }
   }
   
   #getEmployeeCard(firstName, lastName, jobTitle) {
        const fullName = `${firstName} ${lastName}`;
        return this.employeeCard
            .filter({ hasText: new RegExp(`^${fullName}$`, 'i') })
            .filter({ hasText: new RegExp(`^${jobTitle}$`, 'i') })
            .first();
   }
};