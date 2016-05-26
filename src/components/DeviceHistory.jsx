import React from 'react';
import mui from 'material-ui';

var {FlatButton} = mui;

class DeviceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: "history-list form-closed",
      histName: 'Show history'
    }
  }

  handleClick = () => {
    console.log(this.state);
    if(this.state.histName == 'Show history') {
      this.setState({
        history: "history-list second-expansion",
        histName: 'Hide history'
      });
    }
    else {
      this.setState({
        history: "history-list form-closed",
        histName: 'Show history'
      });
    }
  }

  render() {
    // console.log(this.props)
    var history = [];
    if(this.props.hist) {
      history.push(<div className='history-title'>
        <div className='hist-item left'>State</div>
        <div className='hist-item center'>Name</div>
        <div className='hist-item right'>Date</div>
      </div>);
      for(var key in this.props.hist) {
        var tempHist = this.props.hist[key].type == 'rent' ? 'Rented' : 'Returned';
        var temp = ' by ' + this.props.hist[key].name + ' on ' + (this.props.hist[key].date).substring(5, 16);
        history.push(<div className='history-box'>
          <div className='hist-item left'>{tempHist}</div>
          <div className='hist-item center'>{this.props.hist[key].name}</div>
          <div className='hist-item right'>{(this.props.hist[key].date).substring(5, 16)}</div>
        </div>);
      }
    }
    else {
      history.push("No history to show!");
    }

    return (
      <div className="history-container">
        <FlatButton onTouchTap={this.handleClick} label={this.state.histName} secondary={true} labelStyle={{'marginLeft': '-6px', 'padding': '0', 'text-transform': 'capitalize'}}/>
        <div className={this.state.history}>{history}</div>
      </div>
    );
  }
}

export default DeviceHistory;
