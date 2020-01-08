import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { ProgressBar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import './Sidebar.scss';

import LinksGroup from './LinksGroup/LinksGroup';

class Sidebar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <nav className={s.root}>
        <header className={s.logo}>
          <Link to="/app"> Dashboard</Link>
        </header>

        {this.props.userType === 'ROLE_GYM' && <ul className={s.nav}>
          <LinksGroup header="Reports & Analytics" headerLink="/app/gym/reports" iconName="glyphicon-signal" />
          <LinksGroup
            header="Gyms"
            headerLink="/app/posts"
            childrenLinks={[
              { name: 'Show all', link: '/app/posts' },
              { name: 'Gym Details', link: '/app/gym/gymDetail' },
              { name: 'Create new Gym Program', link: '/app/gym/gymProgram/new' },
              { name: 'Gym Programs', link: '/app/gym/gymPrograms' },
              { name: 'My Approvals', link: '/app/gym/approvals' }
            ]}
            iconName="glyphicon-list-alt"
          />

          <LinksGroup header="Sales & Marketing" headerLink="/app/gym/reports" iconName="glyphicon-usd" />
          <LinksGroup header="Management" headerLink="/app/gym/reports" iconName="glyphicon-tasks" />
          <LinksGroup header="Billing" headerLink="/app/gym/reports" iconName="glyphicon-euro" />

        </ul>}

        {this.props.userType === 'ROLE_CUSTOMER' && <ul className={s.nav}>
          <LinksGroup header="Reports & Analytics" headerLink="/app/customer/reports" iconName="glyphicon-tree-conifer" />

          <LinksGroup
            header="Customer"
            headerLink="/app/posts"
            childrenLinks={[
              { name: 'Profile', link: '/app/customer/customerDetails' },
              { name: 'Search Gym', link: '/app/customer/search' },
              { name: 'Promotions', link: '/app/customer/promotions' },
              { name: 'My Enrollments', link: '/app/customer/myenrollments' }
            ]}
            iconName="glyphicon-user"
          />

        </ul>}

      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebarOpened: state.navigation.sidebarOpened,
    sidebarStatic: state.navigation.sidebarStatic,
    userType: state.auth.userType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
