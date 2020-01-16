import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Dashboard from '../../pages/dashboard/Dashboard';
import Details from '../../pages/campaigns/details/Details';
import CampaignList from '../../pages/campaigns/list/CampaignList';
import DonationList from '../../pages/donations/list/DonationList';

export default function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/campaign/details" component={Details} />
        <Route exact path="/campaign/list" component={CampaignList} />
        <Route exact path="/donation/list" component={DonationList} />
      </Switch>
    </BrowserRouter>
  )
}