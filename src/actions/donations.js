// export const CREATE_CAMPAIGN_INITIAL = 'CREATE_CAMPAIGN_INITIAL';
// export const CREATE_CAMPAIGN_REQUEST = 'CREATE_CAMPAIGN_REQUEST';
// export const CREATE_CAMPAIGN_SUCCESS = 'CREATE_CAMPAIGN_SUCCESS';
// export const CREATE_CAMPAIGN_FAILURE = 'CREATE_CAMPAIGN_FAILURE';

// export const FETCH_CAMPAIGN_REQUEST = 'FETCH_CAMPAIGN_REQUEST';
// export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
// export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE';

export const FETCH_ALL_DONATION_REQUEST = 'FETCH_ALL_DONATION_REQUEST';
export const FETCH_ALL_DONATION_SUCCESS = 'FETCH_ALL_DONATION_SUCCESS';
export const FETCH_ALL_DONATION_FAILURE = 'FETCH_ALL_DONATION_FAILURE';

// export const UPDATE_CAMPAIGN_INITIAL = 'UPDATE_CAMPAIGN_INITIAL';
// export const UPDATE_CAMPAIGN_REQUEST = 'UPDATE_CAMPAIGN_REQUEST';
// export const UPDATE_CAMPAIGN_SUCCESS = 'UPDATE_CAMPAIGN_SUCCESS';
// export const UPDATE_CAMPAIGN_FAILURE = 'UPDATE_CAMPAIGN_FAILURE';

// Get All Campaign
function getAllDonationRequest() {
    return {
        type: FETCH_ALL_DONATION_REQUEST,
        isFetching: true
    };
}

function getAllDonationSuccess(response) {
    return {
        type: FETCH_ALL_DONATION_SUCCESS,
        isFetching: false,
        getAllDonationResponse: response
    };
}

function getAllDonationError(message) {
    return {
        type: FETCH_ALL_DONATION_FAILURE,
        isFetching: false,
        getAllDonationMessage: message
    };
}

export function getAllDonations(page, size) {
    const url = `http://127.0.0.1:3333/api/admin/donations?page=${page}&size=${size}`;
    const config = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return (dispatch) => {
        dispatch(getAllDonationRequest());

        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(getAllDonationError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(getAllDonationSuccess(json.data));
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(getAllDonationError(err));
                return Promise.reject(err);
            });
    };
}