import React from 'react';
import Actions from '../actions';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ChatStore from '../stores/ChatStore';
import DeviceTypeList from './DeviceTypeList.jsx';

injectTapEventPlugin();

import {RouteHandler} from 'react-router';

var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var AppBar = mui.AppBar;
React.initializeTouchEvents(true)

class App extends React.Component {
  constructor(){
    super();

    ThemeManager.setPalette({
      primary1Color: Colors.blue500,
      primary2Color: Colors.blue700,
      primary3Color: Colors.blue100,
      accent1Color: Colors.blue500,
    });
    this.state = {open:false};
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  toggleMenu() {
    var menu = document.getElementById('left-nav');

    if(menu != null) {
        Actions.navbarToggle();
        menu.className = ChatStore.getState().leftNav
    }
  }

  render() {
    return (
      <div>
        <AppBar title="Device Checkout LA" showMenuIconButton={true} onLeftIconButtonTouchTap={this.toggleMenu}/>
        <RouteHandler />
      </div>
    );
  }
}

export default App;
