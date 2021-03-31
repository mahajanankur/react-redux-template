import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { DeleteForever, AddCircle, Visibility, EventAvailable } from '@material-ui/icons';

import Header from "../../../components/header/Header";
import { getAlertsList } from "../../../actions/alerts";
import './AlertList.scss';
import { PAGINATION_SIZE } from '../../../constants/application';

class AlertList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            page: 0,
            size: PAGINATION_SIZE,
            items: []
        };
    }

    componentWillMount() {
        this.getPaginatedAlertList(this.state.page, this.state.size);
    }

    getPaginatedAlertList(page, size) {
        this.props.dispatch(getAlertsList(page, size)).then(() => {
            this.setState({
                alerts: this.props.alerts.instances,
                count: this.props.alerts.total,
            });
            //Pagination
            // let total = this.props.alerts.count;
            // if (total) {
            //     let pageItems = this.getPaginationItems(total, page, size);
            //     //Set states
            //     this.setState({
            //         alerts: this.props.alerts.rows,
            //         count: total,
            //         items: pageItems
            //     });
            // }
        });
    }

    // getPaginationItems(total, page, size) {
    //     let pageItems = [];
    //     // let size = this.state.size;
    //     let totalPages = parseInt(total / size);
    //     for (let i = 0; i <= totalPages; i++) {
    //         pageItems.push(
    //             <Pagination.Item key={i} active={i === page}>
    //                 {i}
    //             </Pagination.Item>
    //         );
    //     }
    //     return pageItems;
    // }

    // handlePaginationClick(event) {
    //     //Get donation list
    //     let page = parseInt((event.target && event.target.innerText) ? event.target.innerText : 0);
    //     this.getCampaignList(page, this.state.size);
    // }

    render() {
        return (
            <div>
                <Header />
                <div className="root">
                    <h1 className="mb-lg">Alerts List</h1>
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
                                        <th>Label</th>
                                        <th>Instance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.alerts && this.state.alerts.map((alert, index) => (
                                        <tr key={alert.id}>
                                            <td>{alert.id}</td>
                                            <td>{alert.label}</td>
                                            <td>{alert.instance}</td>
                                            <th>View</th>
                                        </tr>
                                    ))}
                                    {this.state.alerts && !this.state.alerts.length &&
                                        <tr>
                                            <td colSpan="100">No alerts are found.</td>
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
                    {/* <Row>
                        <Col sm={{ span: 6, offset: 5 }}>
                            <Pagination onClick={this.handlePaginationClick.bind(this)}>{this.state.items}</Pagination>
                        </Col>
                    </Row> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts.getAlertsListResponse,
        isFetching: state.alerts.isFetching
    };
}

export default connect(mapStateToProps)(AlertList);
