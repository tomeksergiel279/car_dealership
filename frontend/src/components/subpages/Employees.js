import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';

class Employees extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Lista Pracowników</h2>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Imię </th>
                                <th> Nazwisko </th>
                                <th> Email </th>
                                <th> Login </th>
                                <th> Hasło </th>
                                <th> Numer telefonu </th>
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
                                            <Button size="sm" variant="secondary" type="submit">Modyfikuj</Button> 
                                            <Button style={{marginLeft: "10px"}} size="sm" variant="danger" type="submit">Usuń</Button> 
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