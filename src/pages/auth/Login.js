import React from 'react';
import { Row, Col, Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import './Login.scss';
import { loginUser } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isFetching: false,
      user: null,
      isAuthenticated: false,
    };
  }

  handleGenericOnChange = (event) => {
    const target = event.target;
    if (target) {
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
    }
  }

  doLogin(event) {
    this.props
      .dispatch(loginUser({ email: this.state.username, password: this.state.password }));
    event.preventDefault();
  }

  render() {
    if (this.props.isAuthenticated) {
      // cant access login page while logged in
      const { from } = { from: { pathname: '/auth' } };
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="center">
        <div className="root">
          <Row>
            <Col xs={10} sm={6} lg={4}>
              <h4 className="mt-0">Sign In</h4>
              <form className="mt" onSubmit={this.doLogin.bind(this)}>
                {
                  this.props.errorMessage && (
                    <Alert className="alert-sm" bsStyle="danger">
                      {this.props.errorMessage}
                    </Alert>
                  )
                }
                <div className="form-group">
                  <input className="form-control no-border" onChange={this.handleGenericOnChange} type="text" required name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input className="form-control no-border" onChange={this.handleGenericOnChange} type="password" required name="password" placeholder="Password" />
                </div>
                <div className="clearfix">
                  <div className="btn-toolbar pull-right">
                    <button type="submit" className="btn btn-success btn-sm">{this.props.isFetching ? 'Loading...' : 'Login'}</button>
                  </div>
                </div>
              </form>
              {/* <br></br>
                <FacebookLogin
                  appId="345501322630290"
                  autoLoad={false}
                  icon="fa-facebook"
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  textButton="Or Sign in with Facebook"
                  disableMobileRedirect={true}
                  callback={this.responseFacebook.bind(this)}
                  size={"small"}
                >
                </FacebookLogin> */}
              <div className="clearfix">
                <a className="mt-sm pull-right fs-sm" href="/register">Don't have a account Sign up?</a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(`Login's mapStateToProps`, state);
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps)(Login);