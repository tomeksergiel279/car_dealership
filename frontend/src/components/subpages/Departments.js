import React, { Component } from 'react';
import axios from 'axios';

export default class Departments extends Component {
  state = {
    departments: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8008/department`)
      .then(res => {
        const departments = res.data;
        this.setState({ departments });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.departments
            .map(department =>
                <li>{department.name}, {department.city}, {department.postalCode}</li>
              
            )
        }
      </ul>
    )
  }
}
