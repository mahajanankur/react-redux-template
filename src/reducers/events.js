import {
    CREATE_CAMPAIGN_INITIAL, CREATE_CAMPAIGN_REQUEST, CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAILURE, FETCH_CAMPAIGN_REQUEST, FETCH_CAMPAIGN_SUCCESS,
    FETCH_CAMPAIGN_FAILURE, FETCH_ALL_CAMPAIGN_REQUEST, FETCH_ALL_CAMPAIGN_SUCCESS,
    FETCH_ALL_CAMPAIGN_FAILURE
} from '../actions/events';

export default function events(state = {
    isCreating: false,
}, action) {
    switch (action.type) {
        case CREATE_CAMPAIGN_INITIAL:
            return Object.assign({}, state, {
                isCreating: false
            });
        case CREATE_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isCreating: true,
                campaign: action.campaign
            });
        case CREATE_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isCreating: false,
                message: 'Campaign created successfully.',
                campaign: action.campaign
            });
        case CREATE_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isCreating: false,
                message: action.message,
            });
        case FETCH_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                campaign: action.campaign
            });
        case FETCH_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message,
            });
            case FETCH_ALL_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_ALL_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                campaigns: action.campaigns
            });
        case FETCH_ALL_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message,
            });
        default:
            return state;
    }
}
