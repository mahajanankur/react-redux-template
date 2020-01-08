import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Dashboard from '../src/pages/dashboard/Dashboard';
import Details from './pages/campaigns/details/Details';
import CampaignList from './pages/campaigns/list/CampaignList';

export default function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/list" component={CampaignList} />
      </Switch>
    </BrowserRouter>
  )
}