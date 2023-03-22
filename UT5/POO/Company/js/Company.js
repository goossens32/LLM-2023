import { Employee } from "./Employee.js";
export class Company {

    constructor (id, name, web, email, employees){
        this.id = id;
        this.name = name;
        this.web = web;
        this.email = email;
        this.employees = employees;
    }
    render(){
        let employeesHTML = "";
        this.employees.forEach(e => {
            employeesHTML += e.render();
        });

        return `
        <div>${this.id}</div>
        <div>${this.name}</div>
        <div>${this.web}</div>
        <div>${this.email}</div>
        <div>${employeesHTML}</div>
        `
    }
}