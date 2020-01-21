import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import {
  Row, Col, Navbar, Nav, NavDropdown
} from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
      <div className="root">
        <Row>
          <Col sm={12} xs={12} md={12}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/campaign/list">HH</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  {/* <Nav.Link href="/">Create</Nav.Link>
                  <Nav.Link href="/campaign/list">Campaign</Nav.Link>
                  <Nav.Link href="/donation/list">Donation</Nav.Link> */}
                  <NavDropdown title="Campaigns" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/campaign/create">Create</NavDropdown.Item>
                    <NavDropdown.Item href="/campaign/list">List</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Donations" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/donation/list">List</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Header;
