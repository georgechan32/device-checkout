import React from 'react';
import DeviceTypeList from './DeviceTypeList.jsx';
import DeviceList from './DeviceList.jsx';
import ChatStore from '../stores/ChatStore';

class Container extends React.Component {
  render() {
    return (
      <div>
        <div className="list-container">
          <DeviceTypeList {...this.props}/>
          <DeviceList />
        </div>
      </div>
    );
  }

  static willTransitionTo(transition) {
    var state = ChatStore.getState();
    if(!state.user) {
      transition.redirect('/login');
    }
  }
}

export default Container;
