export class Authors {
    constructor (first_name, last_name){
        this.first_name = first_name
        this.last_name = last_name
    }
    render(){
        return `${this.first_name} ${this.last_name}`
    }
}