import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


toast.configure()

export const Login = () => {
    const [ login, setLogin] = useState('');
    const [ password, setPassword ] = useState('');
    const [ userType, setUserType ] = useState('');
    const history = useHistory();

    
  const loginHandler = (e) => {

    e.preventDefault()

    let path = 'http://localhost:8008/' + userType + '/login';

    console.log(login, password, userType, path)

    axios.post(path, {
            login: login,
            password: password
    })
    .then((res) => {
        localStorage.setItem('user', JSON.stringify({
            "login": login,
            "userType": userType
        }));
        toast.success("Udało się zalogować");
        history.push("/home");
    })
      .catch(err =>  toast.error("Błąd"))
  }

  return (
            <div className="Login" >
                <h1 className="LoginHeader text-center">Logowanie</h1>
                    <Form>
                        <div className = "form-group">
                            <label> Login </label>
                            <input className="form-control"  id="login" name="login" type="text" onChange={e => setLogin(e.target.value)}/>
                        </div>
                        <div className = "form-group">
                            <label> Hasło </label>
                            <input  className="form-control"  id="password" name="password" type="password" onChange={e => setPassword(e.target.value)}/>
                        </div><br /> 
                                    
                        <div className="d-grid gap-2">
                            <Button size="lg" variant="dark" type="submit" onClick={(e) => loginHandler(e)}>Zaloguj się</Button> 
                        </div><br />
                        <Form.Select className="form-group" id="userType" name="userType" onChange={e => setUserType(e.target.value)}>
                            <option  value="">Wybierz użytkownika</option>
                            <option  value="client">Klient</option>
                            <option value="employee">Pracownik</option>
                        </Form.Select>      
                    </Form>
                    
                    </div>
        );
    }



export default Login;