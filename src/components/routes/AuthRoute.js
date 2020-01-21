import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import Dashboard from '../../pages/dashboard/Dashboard';
import Details from '../../pages/campaigns/details/Details';
import CampaignList from '../../pages/campaigns/list/CampaignList';
import DonationList from '../../pages/donations/list/DonationList';
import EnrollmentList from '../../pages/campaigns/enrollments/list/EnrollmentList';

class AuthRoute extends React.PureComponent {

    render() {
        return (
            // <BrowserRouter>
            <Switch>
                <Route exact path="/auth" component={DonationList} />
                <Route path="/donation/list" component={DonationList} />
                <Route exact path="/campaign/create" component={Dashboard} />
                <Route exact path="/campaign/details" component={Details} />
                <Route exact path="/campaign/list" component={CampaignList} />
                <Route exact path="/campaign/enrollments" component={EnrollmentList} />
            </Switch>
            // </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    // console.log(`Login's mapStateToProps`, state);
    return {
        // isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps)(AuthRoute);