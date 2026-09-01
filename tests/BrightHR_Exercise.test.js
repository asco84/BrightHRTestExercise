const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { EmployeesPage } = require('../pages/EmployeesPage.js');
const { SideMenuNavHelper } = require('../page_helpers/SideMenuNavHelper.js');
const { employeeOne, employeeTwo } = require('../test-data/EmployeeData.js');
require('dotenv').config();

let loginPage;
let employeesPage;
let sideMenuNavHelper;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  employeesPage = new EmployeesPage(page);
  sideMenuNavHelper = new SideMenuNavHelper(page);

  await loginPage.loginToBrightHRSandbox();
});

test('Add Two Employee Records and Verify Success Messages', async ({}) => {
  await sideMenuNavHelper.navigateToEmployeesPage();
  await employeesPage.verifyEmployeesPageVisible();
  await employeesPage.clickAddEmployeeButton();
  await employeesPage.addEmployeeDataAndSave(employeeOne);
  await employeesPage.checkSuccessMessageForEmployeeName(employeeOne);
  await employeesPage.addAnotherEmployee();
  await employeesPage.addEmployeeDataAndSave(employeeTwo);
  await employeesPage.checkSuccessMessageForEmployeeName(employeeTwo);

  await employeesPage.closeAddEmployeeModal();
  
  await sideMenuNavHelper.navigateToEmployeesPage();
  await employeesPage.verifyEmployeesPageVisible();

  await employeesPage.verifyCreatedEmployeesAreDisplayed(employeeOne, employeeTwo);

});