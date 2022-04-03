import React, { Component } from 'react';
import homepage from './../img/homepage.jpg'

class Home extends Component {
    render() {
        return (
            <div className='top'>
                <img src={homepage} width="100%" alt='wallpaper'/>;
            </div>
        );
    }
}

export default Home;