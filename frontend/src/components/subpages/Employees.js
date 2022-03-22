import React, { Component } from 'react';
import axios from 'axios';

export default class Employees extends Component {
  state = {
    employees: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8008/employee`)
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.employees
            .map(employee =>
                <li>{employee.login} </li>
             
              
            )
        }
      </ul>
    )
  }
}
