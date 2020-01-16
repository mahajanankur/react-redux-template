export const CREATE_CAMPAIGN_INITIAL = 'CREATE_CAMPAIGN_INITIAL';
export const CREATE_CAMPAIGN_REQUEST = 'CREATE_CAMPAIGN_REQUEST';
export const CREATE_CAMPAIGN_SUCCESS = 'CREATE_CAMPAIGN_SUCCESS';
export const CREATE_CAMPAIGN_FAILURE = 'CREATE_CAMPAIGN_FAILURE';

export const FETCH_CAMPAIGN_REQUEST = 'FETCH_CAMPAIGN_REQUEST';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE';

export const FETCH_ALL_CAMPAIGN_REQUEST = 'FETCH_ALL_CAMPAIGN_REQUEST';
export const FETCH_ALL_CAMPAIGN_SUCCESS = 'FETCH_ALL_CAMPAIGN_SUCCESS';
export const FETCH_ALL_CAMPAIGN_FAILURE = 'FETCH_ALL_CAMPAIGN_FAILURE';

export const UPDATE_CAMPAIGN_INITIAL = 'UPDATE_CAMPAIGN_INITIAL';
export const UPDATE_CAMPAIGN_REQUEST = 'UPDATE_CAMPAIGN_REQUEST';
export const UPDATE_CAMPAIGN_SUCCESS = 'UPDATE_CAMPAIGN_SUCCESS';
export const UPDATE_CAMPAIGN_FAILURE = 'UPDATE_CAMPAIGN_FAILURE';

// Create Campaign
function createCampiagnInitial() {
    return {
        type: CREATE_CAMPAIGN_INITIAL,
        isCreating: false,
    };
}

function createCampiagnRequest(body) {
    return {
        type: CREATE_CAMPAIGN_REQUEST,
        isCreating: true,
        createCampaignBody: body
    };
}

function createCampiagnSuccess(response) {
    return {
        type: CREATE_CAMPAIGN_SUCCESS,
        isCreating: false,
        createCampaignResponse: response
    };
}

function createCampiagnError(message) {
    return {
        type: CREATE_CAMPAIGN_FAILURE,
        isCreating: false,
        createCampaignMessage: message
    };
}

export function createCampiagn(dto) {
    const url = "http://127.0.0.1:3333/api/admin/campaign/";
    const config = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    };
    return (dispatch) => {
        dispatch(createCampiagnRequest(dto));

        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(createCampiagnError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(createCampiagnSuccess(json.data));
                setTimeout(() => {
                    dispatch(createCampiagnInitial());
                }, 5000);
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(createCampiagnError(err));
                return Promise.reject(err);
            });
    };
}

// Get Campaign by id
function getCampiagnRequest() {
    return {
        type: FETCH_CAMPAIGN_REQUEST,
        isFetching: true
    };
}

function getCampiagnSuccess(response) {
    return {
        type: FETCH_CAMPAIGN_SUCCESS,
        isFetching: false,
        getCampaignResponse: response
    };
}

function getCampiagnError(message) {
    return {
        type: FETCH_CAMPAIGN_FAILURE,
        isFetching: false,
        getCampaignMessage: message
    };
}

export function getCampiagnById(id) {
    const url = `http://127.0.0.1:3333/api/admin/campaign/${id}`;
    const config = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
    };
    return (dispatch) => {
        dispatch(getCampiagnRequest());

        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(getCampiagnError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(getCampiagnSuccess(json.data));
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(getCampiagnError(err));
                return Promise.reject(err);
            });
    };
}

// Get All Campaign
function getAllCampiagnRequest() {
    return {
        type: FETCH_ALL_CAMPAIGN_REQUEST,
        isFetching: true
    };
}

function getAllCampiagnSuccess(response) {
    return {
        type: FETCH_ALL_CAMPAIGN_SUCCESS,
        isFetching: false,
        getAllCampaignsResponse: response
    };
}

function getAllCampiagnError(message) {
    return {
        type: FETCH_ALL_CAMPAIGN_FAILURE,
        isFetching: false,
        getAllCampaignsMessage: message
    };
}

export function getAllCampiagnsPaginated(page, size) {
    const url = `http://127.0.0.1:3333/api/admin/campaigns/page?page=${page}&size=${size}`;
    const config = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
    };
    return (dispatch) => {
        dispatch(getAllCampiagnRequest());

        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(getAllCampiagnError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(getAllCampiagnSuccess(json.data));
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(getAllCampiagnError(err));
                return Promise.reject(err);
            });
    };
}

// Update Campaign
function updateCampiagnInitial() {
    return {
        type: UPDATE_CAMPAIGN_INITIAL,
        isUpdating: false,
    };
}

function updateCampiagnRequest(body) {
    return {
        type: UPDATE_CAMPAIGN_REQUEST,
        isUpdating: true,
        updateCampaignBody: body
    };
}

function updateCampiagnSuccess(response) {
    return {
        type: UPDATE_CAMPAIGN_SUCCESS,
        isUpdating: false,
        updateCampaignResponse: response
    };
}

function updateCampiagnError(message) {
    return {
        type: UPDATE_CAMPAIGN_FAILURE,
        isUpdating: false,
        updateCampaignMessage: message
    };
}

export function updateCampiagn(dto) {
    const url = "http://127.0.0.1:3333/api/admin/campaign/";
    const config = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    };
    return (dispatch) => {
        dispatch(updateCampiagnRequest(dto));

        return fetch(url, config)
            .then(response => response.json())
            .then(json => {
                // console.log("JSON: ", json);
                if (!json || !json.status) {
                    // If there was a problem, dispatch the error action
                    const msg = (json && json.message) ? json.message : "There is some truble.";
                    dispatch(updateCampiagnError(msg));
                    return Promise.reject(msg);
                }
                // Dispatch the success action
                dispatch(updateCampiagnSuccess(json.data));
                setTimeout(() => {
                    dispatch(updateCampiagnInitial());
                }, 5000);
            }).catch(err => {
                console.log('Error: ', err);
                dispatch(updateCampiagnError(err));
                return Promise.reject(err);
            });
    };
}