import React, { Component } from 'react';
import './App.css';
import data from './data.js';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SortIcon from './Sort.svg'


class Table extends Component {
  constuctor() {
    // eslint-disable-next-line 
    this.state = {
      name: '',
      communities: [],
      sortName: null, // null, 'asc', 'desc'
      sortCase: null,
      drawerOpen: false
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
        drawerOpen: false
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
    let iconName = null;
    let iconCases = null;
    if(this.state.sortName === 'asc') iconName = <img className="sort-button-asc" src={SortIcon} alt="sort-icon"/>
    else if(this.state.sortName === 'desc') iconName = <img className="sort-button-desc" src={SortIcon} alt="sort-icon"/>
    else iconName = <div></div>
    if(this.state.sortCase === 'asc') iconCases = <img className="sort-button-asc" src={SortIcon} alt="sort-icon"/>
    else if(this.state.sortCase === 'desc') iconCases = <img className="sort-button-desc" src={SortIcon} alt="sort-icon"/>
    else iconCases = <div></div>

    return (
        <MuiTable className="m-table">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <h5>LIST OF COMMUNITIES</h5><br/>
                        <b><h1>{this.state.communities.length}</h1></b><br/>
                        <b>Communities</b> in <b>{this.state.name}</b>
                    </TableCell>
                </TableRow>
            <TableRow>
                <TableCell onClick = {() => this.handleNameClick()}>
                    NAME
                    {iconName}
                </TableCell>
                <TableCell onClick = {() => this.handleCaseClick()}>
                    NUMBER OF CASES
                    {iconCases}
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.state.communities.map(function(elem, index) {
                return (
                <TableRow key={index} data-item={elem}>
                    <TableCell data-title="Name">
                        <b>{elem.name}</b>
                    </TableCell>
                    <TableCell data-title="Cases">
                        {elem.cases}
                    </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </MuiTable>
    );
  }
}

export default Table;