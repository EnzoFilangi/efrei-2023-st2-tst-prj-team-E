import {expect, test} from "@playwright/test";
import axios from "axios";
import {EmployeesListPage} from "./pages/employees-list-page";
import {AddEmployeePage} from "./pages/add-employee-page";
import {generateValidEmployeeFormData} from "./helpers/generator";
import {EditEmployeePage} from "./pages/edit-employee-page";
import {EmployeeDetail} from "./interfaces/employeeDetail";

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

