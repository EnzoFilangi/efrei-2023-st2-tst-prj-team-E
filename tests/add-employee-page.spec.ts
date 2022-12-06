import {test, expect, Page} from '@playwright/test';
import {EmployeeFormData} from "./interfaces/employeeFormData";

import axios from 'axios';

async function fillForm(page: Page, data: EmployeeFormData) : Promise<void> {
    await page.locator('id=id_name').fill(data.name);
    await page.locator('id=id_email').fill(data.email);
    await page.locator('id=id_address_line1').fill(data.adress1);
    await page.locator('id=id_address_line2').fill(data.adress2);
    await page.locator('id=id_city').fill(data.city);
    await page.locator('id=id_zip_code').fill(data.zip);
    await page.locator('id=id_hiring_date').fill(data.hiringDate);
    await page.locator('id=id_job_title').fill(data.jobTitle);
}

test.beforeEach(async ({ page }, testInfo) => {
    await axios.post('https://e.hr.dmerej.info/reset_db');
});


test('should insert an employee when filling the fields with valid data', async ({ page }) => {
    const data : EmployeeFormData = {
        adress1: "25",
        adress2: "Avenue de la République",
        city: "Paris",
        email: "a@b.com",
        hiringDate: "2022-12-12",
        jobTitle: "Chief test officer",
        name: "ab",
        zip: "75000"
    }

    // Fill the form and submit it to try to create the new employee
    await page.goto('https://e.hr.dmerej.info/add_employee');
    await fillForm(page, data);
    await page.locator("[type=submit]").click();

    // Expect redirect to employee list page if the addition was a success
    await expect(page).toHaveURL("https://e.hr.dmerej.info/employees");
});
