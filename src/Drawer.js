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
        drawerOpen: false
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  componentDidMount() {
    this.setState({ drawerOpen: false })
  }

  toggle() {
      if(!this.state.drawerOpen) this.handleDrawerOpen()
      else this.handleDrawerClose()
  }

  handleDrawerOpen() {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose() {
    this.setState({ drawerOpen: false });
  };
  
  render() {
    if (this.state === null ) return ( <div></div> )
    return (
        <MuiThemeProvider>
            <div className="open-button">
                <img className="open-button" 
                    src={CollapsePanel} 
                    alt="collapsePanel" 
                    onClick={() => this.toggle()}
                />
            </div>
            <Drawer variant='temporary' open={this.state.drawerOpen}>
                <div className="close-button">
                    <img className="close-button" 
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