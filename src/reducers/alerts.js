import {
    FETCH_ALERTS_REQUEST, FETCH_ALERTS_SUCCESS, FETCH_ALERTS_FAILURE
} from '../actions/alerts';

export default function alerts(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case FETCH_ALERTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_ALERTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                getAlertsListResponse: action.response
            });
        case FETCH_ALERTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message,
            });
        default:
            return state;
    }
}
