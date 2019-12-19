export const FETCH_EMPLOYEE_REQUEST = 'FETCH_EMPLOYEE_REQUEST';
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE';

export const FETCH_ALL_EMPLOYEE_REQUEST = 'FETCH_ALL_EMPLOYEE_REQUEST';
export const FETCH_ALL_EMPLOYEE_SUCCESS = 'FETCH_ALL_EMPLOYEE_SUCCESS';
export const FETCH_ALL_EMPLOYEE_FAILURE = 'FETCH_ALL_EMPLOYEE_FAILURE';


function fetchEmployeeRequest() {
  return {
    type: FETCH_EMPLOYEE_REQUEST,
    isFetching: true,
  };
}

function fetchEmployeeSuccess(employee) {
  return {
    type: FETCH_EMPLOYEE_SUCCESS,
    isFetching: false,
    employee
  };
}

function fetchEmployeeError(message) {
  return {
    type: FETCH_EMPLOYEE_FAILURE,
    isFetching: false,
    message
  };
}

export function fetchEmployeeById(id) {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };

  return (dispatch) => {
    dispatch(fetchEmployeeRequest());

    return fetch("https://reqres.in/api/users/" + id, config)
      .then(response => response.json())
      .then(json => {
        // console.log("JSON: ", json);
        if (!json || !json.data) {
          // If there was a problem, dispatch the error action
          const msg = "No data found.";
          dispatch(fetchEmployeeError(msg));
          return Promise.reject(msg);
        }
        // Dispatch the success action
        dispatch(fetchEmployeeSuccess(json.data));
      }).catch(err => {
        console.log('Error: ', err);
        dispatch(fetchEmployeeError(err));
        return Promise.reject(err);
      });
  };
}

// Fetch all employees.
function fetchAllEmployeeRequest() {
  return {
    type: FETCH_ALL_EMPLOYEE_REQUEST,
    isFetching: true,
  };
}

function fetchAllEmployeeSuccess(employees) {
  return {
    type: FETCH_ALL_EMPLOYEE_SUCCESS,
    isFetching: false,
    employees
  };
}

function fetchAllEmployeeError(message) {
  return {
    type: FETCH_ALL_EMPLOYEE_FAILURE,
    isFetching: false,
    message
  };
}

export function fetchAllEmployees() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };

  return (dispatch) => {
    dispatch(fetchAllEmployeeRequest());

    return fetch("https://reqres.in/api/users/", config)
      .then(response => response.json())
      .then(json => {
        // console.log("JSON: ", json);
        if (!json || !json.data) {
          // If there was a problem, dispatch the error action
          const msg = "No data found.";
          dispatch(fetchAllEmployeeError(msg));
          return Promise.reject(msg);
        }
        // Dispatch the success action
        dispatch(fetchAllEmployeeSuccess(json.data));
      }).catch(err => {
        console.log('Error: ', err);
        dispatch(fetchAllEmployeeError(err));
        return Promise.reject(err);
      });
  };
}