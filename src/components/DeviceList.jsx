import React from 'react';
import Device from './Device.jsx';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';

var {Card, List, CircularProgress} = mui;

@connectToStores
class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceNodes: this.props.devices
    }
  }

  static getStores() {
    return [ChatStore];
  }

  static getPropsFromStores() {
    return ChatStore.getState();
  }

  render() {

    if(this.props.devices) {
      this.state.deviceNodes = _.values(this.props.devices).map((arg)=> {
        return(
          <Device device = {arg}/>
        );
      });
    }
    else {
      this.state.deviceNodes = <CircularProgress
        mode="indeterminate"
        className = "circular-progress" />;
    }

    return (
      <div className="selection-menu">
        <List style={{"padding-top": '0', "padding-bottom": '0'}}>
          {this.state.deviceNodes}
        </List>
      </div>
    );
  }
}

export default DeviceList;
