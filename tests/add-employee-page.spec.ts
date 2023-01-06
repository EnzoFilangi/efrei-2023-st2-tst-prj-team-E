import {test, expect} from '@playwright/test';
import {EmployeeFormData} from "./interfaces/employeeFormData";

import {AddEmployeePage} from "./pages/add-employee-page";
import {generateValidEmployeeFormData} from "./helpers/generator";
import {resetDatabase} from "./helpers/database";

test.beforeEach(resetDatabase);

test('should insert an employee when filling the fields with valid data', async ({ page }) => {
    const data: EmployeeFormData = generateValidEmployeeFormData()

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    // Fill the form and submit it to try to create the new employee
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Expect redirect to employee list page if the addition was a success
    await expect(page).toHaveURL("https://e.hr.dmerej.info/employees");
});

test('should not insert an employee when the form is empty', async ({ page }) => {
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    // Submit the form without any data in it
    await addEmployeePage.submitForm();

    // Expect no redirection
    await expect(page).toHaveURL("https://e.hr.dmerej.info/add_employee");
    // It should focus the cursor on the first field
    await expect(addEmployeePage.getFieldById("id_name")).toBeFocused();
});

test('should not insert an employee when a mandatory field is missing', async ({ page }) => {
    const data: EmployeeFormData = generateValidEmployeeFormData()

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    for (let field of addEmployeePage.formFields){
        if (field !== "id_address_line2") { // Ignore the only optionnal field
            await addEmployeePage.fillForm(data);
            await addEmployeePage.getFieldById(field).fill("");

            await addEmployeePage.submitForm()

            await expect(page).toHaveURL("https://e.hr.dmerej.info/add_employee");
            await expect(addEmployeePage.getFieldById(field)).toBeFocused();
        }
    }
});

test('ZIP code field should refuse strings', async ({ page }) => {
    const data: EmployeeFormData = generateValidEmployeeFormData();
    data.zip = "not an integer"

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    // Shouldn't even be able to write a string in the field
    await expect(addEmployeePage.fillForm(data)).rejects.not.toBeUndefined();
});

test('ZIP code field should refuse floats', async ({ page }) => {
    const data: EmployeeFormData = generateValidEmployeeFormData();
    data.zip = "42.42";

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Expect no redirection
    await expect(page).toHaveURL("https://e.hr.dmerej.info/add_employee");
    // It should focus the cursor on the field with wrong data
    await expect(addEmployeePage.getFieldById("id_zip_code")).toBeFocused();
});

test('ZIP code field should refuse negative integers', async ({ page }) => {
    const data: EmployeeFormData = generateValidEmployeeFormData();
    data.zip = "-42";

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Expect no redirection
    await expect(page).toHaveURL("https://e.hr.dmerej.info/add_employee");
    // It should focus the cursor on the field with wrong data
    await expect(addEmployeePage.getFieldById("id_zip_code")).toBeFocused();
});

test('It should not be possible to insert two employees with the same email address', async ({page}) => {
    const data: EmployeeFormData = generateValidEmployeeFormData()

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    // Fill the form and submit it to try to create the first employee
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Try to create the second employee
    await addEmployeePage.goto();
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Expect second addition to fail
    await expect(page).toHaveURL("https://e.hr.dmerej.info/add_employee");
})
