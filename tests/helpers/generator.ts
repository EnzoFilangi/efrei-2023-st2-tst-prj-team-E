import {EmployeeFormData} from "../interfaces/employeeFormData";

export function generateValidEmployeeFormData(): EmployeeFormData{
    return {
        adress1: "25",
        adress2: "Avenue de la République",
        city: "Paris",
        email: "a@b.com",
        hiringDate: "2022-12-12",
        jobTitle: "Chief test officer",
        name: "ab",
        zip: "75000"
    }
}