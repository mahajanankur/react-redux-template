import {
    FETCH_ALL_DONATION_REQUEST, FETCH_ALL_DONATION_SUCCESS,
    FETCH_ALL_DONATION_FAILURE
} from '../actions/donations';

export default function donations(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case FETCH_ALL_DONATION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_ALL_DONATION_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                getAllDonationResponse: action.getAllDonationResponse
            });
        case FETCH_ALL_DONATION_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.getAllDonationMessage,
            });
        default:
            return state;
    }
}
