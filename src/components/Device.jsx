import React from 'react';
import Actions from '../actions';
import trim from 'trim';
import mui from 'material-ui';
import DeviceHistory from './DeviceHistory.jsx';

var { Card,
      CardActions,
      CardHeader,
      FlatButton,
      CardText,
      IconButton,
      TextField,
      DatePicker,
      RaisedButton,FontIcon,FlatButton,
      Avatar
    } = mui;

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Device extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expand: 'device-card form-closed',
      open: 'form form-closed',
      available: this.props.device.available,
      serial: this.props.device.key,
      name: '',
      date: new Date(),
      approver: '',
      notes: '',
    };
  }

  submitRental(e) {
    e.preventDefault();
    var rentalParam = {
      'serial': this.state.serial,
      'name': this.state.name,
      'date': (this.state.date).toUTCString(),
      'approver': this.state.approver,
      'notes': this.state.notes
    };
    console.log(rentalParam);
    Actions.submitRentalForm(rentalParam);
    this.setState({
      expand: 'device-card first-expansion',
      available: 'No',
      name: '',
      date: new Date(),
      approver: '',
      notes: ''
    });
  }

  submitReturn(e) {
    e.preventDefault();
    this.setState({
      expand: 'device-card first-expansion',
      available: 'Yes'
    });

    var rentalParam = {
      'serial': this.state.serial,
      'name': this.state.name,
      'notes': this.state.notes
    };
    Actions.submitReturnForm(rentalParam);
    this.setState({
      expand: 'device-card first-expansion',
      available: 'Yes',
      name: '',
      notes: ''
    });
  }

  onNameChange(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  onDateChange(evt) {
    console.log(evt);
    // this.setState({
    //    date: this.value;
    // });
  }

  onApproverChange(evt) {
    this.setState({
      approver: evt.target.value
    });
  }

  onNotesChange(evt) {
    this.setState({
      notes: evt.target.value
    });
  }

  handleOpen = () => {
    if(this.state.open != 'form second-expansion') {
      this.setState({open: 'form second-expansion'});
    }
    else {
      this.setState({open: 'form form-closed'});
    }
  }

  handleExpand = () => {
    if(this.state.expand == 'device-card form-closed') {
      this.setState({expand: 'device-card first-expansion'});
    }
    else {
      this.setState({
        expand: 'device-card form-closed',
        open: 'form form-closed'
    });

    }
  }

  render() {
    var title = this.props.device.name + " (" + this.props.device.serial + ")";
    var formName = 'form' + this.props.device.serial;
    var style = {'width': '100%'};
    var transitionStyle = {'transition': '1s'}
    var defaultDate = new Date();
    var availability = this.state.available == "Yes" ? "Available" : "In Use";
    var color = this.state.available == "Yes" ? "#212121" : "#bdbdbd";

    var deviceDetails = [];
    var exclusions = {'key': true,'history': true, 'available': true, 'avatar': true, 'name': true, 'serial': true};
    for(var key in this.props.device) {
      if(this.props.device.hasOwnProperty(key) && exclusions[key] != true) {
        deviceDetails.push(
        <li className='device-format'>{key}: {this.props.device[key]}</li>
        );
      }
    }

    var history = <DeviceHistory hist={this.props.device.history} />

    var actionBtn = this.state.available == "Yes" ?
      <RaisedButton
        label="Rent" primary={true}
        className="rent-button" onTouchTap={this.handleOpen}
      /> :
      <RaisedButton
        label="Return" primary={false}
        className="return-button" onTouchTap={this.handleOpen}
      />;
    var form = this.state.available == "Yes" ?
      <form className="text-fields" onSubmit={this.submitRental.bind(this)}>
        <div className="form-container">
          <div className="renter-field">
            <TextField
              floatingLabelText="Name" required="required" style={style}
              value={this.state.name} onChange={this.onNameChange.bind(this)}
            />
          </div>
          <div className="renter-field">
            <DatePicker textFieldStyle={style} style={style}
              floatingLabelText="Date" mode="portrait"
              autoOk={true} value={this.state.date}
              required="required" onChange={this.onDateChange.bind(this)}
              disabled={true}
            >
            </DatePicker>
          </div>
          <TextField
            floatingLabelText="Aprover" required="required"
            onChange={this.onApproverChange.bind(this)} style={style}
            />
          <TextField
            floatingLabelText="Notes" multiLine={true}
            rows={1} rowsMax={4} className="notes-field"
            onChange={this.onNotesChange.bind(this)} style={style}
          />
        </div>
        <RaisedButton label="Submit"
          primary={true} type="submit"
        />
      </form> :
      <form className="text-fields" onSubmit={this.submitReturn.bind(this)}>
        <TextField style={style}
          floatingLabelText="Name" required="required"
          value={this.state.name} onChange={this.onNameChange.bind(this)}
        />
        <TextField
          floatingLabelText="Notes" multiLine={true}
          rows={1} rowsMax={4} className="notes-field"
          onChange={this.onNotesChange.bind(this)} style={style}
        />
        <RaisedButton
          primary={false}
          label="Submit" type="submit"
        />
      </form>;

    return (
      <div>
        <Card>
          <CardHeader title={title}
            subtitle={availability} subtitleColor = {color}
             avatar={<Avatar src={this.props.device.avatar}/>}
            style={transitionStyle}>
            <IconButton
              onClick={this.handleExpand}
              className="icon-expansion"
              iconClassName="material-icons"
              style={{'padding': '0', 'width': '42px', 'height': '42px', 'position': 'absolute', 'right': '5px'}}>
              keyboard_arrow_down
            </IconButton>
          </CardHeader>
          <div className={this.state.expand}>
            <div className="secondary-details">
              <CardText  style={{'padding-top': '8', 'padding-bottom': '8'}}>
                <ul>
                  {deviceDetails}
                </ul>
              </CardText>

              <CardActions className="action-bar"  style={{'padding': '0'}}>
                {actionBtn}
              </CardActions>
            </div>
            <CardText style={{'padding-top': '0', 'padding-bottom': '0'}}>
              {history}
            </CardText>
          </div>
          <CardText className={this.state.open} style={{'padding': '0'}}>
            {form}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Device;
