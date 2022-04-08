import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import tlo from './../img/tlo.jpeg'
import { AiOutlineCar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoIosPerson } from "react-icons/io";
import { RiCommunityLine } from "react-icons/ri";

class Homecarousel extends Component {
    render() {
        return (
            <div>
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={tlo}
                            alt="First slide"
                            height="300px"
                        />
                        <Carousel.Caption>
                        <h1><Link to="/cars"><AiOutlineCar /></Link></h1>
                        <h3 className="display-4">Zobacz ofertę naszych samochodów</h3>
                        <br />
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={tlo}
                            alt="First slide"
                            height="300px"
                        />
                        <Carousel.Caption>
                        <h1><Link to="/employees"><IoIosPerson /></Link></h1>
                        <h3 className="display-4">Przeglądaj naszych pracowników</h3>
                        <br />
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={tlo}
                            alt="First slide"
                            height="300px"
                        />
                        <Carousel.Caption>
                        <h1><Link to="/departments"><RiCommunityLine /></Link></h1>
                        <h3 className="display-4"> Przeglądaj nasze oddziały</h3>
                        <br />
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}
export default Homecarousel;