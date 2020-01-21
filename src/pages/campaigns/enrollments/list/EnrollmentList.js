import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { Delete, AddCircle, Visibility, EventAvailable } from '@material-ui/icons';

import Header from "../../../../components/header/Header";

import { getEnrollmentsOfCampiagn } from "../../../../actions/events";
// import s from './Dashboard.scss';
import './EnrollmentList.scss';
import { PAGINATION_SIZE } from '../../../../constants/application';

class EnrollmentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            campaignId: (this.props.location.state && this.props.location.state.campaignId) ? this.props.location.state.campaignId : "",
            enrollments: [],
            page: 0,
            size: PAGINATION_SIZE,
            items: []
        };
    }

    componentWillMount() {
        console.log(`Campaign id supplied in link is ${this.state.campaignId}`);
        this.getEnrollmentList(this.state.campaignId, this.state.page, this.state.size);
    }

    getEnrollmentList(campaignId, page, size) {
        this.props.dispatch(getEnrollmentsOfCampiagn(campaignId, page, size)).then(() => {
            //Pagination
            let total = this.props.enrollments.count;
            if (total) {
                let pageItems = this.getPaginationItems(total, page, size);
                //Set states
                this.setState({
                    enrollments: this.props.enrollments.rows,
                    count: total,
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
        this.getEnrollmentList(this.state.campaignId, page, this.state.size);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="root">
                    <h1 className="mb-lg">All Enrollments</h1>
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
                                        <th>CampaignId</th>
                                        <th>PaymentId</th>
                                        <th>Active</th>
                                        <th>Deleted</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {this.state.enrollments && this.state.enrollments.map((enroll, index) => (
                                        <tr key={enroll.id}>
                                            <td>{enroll.id}</td>
                                            <td>{enroll.campaignName}</td>
                                            <td>{enroll.status}</td>
                                            <td>{enroll.amount}</td>
                                            <td>{enroll.userId ? enroll.userId : "Guest"}</td>
                                            <td>{enroll.campaignId}</td>
                                            <td>{enroll.paymentId}</td>
                                            <td>{enroll.active ? "Yes" : "No"}</td>
                                            <td>{enroll.deleted ? "Yes" : "No"}</td>
                                            <td>{moment(enroll.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td>
                                                <Link to={
                                                    {
                                                        pathname: "/campaign/details",
                                                        // hash: "#the-hash",
                                                        state: { campaignId: enroll.id }
                                                    }
                                                }>
                                                    <Visibility />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {this.state.enrollments && !this.state.enrollments.length &&
                                        <tr>
                                            <td colSpan="100">No enrollments are found.</td>
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
        enrollments: state.events.getEnrollmentsResponse,
        isFetching: state.events.isFetching
    };
}

export default connect(mapStateToProps)(EnrollmentList);
