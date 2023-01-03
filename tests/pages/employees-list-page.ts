import {Locator, Page} from "@playwright/test";
import {EmployeeEntry} from "../interfaces/employeeEntry";

export class EmployeesListPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(){
        await this.page.goto("https://e.hr.dmerej.info/employees")
    }

    async getEmployeeEntries(){
        const tableRows: Locator = this.page.locator("body > table > tbody:nth-child(3) > tr")

        const employees: EmployeeEntry[] = []
        for (const row of await tableRows.all()){
            employees.push({
                name: await row.locator("td:nth-child(1)").innerText(),
                email: await row.locator("td:nth-child(2)").innerText(),
                manager: (await row.locator("td:nth-child(3)").innerText()).includes("yes"),
            })
        }

        return employees;
    }

    async clickFirstEdit(){
        await this.page.locator("body > table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(4) > a").click()
    }

    async clickFirstDelete(){
        await this.page.locator("body > table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(5) > a").click()
    }
}