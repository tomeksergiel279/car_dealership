import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


toast.configure()

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            login: '',
            password: '',
            userType: ''

        }
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUserTypeHandler = this.changeUserTypeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.loginUser(this.state.login, this.state.password, this.state.userType);
    }

    loginUser(login, password, userType){

        let path = 'http://localhost:8008/' + this.state.userType + '/login';

        console.log(this.state.login, this.state.password, this.state.userType, path)

        fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'login': login,
                'password': password
            }
        }).then(function (response) {
            if (response.status === 200) { 
                toast.success('Udało się zalogować');     
            } else {
                toast.error('Niepoprawne dane');
            }
        }).catch(function (error) {
            toast.error('Błąd'); 
        });
    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changeUserTypeHandler = (event) => {
        this.setState({userType: event.target.value});
    }

    render() {
        return (
            <div className="Login" >
                <h1 className="LoginHeader text-center">Logowanie</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <div className = "form-group">
                            <label> Login </label>
                            <input name="login" className="form-control" 
                                value={this.state.login} onChange={this.changeLoginHandler}/>
                        </div>
                        <div className = "form-group">
                            <label> Hasło </label>
                            <input type="password" name="password" className="form-control" 
                                value={this.state.password} onChange={this.changePasswordHandler}/>
                        </div><br /> 
                                    
                        <div className="d-grid gap-2">
                            <Button size="lg" variant="dark" type="submit">Zaloguj się</Button> 
                        </div><br />
                        <Form.Select className="form-group" size="md" value={this.state.userType} onChange={this.changeUserTypeHandler}>
                        <option  value="">Wybierz użytkownika</option>
                            <option  value="client">Klient</option>
                            <option value="employee">Pracownik</option>
                        </Form.Select>      
                    </Form>
                    
                    </div>
        );
    }

}

export default Login;