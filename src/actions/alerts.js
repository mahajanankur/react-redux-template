import { BASE_CONTEXT, PAGINATION_SIZE } from '../constants/application';

export const FETCH_ALERTS_REQUEST = 'FETCH_ALERTS_REQUEST';
export const FETCH_ALERTS_SUCCESS = 'FETCH_ALERTS_SUCCESS';
export const FETCH_ALERTS_FAILURE = 'FETCH_ALERTS_FAILURE';

function getAlertsListRequest() {
    return {
        type: FETCH_ALERTS_REQUEST,
        isFetching: true
    };
}

function getAlertsListSuccess(data) {
    return {
        type: FETCH_ALERTS_SUCCESS,
        isFetching: false,
        response: data
    };
}

function getAlertsListError(message) {
    return {
        type: FETCH_ALERTS_FAILURE,
        isFetching: false,
        message: message
    };
}

export function getAlertsList(page, size) {
    const url = `${BASE_CONTEXT}/getInstanceList?page=${page}&size=${size}`;
    const config = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'changeme'
        },
    };
    return (dispatch) => {
        dispatch(getAlertsListRequest());
        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(getAlertsListError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(getAlertsListSuccess(json.data));
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(getAlertsListError(err));
                return Promise.reject(err);
            });
    };
}