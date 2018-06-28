import React, { Component } from 'react';
import './App.css';
import data from './data.js';

class Drawer extends Component {
  constuctor() {
    this.state = {
      name: '',
      communities: [],
      sortName: null, // null, asc, desc
      sortCase: null,
    }
    this.compareNames = this.compareNames.bind(this)
    this.compareCases = this.compareCases.bind(this)
    this.sortNames = this.sortNames.bind(this)
    this.sortCases = this.sortCases.bind(this)
    this.handleNameClick = this.handleNameClick.bind(this)
    this.handleCaseClick = this.handleCaseClick.bind(this)
  }

  componentWillMount() {
      console.log('comp will mount')
    this.setState({
        name: data.name, 
        communities: data.communities,
        sortName: null, // null, 'asc', 'desc'
        sortCase: null,
    })
  }

  componentDidMount() {
      console.log('comp did mount')
    this.setState({
        name: data.name, 
        communities: data.communities
    })
  }
  
  compareNames(name) {
    //   console.log("compareNames", this.state.communities, "sortName", this.state.sortName)
    if(this.state.sortName === 'asc') {
        // console.log("compareNames asc")
        return (a,b) => {
            if(a[name] < b[name]) return 1
            if(a[name] > b[name]) return -1
            return 0
        }
    } else {
        // console.log("compareNames desc")
        return (a,b) => {
            if(a[name] < b[name]) return -1
            if(a[name] > b[name]) return 1
            return 0
        }
    }
  }

  compareCases(num) {
    //   console.log("compareCases", this.state.communities)
    if(this.state.sortCase === 'asc') {
        // console.log("compareCases asc")
        return function (a,b) { return b[num] - a[num] }
    } else {
        // console.log("compareCases desc")
        return function (a,b) { return a[num] - b[num] }
    }
  }

  sortNames(key) {
      let arrCopy = [...this.state.communities]
    //   console.log("sn b4", arrCopy)
      return arrCopy.sort(this.compareNames(key))
    //   console.log("sn aft", arrCopy)
    //   this.setState({communities: arrCopy})
  }

  sortCases(key) {
    let arrCopy = [...this.state.communities]
    // console.log("sc b4", arrCopy)
    return arrCopy.sort(this.compareCases(key))
    // console.log("sc aft", arrCopy)
    // this.setState({communities: arrCopy})
  }

  handleNameClick() {
    //   console.log("on name click", this.state.sortName)
      if (this.state.sortName === null || this.state.sortName === 'desc') {
        //   console.log("now sn is null or desc -->", this.state.sortName)
          this.setState({communities: this.sortNames('name'), sortName: 'asc', sortCase: null})
        //   console.log("now sn is asc -->", this.state.sortName)
        //   this.sortNames('name')
      } else if (this.state.sortName === 'asc') {
        // console.log("now sn is asc -->", this.state.sortName)
        this.setState({communities: this.sortNames('name'), sortName: 'desc', sortCase: null})
        // console.log("now sn is desc -->", this.state.sortName)
        //   this.sortNames('name')
      }
  }

  handleCaseClick() {
    // console.log("on case click", this.state.sortCase)
    if (this.state.sortCase === null || this.state.sortCase === 'desc') {
        // console.log("now sc is nul or desc -->", this.state.sortCase)
        this.setState({communities: this.sortCases('cases'), sortName: null, sortCase: 'asc'})
        // console.log("now sc is asc -->", this.state.sortCase)
        // this.sortCases('cases')
    } else if (this.state.sortCase === 'asc') {
    //   console.log("now sc is asc -->", this.state.sortCase)
      this.setState({communities: this.sortCases('cases'), sortName: null, sortCase: 'desc'})
    //   console.log("now sc is desc -->", this.state.sortCase)
        // this.sortCases('cases')
    }
  }
  
  render() {
    //   console.log("render", this.state)

    console.log("render", this.state.communities)
    console.log("render", this.state.sortName)
    console.log("render", this.state.sortCase)
    return (
        <table className="m-table">
        <thead>
            <tr>
                <th>List of Communities</th>
                <th>{this.state.communities.length}</th>
                <th>communities in {this.state.name}</th>
            </tr>
          <tr>
            <th onClick = {this.handleNameClick.bind(this)}>Name</th>
            <th onClick = {this.handleCaseClick.bind(this)}>Cases</th>
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