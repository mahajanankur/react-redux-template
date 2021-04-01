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
              <Navbar.Brand href="/">Utilities</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Alerts" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/">List</NavDropdown.Item>
                  </NavDropdown>
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
