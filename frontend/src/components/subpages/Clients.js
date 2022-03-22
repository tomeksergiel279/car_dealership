import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ClientService from '../services/ClientService';


export default class Clients extends Component {

  constructor(props) {
    super(props)

      this.state = {
        clients: []
      }
  }

  componentDidMount(){
    ClientService.getClients().then((res) => {
        this.setState({ clients: res.data});
    });
}

  render() {
    return (
      <div><br />
           <h2 className="text-center">Lista Klientów</h2>
           <br></br>
           <div className = "row">
                  <table className = "table table-striped table-bordered">
                      <thead>
                          <tr>
                              <th>Imię</th>
                              <th>Nazwisko</th>
                              <th>Email</th>
                              <th>Adres</th>
                              <th>Numer Telefonu</th>
                              <th>Kod Pocztowy</th>
                              <th>Login</th>
                              <th>Hasło</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.clients.map(
                                  client => 
                                  <tr key = {client.id}>
                                       <td> {client.firstName} </td>   
                                       <td> {client.lastName}</td>
                                       <td> {client.email}</td>
                                       <td> {client.address}</td>
                                       <td> {client.phoneNumber}</td>
                                       <td> {client.postalCode}</td>
                                       <td> {client.login}</td>
                                       <td> {client.password}</td>
                                       <td>
                                          <Button size="sm" variant="secondary" type="submit">Modyfikuj</Button> 
                                          <Button style={{marginLeft: "10px"}} size="sm" variant="danger" type="submit">Usuń</Button> 
                                        </td>
                                  </tr>
                              )
                          }
                      </tbody>
                  </table>
                  <br></br>
           </div>
           <Button onClick={this.addEmployee} size="lg" variant="dark" type="submit">Dodaj Klienta</Button> 

      </div>
  )
  }
}
