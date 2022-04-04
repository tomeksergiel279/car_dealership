import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import { Button } from 'react-bootstrap';
import '../Form.css';

class ClientForm extends Component {

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
        this.changePostalCodeHandler = this.changePostalCodeHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.saveOrUpdateClient = this.saveOrUpdateClient.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            ClientService.GetClientById(this.state.id).then( (res) =>{
                let client = res.data;
                this.setState({
                    firstName: client.firstName,
                    lastName: client.lastName,
                    email: client.email,
                    login: client.login,
                    password: client.password,
                    postalCode: client.postalCode,
                    address: client.address,
                    phoneNumber: client.phoneNumber
                    
                });
            });
        }        
    }

    saveOrUpdateClient = (e) => {
        e.preventDefault();
        let client = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
            login: this.state.login, password: this.state.password, postalCode: this.state.postalCode, address: this.state.address, phoneNumber: this.state.phoneNumber};
        console.log('client => ' + JSON.stringify(client));

        if(this.state.id === '_add'){
            ClientService.createClient(client).then(res =>{
                this.props.history.push('/clients');
            });
        }else{
            ClientService.updateClient(client, this.state.id).then( res => {
                this.props.history.push('/clients');
            });
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

    changePostalCodeHandler = (event) => {
        this.setState({postalCode: event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address: event.target.value});
    }

    changePhoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    cancel(){
        this.props.history.push('/clients');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className='text-center display-5 mb-3'>Dodaj Klienta</h2>
        }else{
            return <h2 className='text-center display-5 mb-3'>Zmodyfikuj Klienta</h2>
        }
    }

    render() {
        return (
            <div>
                <div className='forms'>
                            <form>
                                {this.getTitle()}
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
                                            <label> Kod pocztowy </label>
                                            <input name="postalCode" className="form-control" 
                                                value={this.state.postalCode} onChange={this.changePostalCodeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Adres </label>
                                            <input name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Numer telefonu </label>
                                            <input name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                        </div><br />
                                        <Button size="md" variant="secondary" type="submit" onClick={this.saveOrUpdateClient}>Zapisz</Button>  
                                        <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Anuluj</Button>                          
                                </form>
                            </div>  
            </div>
        );
    }
}

export default ClientForm;