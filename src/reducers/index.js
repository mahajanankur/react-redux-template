import { combineReducers } from 'redux';

import events from './events';
import donations from './donations';
import auth from './auth';

const rootReducers = combineReducers({
    // add reducer files references here
    // default: defaultReducer
    events,
    donations,
    auth
});

export default rootReducers;