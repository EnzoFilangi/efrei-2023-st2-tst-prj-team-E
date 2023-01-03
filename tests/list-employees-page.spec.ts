import {test, expect} from '@playwright/test';
import axios from 'axios';
import {EmployeesListPage} from "./pages/employees-list-page";
import {AddEmployeePage} from "./pages/add-employee-page";
import {generateValidEmployeeFormData} from "./helpers/generator";

test.beforeEach(async () => {
    await axios.post('https://e.hr.dmerej.info/reset_db');
});

test('Page should be empty by default', async ({ page }) => {
    const employeeListPage = new EmployeesListPage(page);
    await employeeListPage.goto();

    const employees = await employeeListPage.getEmployeeEntries()

    expect(employees).toEqual([])
});

test('Page should display the right employees', async ({ page }) => {
    const employeesListPage = new EmployeesListPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    // Insert two employees in the database
    const data1 = generateValidEmployeeFormData();
    const data2 = generateValidEmployeeFormData();
    data2.name = "cd"
    data2.email = "c@d.com"
    await addEmployeePage.goto();
    await addEmployeePage.fillForm(data1);
    await addEmployeePage.submitForm();
    await addEmployeePage.goto();
    await addEmployeePage.fillForm(data2);
    await addEmployeePage.submitForm();

    await employeesListPage.goto();
    const employees = await employeesListPage.getEmployeeEntries()

    expect(employees.length).toEqual(2)
    expect(employees).toContainEqual({
        name: "ab",
        email: "a@b.com",
        manager: false
    })
    expect(employees).toContainEqual({
        name: "cd",
        email: "c@d.com",
        manager: false
    })
});

test('Clicking the edit button should redirect to the edit page', async ({ page }) => {
    const employeesListPage = new EmployeesListPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    // Insert an employe in the database
    await addEmployeePage.goto();
    const data = generateValidEmployeeFormData();
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    await employeesListPage.goto();
    await employeesListPage.clickFirstEdit();

    await expect(page).toHaveURL(/https:\/\/e.hr.dmerej.info\/employee\/.*/)
});

test('Clicking the delete button should redirect to the delete page', async ({ page }) => {
    const employeesListPage = new EmployeesListPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    // Insert an employe in the database
    await addEmployeePage.goto();
    const data = generateValidEmployeeFormData();
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    await employeesListPage.goto();
    await employeesListPage.clickFirstDelete();

    await expect(page).toHaveURL(/https:\/\/e.hr.dmerej.info\/employee\/delete\/.*/)
});