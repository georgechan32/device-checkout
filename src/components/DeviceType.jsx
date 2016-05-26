import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';

var {ListItem, Avatar} = mui;

class DeviceType extends React.Component {
  constructor(props){
    super(props);
  }

  onClick() {
    Actions.deviceTypeOpened(this.props.deviceType);
  }

  render() {
    if(this.props.deviceType.selected) {
      return (
        <ListItem
          href={'/#/devices/' + this.props.deviceType.key}  style={{'text-transform': 'capitalize'}}
          >
          {this.props.deviceType.name}
        </ListItem>
      );
    }

    return (
      <ListItem
        href={'/#/devices/' + this.props.deviceType.key}
        key={this.props.deviceType.key} style={{'text-transform': 'capitalize'}}
        >
        {this.props.deviceType.name}
      </ListItem>
    );
  }
}

export default DeviceType;
