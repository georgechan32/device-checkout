import React from 'react';
import App from '../components/App.jsx';
import Container from '../components/Container.jsx';
import Login from '../components/Login.jsx';
import RentForm from '../components/RentForm.jsx';
import Router from 'react-router';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Container} />
    <Route path="devices" handler={Container} />
    <Route path="devices/:deviceType" handler={Container} />
    <Route path="login" handler={Login} />
  </Route>
);

Router.run(routes, Router.HasLocation, (Root)=> {
  React.render(<Root />, document.getElementById('container'));
});
