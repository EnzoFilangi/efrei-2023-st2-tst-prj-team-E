import {expect, test} from "@playwright/test";
import axios from "axios";
import {EmployeesListPage} from "./pages/employees-list-page";
import {AddEmployeePage} from "./pages/add-employee-page";
import {generateValidEmployeeFormData} from "./helpers/generator";
import {EditEmployeePage} from "./pages/edit-employee-page";
import {EmployeeDetail} from "./interfaces/employeeDetail";
import {EmployeeEntry} from "./interfaces/employeeEntry";

test.beforeEach(async ({page}) => {
    await axios.post('https://e.hr.dmerej.info/reset_db');

    const employeesListPage = new EmployeesListPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    // Insert an employe in the database
    await addEmployeePage.goto();
    const data = generateValidEmployeeFormData();
    await addEmployeePage.fillForm(data);
    await addEmployeePage.submitForm();

    // Go to the edit page
    await employeesListPage.goto();
    await employeesListPage.clickFirstEdit();
});

test("It should display the right info", async ({page}) => {
    const editEmployeePage = new EditEmployeePage(page);

    const employee: EmployeeDetail = await editEmployeePage.getEmployeeInfo();

    expect(employee.name).toEqual("ab");
    expect(employee.email).toEqual("a@b.com");
    expect(employee.job).toEqual("Chief test officer");
    expect(employee.hiringDate).toEqual(new Date("2022-12-12T00:00:00Z"));
})

test("Should be able to modify the user's basic info", async ({page}) => {
    const editEmployeePage = new EditEmployeePage(page);

    const newName = "Foo";
    const newEmail = "foo@bar.com";

    await editEmployeePage.updateBasicInfo(newName, newEmail);

    const employee: EmployeeDetail = await editEmployeePage.getEmployeeInfo();

    expect(employee.name).toEqual(newName);
    expect(employee.email).toEqual(newEmail);
})

test("Should be able to modify the user's address", async ({page}) => {
    const editEmployeePage = new EditEmployeePage(page);

    const addressLine1: string = "30/32 Avenue de la république"
    const addressLine2: string = "n/a"
    const city: string = "Villejuif"
    const zipCode: string = "94800"

    await editEmployeePage.updateAddress(addressLine1, addressLine2, city, zipCode);

    const newAddress = await editEmployeePage.getAddress();

    expect(newAddress.addressLine1).toEqual(addressLine1);
    expect(newAddress.addressLine2).toEqual(addressLine2);
    expect(newAddress.city).toEqual(city);
    expect(newAddress.zipCode).toEqual(zipCode);
})

test("Should be able to modify the user's contract", async ({page}) => {
    const editEmployeePage = new EditEmployeePage(page);

    const newJob = "New job"

    await editEmployeePage.updateContract(newJob);

    const employee: EmployeeDetail = await editEmployeePage.getEmployeeInfo();

    expect(employee.job).toEqual(newJob);
})

test("Should be able to promote", async ({page}) => {
    const employeesListPage = new EmployeesListPage(page);
    const editEmployeePage = new EditEmployeePage(page);

    await employeesListPage.goto();
    const employeeOld: EmployeeEntry = (await employeesListPage.getEmployeeEntries())[0];
    await employeesListPage.clickFirstEdit();

    await editEmployeePage.promoteToManager();

    await employeesListPage.goto();
    const employeeNew: EmployeeEntry = (await employeesListPage.getEmployeeEntries())[0];

    expect(employeeOld.manager).toBeFalsy();
    expect(employeeNew.manager).toBeTruthy();
})



