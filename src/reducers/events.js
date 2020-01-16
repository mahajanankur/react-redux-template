import {
    CREATE_CAMPAIGN_INITIAL, CREATE_CAMPAIGN_REQUEST, CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAILURE, FETCH_CAMPAIGN_REQUEST, FETCH_CAMPAIGN_SUCCESS,
    FETCH_CAMPAIGN_FAILURE, FETCH_ALL_CAMPAIGN_REQUEST, FETCH_ALL_CAMPAIGN_SUCCESS,
    FETCH_ALL_CAMPAIGN_FAILURE, UPDATE_CAMPAIGN_INITIAL, UPDATE_CAMPAIGN_REQUEST,
    UPDATE_CAMPAIGN_SUCCESS, UPDATE_CAMPAIGN_FAILURE
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
                createCampaignBody: action.createCampaignBody
            });
        case CREATE_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isCreating: false,
                message: 'Campaign created successfully.',
                createCampaignResponse: action.createCampaignResponse
            });
        case CREATE_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isCreating: false,
                message: action.createCampaignMessage,
            });
        case FETCH_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                getCampaignResponse: action.getCampaignResponse
            });
        case FETCH_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.getCampaignMessage,
            });
        case FETCH_ALL_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_ALL_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                getAllCampaignsResponse: action.getAllCampaignsResponse
            });
        case FETCH_ALL_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.getAllCampaignsMessage,
            });
        case UPDATE_CAMPAIGN_INITIAL:
            return Object.assign({}, state, {
                isUpdating: false
            });
        case UPDATE_CAMPAIGN_REQUEST:
            return Object.assign({}, state, {
                isUpdating: true,
                updateCampaignBody: action.updateCampaignBody
            });
        case UPDATE_CAMPAIGN_SUCCESS:
            return Object.assign({}, state, {
                isUpdating: false,
                message: 'Campaign updated successfully.',
                updateCampaignResponse: action.updateCampaignResponse
            });
        case UPDATE_CAMPAIGN_FAILURE:
            return Object.assign({}, state, {
                isUpdating: false,
                message: action.updateCampaignMessage,
            });
        default:
            return state;
    }
}
