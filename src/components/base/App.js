import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import AlertList from '../../pages/alerts/list/AlertList';

class App extends React.PureComponent {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact render={() => <Redirect to="/alert/list" />} />
          <Route exact path="/alert/list" component={AlertList} /> */}
          <Route exact path="/" component={AlertList} />
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);