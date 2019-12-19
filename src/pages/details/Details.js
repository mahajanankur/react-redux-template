import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

// import { fetchAllEmployees } from "../../actions/people";
import './Details.scss';


class Details extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clickedEmployee: this.props.location.state && this.props.location.state.emp ? this.props.location.state.emp : null,
      employees: null
    };
  }

  componentWillMount() {
    // this.props.dispatch(fetchAllEmployees()).then(() => {
    //   this.setState({
    //     employees: this.props.employees
    //   });
    // });
  }

  render() {

    return (
      <div className="root">
        <h1 className="mb-lg">Details</h1>
        <Row>
          <Col sm={12}>
            <div>
              <div className="pull-right mt-n-xs">
                <input type="search" placeholder="Search..." className="form-control input-sm" />
              </div>
              <h5 className="mt-0">Employee Details</h5>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              {this.state.clickedEmployee &&
                <tbody>
                  <td>{this.state.clickedEmployee.id}</td>
                  <td>{this.state.clickedEmployee.first_name}</td>
                  <td>{this.state.clickedEmployee.last_name}</td>
                  <td>{this.state.clickedEmployee.email}</td>
                </tbody>
              }

              {!this.state.clickedEmployee &&
                <tbody>
                  <tr>
                    <td colSpan="100">No employee is found.</td>
                  </tr>
                </tbody>
              }
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Details);
