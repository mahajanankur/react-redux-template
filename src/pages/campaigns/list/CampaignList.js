import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';

import Header from "../../../components/Header/Header";

import { getAllCampiagnsPaginated } from "../../../actions/events";
// import s from './Dashboard.scss';
import './CampaignList.scss';

class CampaignList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            page: 0,
            size: 10
        };
    }

    componentWillMount() {
        this.props.dispatch(getAllCampiagnsPaginated(this.state.page, this.state.size)).then(() => {
            this.setState({
                campaigns: this.props.campaigns.rows,
                count: this.props.campaigns.count
            });
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="root">
                    <h1 className="mb-lg">All Campaigns</h1>
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
                                        <th>Heading</th>
                                        <th>Price</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Active</th>
                                        <th>Deleted</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {this.state.campaigns && this.state.campaigns.map((cam, index) => (
                                        <tr key={cam.id}>
                                            <td>{cam.id}</td>
                                            <td>{cam.heading}</td>
                                            <td>{cam.price}</td>
                                            <td>{moment(cam.startTime).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td>{moment(cam.endTime).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td>{cam.active ? "Yes" : "No"}</td>
                                            <td>{cam.deleted ? "Yes" : "No"}</td>
                                            <td>{moment(cam.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td>
                                                <Link to={
                                                    {
                                                        pathname: "/details",
                                                        // hash: "#the-hash",
                                                        state: { campaignId: cam.id }

                                                    }
                                                } className="btn btn-sm btn-success">Check</Link></td>
                                        </tr>
                                    ))}
                                    {this.state.campaigns && !this.state.campaigns.length &&
                                        <tr>
                                            <td colSpan="100">No campaigns are found.</td>
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
        campaigns: state.events.campaigns,
        isFetching: state.events.isCreating
    };
}

export default connect(mapStateToProps)(CampaignList);
