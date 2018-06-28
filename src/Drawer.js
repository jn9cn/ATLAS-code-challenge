import React, { Component } from 'react';
import './App.css';
import data from './data.js';

class Drawer extends Component {
  constuctor() {
    // eslint-disable-next-line 
    this.state = {
      name: '',
      communities: [],
      sortName: null, // null, 'asc', 'desc'
      sortCase: null,
    }
    this.compareNames = this.compareNames.bind(this)
    this.compareCases = this.compareCases.bind(this)
    this.sortNames = this.sortNames.bind(this)
    this.sortCases = this.sortCases.bind(this)
  }

  componentWillMount() {
    this.setState({
        name: data.name, 
        communities: data.communities,
        sortName: null, // null, 'asc', 'desc'
        sortCase: null,
    })
  }

  componentDidMount() {
    this.setState({
        name: data.name, 
        communities: data.communities
    })
  }
  
  compareNames(name) {
    if(this.state.sortName === 'asc') {
        return (a,b) => {
            if(a[name] < b[name]) return 1
            if(a[name] > b[name]) return -1
            return 0
        }
    } else {
        return (a,b) => {
            if(a[name] < b[name]) return -1
            if(a[name] > b[name]) return 1
            return 0
        }
    }
  }

  compareCases(num) {
    if(this.state.sortCase === 'asc') {
        return (a,b) => b[num] - a[num] 
    } else {
        return (a,b) => a[num] - b[num]
    }
  }

  sortNames(key) {
    let arrCopy = [...this.state.communities]
    return arrCopy.sort(this.compareNames(key))
  }

  sortCases(key) {
    let arrCopy = [...this.state.communities]
    return arrCopy.sort(this.compareCases(key))
  }

  handleNameClick() {
    if(this.state.sortName === null || this.state.sortName === 'desc') {
        this.setState({communities: this.sortNames('name'), sortName: 'asc', sortCase: null})
    } else if(this.state.sortName === 'asc') {
        this.setState({communities: this.sortNames('name'), sortName: 'desc', sortCase: null})
    }
  }

  handleCaseClick() {
    if(this.state.sortCase === null || this.state.sortCase === 'desc') {
        this.setState({communities: this.sortCases('cases'), sortName: null, sortCase: 'asc'})
    } else if(this.state.sortCase === 'asc') {
        this.setState({communities: this.sortCases('cases'), sortName: null, sortCase: 'desc'})
    }
  }
  
  render() {
    return (
        <table className="m-table">
        <thead>
            <tr>
                <th>List of Communities</th>
                <th>{this.state.communities.length}</th>
                <th>communities in {this.state.name}</th>
            </tr>
          <tr>
            <th onClick = {() => this.handleNameClick()}>Name</th>
            <th onClick = {() => this.handleCaseClick()}>Cases</th>
          </tr>
        </thead>
        <tbody>
          {this.state.communities.map(function(elem, index) {
            return (
              <tr key={index} data-item={elem}>
                <td data-title="Name">{elem.name}</td>
                <td data-title="Cases">{elem.cases}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Drawer;