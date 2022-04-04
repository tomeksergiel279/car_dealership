import React, { Component } from 'react';
import homepage from './../img/homepage.jpg'
import Homecarousel from './HomeCarousel';
import { ModalFooter } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <div className='top'>
                <img src={homepage} width="100%" alt='wallpaper'/>
                <Homecarousel />
                <ModalFooter />
            </div>
        );
    }
}

export default Home;