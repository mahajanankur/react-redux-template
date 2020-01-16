import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { Delete, AddCircle, Visibility } from '@material-ui/icons';

import Header from "../../../components/header/Header";

import { getAllDonations } from "../../../actions/donations";
// import s from './Dashboard.scss';
import './DonationList.scss';

class DonationList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      donations: [],
      page: 0,
      size: 10
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllDonations(this.state.page, this.state.size)).then(() => {
      this.setState({
        donations: this.props.donations.rows,
        count: this.props.donations.count
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="root">
          <h1 className="mb-lg">All Donations</h1>
          <Row>
            <Col sm={12}>
              <div>
                <div className="pull-right">
                  <input type="search" placeholder="Search..." className="form-control input-sm" />
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>UserId</th>
                    <th>PaymentId</th>
                    <th>Active</th>
                    <th>Deleted</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {this.state.donations && this.state.donations.map((don, index) => (
                    <tr key={don.id}>
                      <td>{don.id}</td>
                      <td>{don.name}</td>
                      <td>{don.gatewayStatus}</td>
                      <td>{don.amount}</td>
                      <td>{don.userId ? don.userId : "Guest"}</td>
                      <td>{don.paymentId}</td>
                      <td>{don.active ? "Yes" : "No"}</td>
                      <td>{don.deleted ? "Yes" : "No"}</td>
                      <td>{moment(don.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      <td>
                        <Link to={
                          {
                            pathname: "/donation/list",
                            // hash: "#the-hash",
                            state: { donationId: don.id }
                          }
                        }>
                          <Visibility />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {this.state.donations && !this.state.donations.length &&
                    <tr>
                      <td colSpan="100">No donations are found.</td>
                    </tr>
                  }
                  {this.props.isFetching &&
                    <tr>
                      <td colSpan="100">Loading...</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("states : ", state);
  return {
    donations: state.donations.getAllDonationResponse,
    isFetching: state.donations.isFetching
  };
}

export default connect(mapStateToProps)(DonationList);
