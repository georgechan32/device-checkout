import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';

var {
  Card, CardText, RaisedButton
} = mui;

class Login extends React.Component {
  onClick() {
    Actions.login(this.context.router);
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <Card className='login-box'>
        <CardText className='login-box'>
          Please login.
        </CardText>
        <RaisedButton
          className='login-button' onClick={this.onClick.bind(this)}
          label="Log in with Google"
          primary={true}
        />
      </Card>
    );
  }
}

module.exports = Login;
