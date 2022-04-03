import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { AiOutlineMail, AiTwotonePhone } from "react-icons/ai";

export default function Contact() {
    return (
        <Container  className='container_contact'>
                    <br />
                    <h1 className='text-center display-5 mb-3'>
                        Kontakt
                    </h1><br /><br /><br />
            <Row className='sec_sp'>
                <Col lg='5' className="mb-5" >
                    <h3 className='text-center display-7 mb-3'> Informacje kontaktowe</h3><br /><br />
                    <address>
                        <strong><h5><AiOutlineMail />  carrentalkrakow@gmail.com</h5></strong><br />
                        <p>
                            <strong><h5><AiTwotonePhone />  +48 798 897 978</h5></strong>
                        </p>
                    </address>
                </Col>
                <Col lg="7" className="d-flex align-items-center">
                    <form className='contact_form w-100'>
                        <h3 className='text-center display-7 mb-3'> Zadaj nam pytanie</h3><br /><br />
                        <Row>
                           
                            <Col lg='6' className='form-group'>
                                <input className='form-control' id='name' name='name' type='text' placeholder='Imię' />
                            </Col>
                            <Col lg='6' className='form-group rounded-0'>
                                <input className='form-control' id='email' name='email' type='email' placeholder='Email' />
                            </Col>
                        </Row><br />
                            <textarea className='form-control rounded-0' id='message' name='message' rows='5' placeholder='Wiadomość'>
                            </textarea>
                        <Row>
                            <Col lg='12' className='form-group text-center'>
                                <br />
                                <Button size="lg" variant="dark" type="submit">Wyślij</Button>
                            </Col>
                        </Row>                
                    </form>
                </Col>
            </Row><br /><br />
            <h3 className='text-center display-6 mb-3'> Nasze lokalizacje</h3><br /><br />
        </Container>
    )
}