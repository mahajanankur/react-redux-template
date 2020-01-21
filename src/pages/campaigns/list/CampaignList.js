import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { DeleteForever, AddCircle, Visibility, EventAvailable } from '@material-ui/icons';

import Header from "../../../components/header/Header";

import { getAllCampiagnsPaginated } from "../../../actions/events";
// import s from './Dashboard.scss';
import './CampaignList.scss';
import { PAGINATION_SIZE } from '../../../constants/application';


class CampaignList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            page: 0,
            size: PAGINATION_SIZE,
            items: []
        };
    }

    componentWillMount() {
        this.getCampaignList(this.state.page, this.state.size);
    }

    getCampaignList(page, size) {
        this.props.dispatch(getAllCampiagnsPaginated(page, size)).then(() => {
            //Pagination
            let total = this.props.campaigns.count;
            if (total) {
                let pageItems = this.getPaginationItems(total, page, size);
                //Set states
                this.setState({
                    campaigns: this.props.campaigns.rows,
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
        this.getCampaignList(page, this.state.size);
    }

    deleteCampaignById = (campaignId) => (event) => {
        console.log(`Campaign Id ${campaignId}`);
        // TODO Delete campaign action
    }

    render() {
        return (
            <div>
                <Header />
                <div className="root">
                    <h1 className="mb-lg">All Campaigns</h1>
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
                                                        pathname: "/campaign/details",
                                                        // hash: "#the-hash",
                                                        state: { campaignId: cam.id }
                                                    }
                                                }>
                                                    <Visibility />
                                                </Link>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={
                                                    {
                                                        pathname: "/campaign/enrollments",
                                                        state: { campaignId: cam.id }
                                                    }
                                                }>
                                                    <EventAvailable />
                                                </Link>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <DeleteForever color="primary" onClick={this.deleteCampaignById(cam.id).bind(this)}/>
                                                
                                            </td>
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
        campaigns: state.events.getAllCampaignsResponse,
        isFetching: state.events.isFetching
    };
}

export default connect(mapStateToProps)(CampaignList);
