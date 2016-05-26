import alt from '../alt';
import Firebase from 'firebase';

class Actions {
  constructor() {
    this.generateActions(

      'deviceTypeOpened',
      'deviceTypesReceived',
      'devicesLoading',
      'devicesFailed',
      'devicesReceived',
      'deviceTypesFailed',
      'openDeviceTypeMenu',
      'submitRentalForm',
      'submitRentalFormSuccess',
      'submitRentalFormFail',
      'submitReturnForm',
      'submitReturnFormSuccess',
      'submitReturnFormFail',
      'navbarToggle'
    );
  }
  login(router) {
    return (dispatch) => {
      var firebaseRef = new Firebase('https://device-checkout.firebaseio.com/');
      firebaseRef.authWithOAuthPopup("google", (error, user)=> {
        if(error) {
          return;
        }
        dispatch(user);
        router.transitionTo('/devices/smartphones');
      });
    }
  }
}

export default alt.createActions(Actions);
