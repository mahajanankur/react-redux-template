import { combineReducers } from 'redux';

import alerts from './alerts';

const rootReducers = combineReducers({
    // add reducer files references here
    // default: defaultReducer
    alerts,
});

export default rootReducers;