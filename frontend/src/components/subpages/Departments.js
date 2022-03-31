import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';
import { Card, Table } from 'react-bootstrap';
import '../Form.css';

class Departments extends Component {
    constructor(props) {
        super(props)

        this.state = {
                departments: []
        }
    }
    componentDidMount(){
        DepartmentService.getDepartments().then((res) => {
            this.setState({ departments: res.data});
        });
    }

    render() {
        return (
            <div><br />
                    {
                        this.state.departments.map(
                            department => 
                                <Card key = {department.id} border="secondary" className='cards'>
                                    <Card.Header><h3>{ department.name }</h3></Card.Header>
                                    <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Miasto</td>
                                                    <td>{department.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kod pocztowy</td>
                                                    <td>{department.postalCode}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                                
                        )
                    }
            </div>
        )
    }
}

export default Departments;