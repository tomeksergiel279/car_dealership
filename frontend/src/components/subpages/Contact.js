import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { AiOutlineMail, AiTwotonePhone } from "react-icons/ai";
import emailjs from "emailjs-com";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


toast.configure()

class Contact extends Component {

    sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_gmail', 'contact', e.target, 'DtN43ylzFlL8ZsKlo')
            .then((result) => {
                console.log(result.text);
                if(result.status === 200){
                    toast.success('Wiadomość wysłana.')
                }
                else{
                    toast.danger('Wiadomość nie wysłana.')
                }
            }, (error) => {
                console.log(error.text);
                toast.danger('Wiadomość nie wysłana.')
            });
            e.target.reset()
    }

    render() {
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
                                <strong><h5><AiTwotonePhone />  +48 798 897 978</h5></strong>
                        </address>
                    </Col>
                    <Col lg="7" className="d-flex align-items-center">
                        <form onSubmit={this.sendEmail} className='contact_form w-100'>
                            <h3 className='text-center display-7 mb-3'> Zadaj nam pytanie</h3><br /><br />
                            <Row>
                               
                                <Col lg='6' className='form-group'>
                                    <input className='form-control' id='name' name='name' type='text' placeholder='Imię' required />
                                </Col>
                                <Col lg='6' className='form-group rounded-0'>
                                    <input className='form-control' id='email' name='email' type='email' placeholder='Email' required />
                                </Col>
                            </Row><br />
                                <textarea className='form-control rounded-0' id='message' name='message' rows='5' placeholder='Wiadomość' required>
                                </textarea>
                            <Row>
                                <Col lg='12' className='form-group text-center'>
                                    <br />
                                    <Button  size="lg" variant="dark" type="submit">Wyślij</Button>
                                </Col>
                            </Row>                
                        </form>
                    </Col>
                </Row><br /><br />
            </Container>
        );
    }
}
export default Contact;