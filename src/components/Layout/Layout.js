/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
// import loadPosts from 'bundle-loader?lazy!../../pages/posts/Posts';
// import loadPrivacy from 'bundle-loader?lazy!../../pages/privacy/Privacy';
// import loadProfile from 'bundle-loader?lazy!../../pages/profile/Profile';
// import loadNotFound from 'bundle-loader?lazy!../../pages/notFound/NotFound';
// import loadGym from 'bundle-loader?lazy!../../pages/gym/Gym';
// import loadCustomerBundle from 'bundle-loader?lazy!../../pages/customer/CustomerBundle';
/* eslint-enable */

import s from './Layout.scss';
// import Header from '../Header';
// import Footer from '../Footer';
// import Bundle from '../../core/Bundle';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
// import Dashboard from '../../pages/dashboard/Dashboard';


// const PostsBundle = Bundle.generateBundle(loadPosts);
// const PrivacyBundle = Bundle.generateBundle(loadPrivacy);
// const ProfileBundle = Bundle.generateBundle(loadProfile);
// const NotFoundBundle = Bundle.generateBundle(loadNotFound);
// const GymBundle = Bundle.generateBundle(loadGym);
// const CustomerBundle = Bundle.generateBundle(loadCustomerBundle);

class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false,
        };
    }

    render() {
        return (
            <div className={s.root}>
                <Sidebar />
                <div className={[s.wrap, this.state.sidebarOpen ? s.sidebarOpen : ''].join(' ')}>
                    <Header sidebarToggle={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })} />
                    <main className={s.content}>
                        <Switch>
                            <Route exact path="/app" component={GymReport} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default withRouter(connect(mapStateToProps)(Layout));
