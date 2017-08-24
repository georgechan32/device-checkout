import Actions from '../actions';
import Firebase from 'firebase';
import Router from 'react-router';

var firebaseRef = null;

let DeviceSource = {

  getDevices: {
    remote(state) {
      if(firebaseRef) {
        firebaseRef.off();
      }
      firebaseRef =
        new Firebase('https://device-checkout.firebaseio.com/devices/' + state.selectedDevice.key);

      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var devices = dataSnapshot.val();
          resolve(devices);
        })
      });
    },
    success: Actions.devicesReceived,
    error: Actions.devicesFailed,
    loading: Actions.devicesLoading
  },
  updateRentalForm: {
    remote(state){
      return new Promise((resolve, reject)=> {
        if(!firebaseRef){
          return resolve();
        }
        var onComplete = function(error) {
          if (error) {
            console.log('Rent failed');
          } else {
            console.log('Rent succeeded');
          }
        };

        var updateRef = new Firebase('https://device-checkout.firebaseio.com/devices/' + state.selectedDevice.key + '/' + state.formData.serial);
        updateRef.update({available: 'No'});
        updateRef.off();
        updateRef = new Firebase('https://device-checkout.firebaseio.com/devices/' + state.selectedDevice.key + '/' + state.formData.serial + '/history');
        updateRef.push({
          'name': state.formData.name,
          'date': state.formData.date,
          'approver': state.formData.approver,
          'notes': state.formData.notes,
          'type': 'rent'
        }, onComplete);
        resolve();
      });
    },
    success: Actions.submitRentalFormSuccess,
    error: Actions.submitRentalFormSuccess
  },
  updateReturnForm: {
    remote(state){
      return new Promise((resolve, reject)=> {
        if(!firebaseRef){
          return resolve();
        }
        var onComplete = function(error) {
          if (error) {
            console.log('Return failed');
          } else {
            console.log('Return succeeded');
          }
        };
        var updateRef = new Firebase('https://device-checkout.firebaseio.com/devices/' + state.selectedDevice.key + '/' + state.formData.serial);
        updateRef.update({available: 'Yes'});
        updateRef.off();
        updateRef = new Firebase('https://device-checkout.firebaseio.com/devices/' + state.selectedDevice.key + '/' + state.formData.serial + '/history');
        updateRef.push({
          'name': state.formData.name,
          'date': new Date().toUTCString(),
          'notes': state.formData.notes,
          'type': 'return'
        }, onComplete);
        resolve();
      });
    },
    success: Actions.submitReturnFormSuccess,
    error: Actions.submitReturnFormSuccess
  }
}

export default DeviceSource;
