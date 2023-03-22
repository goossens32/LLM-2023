export class Employee{
    constructor (id, first_name, last_name, salary){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.salary = salary;
    }
    render(){
        return `
        <div>${this.first_name} ${this.last_name}, ${this.salary} €<div>
        `
    }
}