import {
  FETCH_EMPLOYEE_REQUEST, FETCH_EMPLOYEE_SUCCESS, FETCH_EMPLOYEE_FAILURE,
  FETCH_ALL_EMPLOYEE_REQUEST, FETCH_ALL_EMPLOYEE_SUCCESS, FETCH_ALL_EMPLOYEE_FAILURE
} from '../actions/people';

export default function people(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employee: action.employee
      });
    case FETCH_EMPLOYEE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    case FETCH_ALL_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_ALL_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employees: action.employees
      });
    case FETCH_ALL_EMPLOYEE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    default:
      return state;
  }
}
