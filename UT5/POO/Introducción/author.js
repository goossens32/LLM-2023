export class Authors {
    constructor (first_name, last_name, birthYear){
        this.first_name = first_name
        this.last_name = last_name
        this.birthYear = birthYear
    }
    render(){
        return `<p>${this.first_name} ${this.last_name} (${this.birthYear})</p>`
    }
}