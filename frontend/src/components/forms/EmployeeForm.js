import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Button } from 'react-bootstrap';
import '../Form.css';

class EmployeeForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            phoneNumber: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
            login: this.state.login, password: this.state.password, phoneNumber: this.state.phoneNumber};
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            this.props.history.push('/employee');
        });
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changePhoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    cancel(){
        this.props.history.push('employees');
    }

    render() {
        return (
            <div>
                <div className='forms'>
                            <form>
                                <h2 className='text-center'>Dodaj Pracownika</h2>
                                <div className = "form-group">
                                            <label> Imię </label>
                                            <input name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Nazwisko </label>
                                            <input name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email </label>
                                            <input name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Login </label>
                                            <input name="login" className="form-control" 
                                                value={this.state.login} onChange={this.changeLoginHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Hasło </label>
                                            <input name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Numer telefonu </label>
                                            <input name="password" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                        </div><br />
                                        <Button size="md" variant="secondary" type="submit" onClick={this.saveEmployee}>Zapisz</Button>  
                                        <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Anuluj</Button>                          
                                </form>
                            </div>  
            </div>
        );
    }
}

export default EmployeeForm;