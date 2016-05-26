import alt from '../alt';
import Actions from '../actions';
import DeviceSource from '../sources/DeviceSource';
import DeviceTypeSource from '../sources/DeviceTypeSource';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import _ from 'lodash';

@datasource(DeviceSource, DeviceTypeSource)
@decorate(alt)
class ChatStore {
  constructor() {
    this.state = {
      user: null,
      devices: null,
      devicesLoading: true,
      formData: null,
      leftNav: 'left-nav closed'
    };
  }

  @bind(Actions.devicesLoading)
  devicesLoading(){
    this.setState({
      devicesLoading: true
    });
  }

  @bind(Actions.navbarToggle)
  navbarToggle() {
    if(this.state.leftNav == 'left-nav closed') {
      this.setState({
        leftNav: 'left-nav opened'
      });
    }
    else {
      this.setState({
        leftNav: 'left-nav closed'
      });
    }
  }

  @bind(Actions.submitRentalForm)
  submitRentalForm(data) {
    this.setState({
      devicesLoading: false,
      formData: data
    });
    return(this.getInstance().updateRentalForm(data));
  }

  @bind(Actions.submitReturnForm)
  submitReturnForm(data) {
    this.setState({
      devicesLoading: false,
      formData: data
    });
    return(this.getInstance().updateReturnForm(data));
  }

  @bind(Actions.submitRentalFormSuccess)
  rentalSuccess(devices) {
    console.log(devices);
    console.log(this);
  }

  @bind(Actions.devicesReceived)
  receivedDevices(devices) {
    this.setState({
      devicesLoading: true
    });
    _(devices)
      .keys()
      .each((k)=> {
        devices[k].key = k;
      })
      .value();

    this.setState({
      devices,
      devicesLoading: false
    });
  }

  @bind(Actions.login)
  login(user) {
    this.setState({user: user});
  }

  @bind(Actions.deviceTypesReceived)
  deviceTypesReceived(deviceTypes) {
    this.state.devicesLoading = false;
    let selectedDevice;
    _(deviceTypes)
      .keys()
      .each((key, index) => {
        deviceTypes[key].key = key;
        if(deviceTypes[key].selected) {
          selectedDevice = deviceTypes[key];
        }
      })
      .value();

    this.setState({
      devicesLoading: false,
      deviceTypes,
      selectedDevice,
      devices: null,
    });

    setTimeout(this.getInstance().getDevices, 1000);
  }

  @bind(Actions.deviceTypeOpened)
  deviceTypeOpened(selectedDevice) {
    _(this.state.deviceTypes)
      .values()
      .each((deviceType)=> {
        deviceType.selected = false;
      })
      .value();

    selectedDevice.selected = true;
    this.setState({
      devices: null,
      selectedDevice,
      deviceTypes: this.state.deviceTypes,
    });
    getDevices;
  }

}

export default alt.createStore(ChatStore);
