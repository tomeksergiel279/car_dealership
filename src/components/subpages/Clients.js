import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

class Clients extends Component {
    constructor(props) {
        super(props)

        this.state = {
                clients: []
        }
        this.addClient = this.addClient.bind(this);
        this.editClient = this.editClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.viewClient = this.viewClient.bind(this);
    }

    deleteClient(id){
        ClientService.deleteClient(id).then( res => {
            this.setState({clients: this.state.clients.filter(client => client.id !== id)});
            console.log(res.status);
            if(res.status === 204) { toast.success('Klient usunięty') }
            else { toast.error("Nie udało się usunąć klienta") }
        });
    }

    editClient(id){
        this.props.history.push(`add-client/${id}`);
    }

    viewClient(id){
        this.props.history.push(`/view-client/${id}`);
    }

    componentDidMount(){
        ClientService.getClients().then((res) => {
            this.setState({ clients: res.data});
        });
    }

    addClient(){
        this.props.history.push('/add-client/_add');
    }

    render() {
        return (
            <div><br />
                <h2 className='text-center display-5 mb-3'>Lista Klientów</h2><br />     
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Imię </th>
                                <th> Nazwisko </th>
                                <th> Email </th>
                                <th> Login </th>
                                <th> Hasło </th>
                                <th> Kod pocztowy </th>
                                <th> Adres </th>
                                <th> Numer Telefonu </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(
                                    client => 
                                    <tr key = {client.id}>
                                         <td> {client.firstName} </td>   
                                         <td> {client.lastName} </td>
                                         <td> {client.email} </td>
                                         <td> {client.login} </td>   
                                         <td> {client.password} </td>
                                         <td> {client.postalCode} </td>
                                         <td> {client.address} </td>
                                         <td> {client.phoneNumber} </td>
                                         <td>
                                            <Button onClick = { () => this.editClient(client.id)} 
                                                size="sm" 
                                                variant="secondary" 
                                                type="submit">
                                                Modyfikuj
                                            </Button> 
                                            <Button style={{marginLeft: "10px"}} 
                                                onClick = { () => this.deleteClient(client.id)}  
                                                size="sm" 
                                                variant="danger" 
                                                type="submit">
                                                Usuń
                                            </Button> 
                                            <Button style={{marginLeft: "10px"}} 
                                                onClick = { () => this.viewClient(client.id)} 
                                                size="sm" 
                                                variant="primary" 
                                                type="submit">
                                                Zobacz
                                            </Button> 
                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <Button onClick={this.addClient} 
                    size="lg" 
                    variant="dark"
                    type="submit">
                    Dodaj Klienta
                </Button>                        
            </div>
        )
    }
}

export default Clients;