import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Button, Card, Table } from 'react-bootstrap'
import '../styles/FormStyle.css';

class EmployeeView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.GetEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div><br /><br />
            <Card border="secondary" className='cards'>
                <Card.Header><h3>{ this.state.employee.firstName } { this.state.employee.lastName } </h3></Card.Header>
                <Card.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{ this.state.employee.email }</td>
                            </tr>
                            <tr>
                                <td>Login</td>
                                <td>{ this.state.employee.login }</td>
                            </tr>
                            <tr>
                                <td>Hasło</td>
                                <td>{ this.state.employee.password }</td>
                            </tr>
                            <tr>
                                <td>Numer telefonu</td>
                                <td>{ this.state.employee.phoneNumber }</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Powrót</Button>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default EmployeeView;