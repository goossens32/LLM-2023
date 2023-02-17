const employeeContainer = document.querySelector("#employee-table");
let employees = [];

async function getEmployees(){
    const response = await fetch('./data/employee.json')
    const data = await response.json();
    printEmployees(data)
}

function printEmployees(list) {
    employeeContainer.innerHTML = "";
    list.forEach(e => {
        employeeContainer.innerHTML += `
        <tr>
            <th scope="row">${e.id}</th>
            <td>${e.nameSurname}</td>
            <td>${e.phone}</td>
            <td>${e.esp}</td>
            <td>${e.department}</td>
        </tr>
        `
    });
}

function init() {
    getEmployees();
};
init();