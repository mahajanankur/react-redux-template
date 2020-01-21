import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router'
import Dashboard from '../../pages/dashboard/Dashboard';
import Details from '../../pages/campaigns/details/Details';
import CampaignList from '../../pages/campaigns/list/CampaignList';
import DonationList from '../../pages/donations/list/DonationList';
import Login from '../../pages/auth/Login';
import EnrollmentList from '../../pages/campaigns/enrollments/list/EnrollmentList';

import AuthRoute from '../../components/routes/AuthRoute';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest} render={props => (
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
    )}
  />
);

// export default function App() {
// function App() {
class App extends React.PureComponent {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/campaign/list" />} />

          <Route exact path="/login" component={Login} />
          <Route path="/donation/list" component={DonationList} />
          <Route exact path="/campaign/create" component={Dashboard} />
          <Route exact path="/campaign/details" component={Details} />
          <Route exact path="/campaign/list" component={CampaignList} />

          <Route exact path="/campaign/enrollments" component={EnrollmentList} />
          {/* <Route path="/auth" component={AuthRoute} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/auth" component={AuthRoute} /> */}
          
          {/* <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/donation/list" component={DonationList} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/campaign/create" component={Dashboard} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/campaign/details" component={Details} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/campaign/list" component={CampaignList} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  // console.log(`Login's mapStateToProps`, state);
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

// export default withRouter(connect(mapStateToProps)(App));
export default connect(mapStateToProps)(App);