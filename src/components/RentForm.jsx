// import React from 'react';
// import mui from 'material-ui';
// import Actions from '../actions';
// import trim from 'trim';
//
// var {TextField, DatePicker, RaisedButton} = mui;
// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();
//
// class RentForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       serial: this.props.rentForm,
//       name: '',
//       date: new Date(),
//       approver: '',
//       notes: '',
//     }
//   }
//
//   submitRental(e) {
//     e.preventDefault();
//     //Actions.submitRentalForm(this.state);
//     //console.log(this.props);
//     window.location.href = e.target.href;
//   }
//
//   debugFunc = () => {
//     var obj = {};
//     var mapForm = ['name', 'date', 'approver', 'notes'];
//     var formData = document.getElementById(this.props.rentForm);
//     for(var i = 0; i < formData.length && i < mapForm.length; i++) {
//       obj[mapForm[i]] = formData.elements[i].value;
//     }
//     obj['serial'] = this.props.rentForm;
//     console.log(obj);
//   }
//
//   onNameChange(evt) {
//     this.setState({
//       name: evt.target.value
//     });
//   }
//
//   onDateChange(evt) {
//     console.log(this)
//     this.setState({
//       date: evt.target.value
//     });
//   }
//
//   onApproverChange(evt) {
//     this.setState({
//       approver: evt.target.value
//     });
//   }
//
//   onNotesChange(evt) {
//     this.setState({
//       notes: evt.target.value
//     });
//   }
//
//   render() {
//
//     var style = {'width': '100%'};
//     var defaultDate = new Date();
//     return (
//       <form className="text-fields" onSubmit={this.submitRental.bind(this)} id={this.props.rentForm}>
//         <div className="renter-field">
//           <TextField
//             floatingLabelText="Name"
//             required="required"
//             value={this.state.rentInfo.name}
//             onChange={this.onNameChange.bind(this)}
//           />
//           <DatePicker
//             floatingLabelText="Date"
//             mode="landscape"
//             autoOk={true}
//             defaultDate={defaultDate}
//             required="required"
//             onChange={this.onDateChange.bind(this)}
//           />
//         </div>
//         <TextField
//           //defaultValue="Default Value"
//           floatingLabelText="Aprover"
//           required="required"
//           onChange={this.onApproverChange.bind(this)}
//           style = {style}
//           />
//
//         <TextField
//           floatingLabelText="Notes"
//           multiLine={true}
//           rows={1}
//           rowsMax={4}
//           className="notes-field"
//           onChange={this.onNotesChange.bind(this)}
//           style = {style}
//         />
//
//         <RaisedButton
//           label="Rent"
//           primary={true}
//           type="submit"
//         />
//       </form>
//     );
//   }
// }
//
// export default RentForm;
