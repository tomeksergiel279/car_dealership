import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';
import { Card, Table, Col, Row } from 'react-bootstrap';
import '../Form.css';




class Departments extends Component {
    constructor(props) {
        super(props)

        this.state = {
                departments: []
        }
    }
    componentDidMount(){
        DepartmentService.getDepartments().then((res) => {
            this.setState({ departments: res.data});
        });
    }

    
      

    render() {
        return (
            <div><br />
                    {
                        this.state.departments.map(
                            department => 
                                <Card key = {department.id} border="secondary" className='cards'>
                                    <Card.Header><h3>{ department.name }</h3></Card.Header>
                                    <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Miasto</td>
                                                    <td>{department.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kod pocztowy</td>
                                                    <td>{department.postalCode}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                        )
                    }
            <h3 className='text-center display-5 mb-3'> Nasze lokalizacje</h3><br /><br />
            <Row style={{paddingBottom: "100px"}}>
                <Col>
                    <iframe
                        title='Krk'
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d133909.6892136224!2d19.96769464203156!3d50.06503673187523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1649053495480!5m2!1spl!2spl"
                        width="100%" 
                        height="300"  
                        a="" 
                        loading="lazy" 
                        reff="no-referrer-when-downgrade">
                    </iframe>
                </Col>
                <Col>
                    <iframe
                        title='Wwa'
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d156413.54181252018!2d21.03166058688595!3d52.225915621959615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1649055766444!5m2!1spl!2spl"
                        width="100%" 
                        height="300"  
                        a="" 
                        loading="lazy" 
                        reff="no-referrer-when-downgrade">
                    </iframe>
                </Col>
            </Row>
            </div>
        )
    }
}

export default Departments;