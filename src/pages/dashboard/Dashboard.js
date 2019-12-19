import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

import { fetchAllEmployees } from "../../actions/people";
// import s from './Dashboard.scss';
import './Dashboard.scss';
// import s from './Dashboard.css';
// import './Dashboard.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: null
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchAllEmployees()).then(() => {
      this.setState({
        employees: this.props.employees
      });
    });
  }

  render() {

    return (
      <div className="root">
        <h1 className="mb-lg">Ted Dashboard</h1>
        <Row>
          <Col sm={12}>
            <div>
              <div className="pull-right mt-n-xs">
                <input type="search" placeholder="Search..." className="form-control input-sm" />
              </div>
              <h5 className="mt-0">Teds</h5>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {this.state.employees && this.state.employees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.first_name}</td>
                    <td>{emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>
                      <Link to={
                        {
                          pathname: "/details",
                          // hash: "#the-hash",
                          state: { emp }

                        }
                      } className="btn btn-sm btn-success">Check</Link></td>
                  </tr>
                ))}
                {this.state.employees && !this.state.employees.length &&
                  <tr>
                    <td colSpan="100">No employees are found.</td>
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
    );
  }
}

function mapStateToProps(state) {
  console.log("states : ", state);
  return {
    employees: state.people.employees,
    isFetching: state.people.isFetching
  };
}

export default connect(mapStateToProps)(Dashboard);
