import {Page} from "@playwright/test";
import {EmployeeDetail} from "../interfaces/employeeDetail";

export class EditEmployeePage {
    readonly page: Page


    constructor(page: Page) {
        this.page = page;
    }

    async getEmployeeInfo(): Promise<EmployeeDetail> {
        return {
            name: (await this.page.locator("body > p:nth-child(3)").innerText()).split(" - ")[0],
            email: (await this.page.locator("body > p:nth-child(3)").innerText()).split(" - ")[1],
            job: await this.page.locator("body > p:nth-child(4)").innerText(),
            hiringDate: new Date((await this.page.locator("body > p:nth-child(5)").innerText()).split(" ").slice(2).join(" ") + " 00:00:00Z") // Remove the "Hired on" from "Hired on [Date]" and cast to Date object
        };
    }

    async gotoUpdateBasicInfo() {
        await this.page.locator("body > ul > li:nth-child(1) > a").click();
    }

    async updateBasicInfo(name: string, email: string) {
        const url = this.page.url()
        if(!url.endsWith("basic_info")){
            await this.gotoUpdateBasicInfo();
        }

        await this.page.locator("#id_name").fill(name);
        await this.page.locator("#id_email").fill(email);

        await this.page.locator("body > form > button").click();

        await this.page.goto(url);
    }

    async gotoUpdateAddress() {
        await this.page.locator("body > ul > li:nth-child(2) > a").click();
    }

    async updateAddress(addressLine1: string, addressLine2: string, city: string, zipCode: string) {
        const url = this.page.url()
        if(!url.endsWith("address")){
            await this.gotoUpdateAddress();
        }

        await this.page.locator("#id_address_line1").fill(addressLine1);
        await this.page.locator("#id_address_line2").fill(addressLine2);
        await this.page.locator("#id_city").fill(city);
        await this.page.locator("#id_zip_code").fill(zipCode);

        await this.page.locator("body > form > button").click();

        await this.page.goto(url);
    }

    async getAddress(): Promise<{ zipCode: string; city: string; addressLine1: string; addressLine2: string }> {
        const url = this.page.url()
        if(!url.endsWith("address")){
            await this.gotoUpdateAddress();
        }

        const addressLine1 = await this.page.locator("#id_address_line1").innerText();
        const addressLine2 = await this.page.locator("#id_address_line2").innerText();
        const city = await this.page.locator("#id_city").innerText();
        const zipCode = await this.page.locator("#id_zip_code").innerText();

        await this.page.goto(url);

        return {addressLine1, addressLine2, city, zipCode}
    }

    async gotoUpdateContract() {
        await this.page.locator("body > ul > li:nth-child(3) > a").click();
    }

    async updateContract(jobTitle: string) {
        const url = this.page.url()
        if(!url.endsWith("contract")){
            await this.gotoUpdateContract();
        }

        await this.page.locator("#id_job_title").fill(jobTitle);

        await this.page.locator("body > form > button").click();

        await this.page.goto(url);
    }

    async promoteAsManager() {
        await this.page.locator("body > ul > li:nth-child(4) > a").click();
        await this.page.locator("body > form > button").click();
    }

    async addToTeam(teamName: string) {
        await this.page.locator("body > ul > li:nth-child(5) > a").click();
        await this.page.locator("#id_team").selectOption(teamName);
        await this.page.locator("body > form > button").click();
    }
}