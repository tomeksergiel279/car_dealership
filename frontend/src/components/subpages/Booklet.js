import React, { Component } from 'react'
import BookletService from '../services/BookletService';
import { Button, Card, Table } from 'react-bootstrap'
import '../Form.css';

class Booklet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            booklet: {}
        }
    }

    componentDidMount(){
        BookletService.getBookletById(this.state.id).then( res => {
            this.setState({booklet: res.data});
        })
    }

    cancel(){
        this.props.history.push('/cars');
    }

    render() {
        return (
            <div><br /><br />
            <Card border="secondary" className='cards'>
                <Card.Header><h3>Książka serwisowa</h3></Card.Header>
                <Card.Body>
                    <Table>
                    <tbody>
                            <tr>
                                <td>Data przeglądu</td>
                                <td>{ this.state.booklet.serviceInspection }</td>
                            </tr>
                            <tr>
                                <td>Ostatnia naprawa</td>
                                <td>{ this.state.booklet.lastRepair }</td>
                            </tr>
                    
                        </tbody> 
                    </Table>
                    <Button size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Powrót</Button>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Booklet