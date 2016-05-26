import React from 'react';
import DeviceType from './DeviceType.jsx';
import mui from 'material-ui';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';
import Actions from '../actions';

var {Card, List, ListItem, CircularProgress, Divider, ActionInfo} = mui;

@connectToStores
class DeviceTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navStatus: ChatStore.getState().leftNav
    }
  }

  componentDidMount() {
    this.selectedDevice = this.props.params.deviceType;
    ChatStore.getDeviceTypes(this.selectedDevice);
  }

  componentWillReceiveProps(nextProps) {
    if(this.selectedDevice != nextProps.params.deviceType) {
      this.selectedDevice = nextProps.params.deviceType;
      ChatStore.getDeviceTypes(this.selectedDevice);
    }
  }

  static getStores() {
    return [ChatStore];
  }

  static getPropsFromStores() {
    return ChatStore.getState();
  }

  toggleMenu(e) {
    var menu = document.getElementById('left-nav');

    if(menu != null) {
        Actions.navbarToggle();
        menu.className = ChatStore.getState().leftNav
    }
  }

  render() {
    if(!this.props) {
      return (
        <Card className="list-cards-col-1">
          <CircularProgress mode="indeterminate"
          className="circular-progress" />
        </Card>
      );
    }

    var dtNodes = _(this.props.deviceTypes)
      .keys()
      .map((k)=> {
        let deviceType = this.props.deviceTypes[k];
        return(
          <DeviceType deviceType = {deviceType} />
        );
      })
      .value();

    return (
      <Card className={this.state.navStatus} id="left-nav"
      onClick={this.toggleMenu}>
        <List>
          {dtNodes}
          <divider/>
          <ListItem primaryText="Feedback" className='feedback-btn'
            style={{'position': 'absolute', 'bottom': '0', 'borderTop' : '1px solid #bdbdbd', 'width': '100%'}} />
        </List>
      </Card>

    );
  }
}

export default DeviceTypeList;
