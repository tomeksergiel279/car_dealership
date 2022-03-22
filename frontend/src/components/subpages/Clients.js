import React, { Component } from 'react';
import axios from 'axios';

export default class Clients extends Component {
  state = {
    clients: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8008/client`)
      .then(res => {
        const clients = res.data;
        this.setState({ clients });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.clients
            .map(client =>
                <li>{client.id}, {client.login}, {client.password}, {client.email}, {client.postalCode}  </li>
              
            )
        }
      </ul>
    )
  }
}
