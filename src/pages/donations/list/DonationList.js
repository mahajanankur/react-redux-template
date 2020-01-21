import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { Delete, AddCircle, Visibility } from '@material-ui/icons';

import Header from "../../../components/header/Header";

import { getAllDonations } from "../../../actions/donations";
// import s from './Dashboard.scss';
import './DonationList.scss';
import { PAGINATION_SIZE } from "../../../constants/application";

class DonationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      donations: [],
      page: 0,
      size: PAGINATION_SIZE,
      items: []
    };
  }

  componentWillMount() {
    this.getDonationList(this.state.page, this.state.size);
  }

  getDonationList(page, size) {
    this.props.dispatch(getAllDonations(page, size)).then(() => {
      //Pagination
      let total = this.props.donations.count;
      if (total) {
        let pageItems = this.getPaginationItems(total, page, size);
        //Set states
        this.setState({
          donations: this.props.donations.rows,
          count: this.props.donations.count,
          items: pageItems
        });
      }
    });
  }

  getPaginationItems(total, page, size) {
    let pageItems = [];
    // let size = this.state.size;
    let totalPages = parseInt(total / size);
    for (let i = 0; i <= totalPages; i++) {
      pageItems.push(
        <Pagination.Item key={i} active={i === page}>
          {i}
        </Pagination.Item>
      );
    }
    return pageItems;
  }

  handlePaginationClick(event) {
    //Get donation list
    let page = parseInt((event.target && event.target.innerText) ? event.target.innerText : 0);
    this.getDonationList(page, this.state.size);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="root">
          <h1 className="mb-lg">All Donations</h1>
          <Row>
            <Col sm={12}>
              {/* <div>
                <div className="pull-right">
                  <input type="search" placeholder="Search..." className="form-control input-sm" />
                </div>
              </div> */}
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
          <Row>
            <Col sm={{ span: 6, offset: 5 }}>
              <Pagination onClick={this.handlePaginationClick.bind(this)}>{this.state.items}</Pagination>
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
