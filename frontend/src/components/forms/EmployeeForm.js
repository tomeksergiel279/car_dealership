import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Button } from 'react-bootstrap';
import '../styles/FormStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure();

class EmployeeForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            postalCode: '',
            address: '',
            phoneNumber: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }
        else{
            EmployeeService.GetEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    login: employee.login,
                    password: employee.password,
                    phoneNumber: employee.phoneNumber
                    
                });
            });
        }        
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {login: this.state.login, password: this.state.password, email: this.state.email,
            firstName: this.state.firstName, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber};
        console.log('employee => ' + JSON.stringify(employee));

        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee)
            .then(res =>{
                if(res.status === 200) 
                { 
                    toast.success('Pracownik dodany')
                }
                else { 
                    toast.error("Pracownik nie dodany") 
                }
                this.props.history.push('/employees');
            })
            .catch(err => toast.error("Niepoprawne dane"));
        }
        else{
            EmployeeService.UpdateEmployee(employee, this.state.id)
            .then( res => {
                if(res.status === 200) { 
                    toast.success('Pracownik zmodyfikowany')
                }
                this.props.history.push('/employees');
            })
            .catch(err => toast.error("Niepoprawne dane"));
        }
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
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className='text-center display-5 mb-3'>Dodaj Pracownika</h2>
        }
        else{
            return <h2 className='text-center display-5 mb-3'>Zmodyfikuj Pracownika</h2>
        }
    }

    render() {
        return (
            <div className='forms'>
                <form>
                    {this.getTitle()}
                    <div className = "form-group">
                        <label> Imię </label>
                        <input name="firstName" 
                            className="form-control" 
                            value={this.state.firstName} 
                            onChange={this.changeFirstNameHandler}
                        />
                    </div>
                    <div className = "form-group">
                        <label> Nazwisko </label>
                        <input name="lastName" 
                            className="form-control" 
                            value={this.state.lastName} 
                            onChange={this.changeLastNameHandler}
                        />
                    </div>
                    <div className = "form-group">
                        <label> Email </label>
                        <input name="email" 
                            className="form-control" 
                            value={this.state.email} 
                            onChange={this.changeEmailHandler}
                        />
                    </div>
                    <div className = "form-group">
                        <label> Login </label>
                        <input name="login" 
                            className="form-control" 
                            value={this.state.login} 
                            onChange={this.changeLoginHandler}
                        />
                    </div>
                    <div className = "form-group">
                        <label> Hasło </label>
                        <input name="password" 
                            className="form-control" 
                            value={this.state.password} 
                            onChange={this.changePasswordHandler}
                        />
                    </div>
                    <div className = "form-group">
                        <label> Numer telefonu </label>
                        <input name="phoneNumber" 
                            className="form-control" 
                            value={this.state.phoneNumber} 
                            onChange={this.changePhoneNumberHandler} 
                        />
                    </div><br />
                    <Button size="md" 
                        variant="secondary" 
                        type="submit" 
                        onClick={this.saveOrUpdateEmployee}>
                        Zapisz
                    </Button>  
                    <Button style={{marginLeft: "10px"}} 
                        size="md" 
                        variant="danger" 
                        type="submit" 
                        onClick={this.cancel.bind(this)}>
                        Anuluj
                    </Button>                          
                </form>
            </div>  
        );
    }
}

export default EmployeeForm;