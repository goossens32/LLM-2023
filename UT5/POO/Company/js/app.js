import { Company } from "./Company.js";
import { Employee } from "./Employee.js";
const companyContainer = document.querySelector('#company-container');

function init() {
   getCompanies(); 
}
init();

function getCompanies() {
    fetch("./data/companies.json")
    .then (result => result.json())
    .then (data => {
        data.forEach(item => {
            // Los nuevos objetos de Company se consiguen desde el JSON

            // Se hace otro foreach pero cogiendo los datos de Employees
            const employeeList = [];
            item.employees.forEach(employee => {
                const empObj = new Employee (employee.id, employee.first_name, employee.last_name, employee.salary);
                employeeList.push(empObj);
            });
            const company = new Company(item.id, item.name, item.web, item.email, employeeList);
            companyContainer.innerHTML += company.render();
        });
    })
}
