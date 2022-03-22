import React, { Component } from 'react';
import axios from 'axios';

export default class Cars extends Component {
  state = {
    cars: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8008/car`)
      .then(res => {
        const cars = res.data;
        this.setState({ cars });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.cars
            .map(car =>
                <li>{car.serviceBooklet.serviceInspection}, {car.mark} </li>
             
              
            )
        }
      </ul>
    )
  }
}
