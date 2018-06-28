import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer'
import CollapsePanel from './CollapsePanel.svg'
import Table from './Table.js'

class SideDrawer extends Component {
  constuctor() {
    // eslint-disable-next-line
    this.state = {
        drawerOpen: true
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  componentDidMount() {
    this.setState({ drawerOpen: true })
  }

  toggle() {
      if(!this.state.drawerOpen) this.handleDrawerOpen()
      else this.handleDrawerClose()
  }

  handleDrawerOpen = () => {
      console.log("open!")
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
      console.log("closing!")
    this.setState({ drawerOpen: false });
  };
  
  render() {
      console.log("render", this.state)
    if (this.state === null ) return ( <div></div> )
    return (
        <MuiThemeProvider>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <img style={{height: '25px', width: '25px', transform: 'rotate(180deg)'}} 
                    src={CollapsePanel} 
                    alt="collapsePanel" 
                    onClick={() => this.toggle()}
                    />
            </div>
            <Drawer variant='temporary' open={this.state.drawerOpen}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <img style={{height: '25px', width: '25px'}} 
                    src={CollapsePanel} 
                    alt="collapsePanel" 
                    onClick={() => this.toggle()}
                    />
                </div>
                <Table />
            </Drawer>
        </MuiThemeProvider>
    );
  }
}

export default SideDrawer;