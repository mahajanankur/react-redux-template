import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Dashboard from '../src/pages/dashboard/Dashboard';
import Details from '../src/pages/details/Details';

export default function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/details" component={Details} />
      </Switch>
    </BrowserRouter>
  )
}