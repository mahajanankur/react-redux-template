import logger from "redux-logger";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const baseContext = "http://127.0.0.1:3333/api";
// export const IP = 'http://127.0.0.1:8080';

function loginRequest(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem('access_token');
    document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(logoutSuccess());
  };
}

export function loginUser(creds) {
  const url = `${baseContext}/auth/token`;
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // Check This. - https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    // credentials: 'include',
    // mode: 'cors',
    body: JSON.stringify(creds)
  };
  return (dispatch) => {
    dispatch(loginRequest(creds));
    return fetch(url, config)
      .then(response => response.json())
      .then(json => {
        // console.log("JSON: ", json);
        if (!json || !json.status) {
          // If there was a problem, dispatch the error action
          const msg = (json && json.message) ? json.message : "There is some truble.";
          dispatch(loginError(msg));
          return Promise.reject(msg);
        }
        // If login was successful, set the token in local storage
        localStorage.setItem('access_token', json.token);
        // Dispatch the success action
        dispatch(loginSuccess(json.data));
      }).catch(err => {
        console.log('Error: ', err);
        dispatch(loginError(err));
        return Promise.reject(err);
      });
  };
}
