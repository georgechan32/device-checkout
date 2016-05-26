import Actions from '../actions';
import Firebase from 'firebase';

var firebaseRef = new Firebase('https://device-checkout.firebaseio.com/device-types');
let DeviceTypeSource = {
  getDeviceTypes: {
    remote(state, selectedDeviceKey) {
      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var devices = dataSnapshot.val();
          selectedDeviceKey = selectedDeviceKey || _.keys(devices)[0];
          //console.log(devices);
          var selectedDevice = devices[selectedDeviceKey];
          if(selectedDevice) {
            selectedDevice.selected = true;
          }
          resolve(devices);
        });
      });
    },
    success: Actions.deviceTypesReceived,
    error: Actions.deviceTypesFailed
  }
}

export default DeviceTypeSource;
