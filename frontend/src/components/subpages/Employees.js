import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Button } from 'react-bootstrap';

class Employees extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    editEmployee(id){
        this.props.history.push(`add-employee/${id}`);
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployee().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }



    render() {
        return (
            <div><br />
                <h2 className='text-center display-5 mb-3'>Lista Pracowników</h2><br />     
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Imię </th>
                                <th> Nazwisko </th>
                                <th> Email </th>
                                <th> Login </th>
                                <th> Hasło </th>
                                <th> Numer Telefonu </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.employees.map(
                                    employee => 
                                    <tr key = {employee.id}>
                                         <td> {employee.firstName} </td>   
                                         <td> {employee.lastName} </td>
                                         <td> {employee.email} </td>
                                         <td> {employee.login} </td>   
                                         <td> {employee.password} </td>
                                         <td> {employee.phoneNumber} </td>
                                         <td>
                                            <Button onClick = { () => this.editEmployee(employee.id)} size="sm" variant="secondary" type="submit">Modyfikuj</Button> 
                                            <Button style={{marginLeft: "10px"}} onClick = { () => this.deleteEmployee(employee.id)}  size="sm" variant="danger" type="submit">Usuń</Button> 
                                            <Button style={{marginLeft: "10px"}} onClick = { () => this.viewEmployee(employee.id)} size="sm" variant="primary" type="submit">Zobacz</Button>
                                         </td>
                                    </tr>
                                )
                        }                  
                        </tbody>
                    </table>
                </div>
                <Button onClick={this.addEmployee} size="lg" variant="dark" type="submit">Dodaj Pracownika</Button>         
            </div>
        )
    }
}

export default Employees;