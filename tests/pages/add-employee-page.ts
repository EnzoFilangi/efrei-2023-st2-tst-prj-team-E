import {Locator, Page} from "@playwright/test";
import {EmployeeFormData} from "../interfaces/employeeFormData";

export class AddEmployeePage {
    readonly page: Page;
    readonly formFields: string[]

    constructor(page: Page) {
        this.page = page;
        this.formFields = ["id_name", "id_email", "id_address_line1", "id_address_line2", "id_city", "id_zip_code", "id_hiring_date", "id_job_title"];
    }

    async goto(){
        await this.page.goto("https://e.hr.dmerej.info/add_employee")
    }

    async fillForm(data: EmployeeFormData){
        await this.page.locator('id=id_name').fill(data.name);
        await this.page.locator('id=id_email').fill(data.email);
        await this.page.locator('id=id_address_line1').fill(data.adress1);
        await this.page.locator('id=id_address_line2').fill(data.adress2);
        await this.page.locator('id=id_city').fill(data.city);
        await this.page.locator('id=id_zip_code').fill(data.zip);
        await this.page.locator('id=id_hiring_date').fill(data.hiringDate);
        await this.page.locator('id=id_job_title').fill(data.jobTitle);
    }

    async submitForm(){
        await this.page.locator("[type=submit]").click();
    }

    getFieldById(id: string): Locator {
        return this.page.locator(`id=${id}`);
    }
}