import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import '../Login.css';

class Login extends Component {
    render() {
        return (
            <>
                <div className="Login" >
                <h1 className="LoginHeader">Logowanie</h1>
                    <Form onSubmit={this.handleSubmit} >

                        <Form.Group controlId="login" size="lg">
                            <Form.Label> Login </Form.Label>
                            <Form.Control autoFocus name="login" />
                        </Form.Group>

                        <Form.Group controlId="password" size="lg" >
                            <Form.Label > Hasło </Form.Label>
                            <Form.Control type="password" name="password" />
                        </Form.Group>
                        <br />
                        <div className="d-grid gap-2">
                            <Button size="lg" variant="dark" type="submit">Zaloguj się</Button> 
                        </div>                
                    </Form>
                </div>
            </>
        );
    }

}

export default Login;