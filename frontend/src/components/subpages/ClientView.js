import React, { Component } from 'react'
import ClientService from '../services/ClientService'
import { Button } from 'react-bootstrap'

class ClientView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            client: {}
        }
    }

    componentDidMount(){
        ClientService.GetClientById(this.state.id).then( res => {
            this.setState({client: res.data});
        })
    }

    cancel(){
        this.props.history.push('/clients');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Employee First Name: </label>
                            <div> { this.state.client.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Last Name: </label>
                            <div> { this.state.client.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { this.state.client.email }</div>
                        </div>
                    </div>
                    <Button size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Powrót</Button>
                </div>
            </div>
        )
    }
}

export default ClientView