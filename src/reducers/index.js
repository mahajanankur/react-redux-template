import { combineReducers } from 'redux';

import events from './events';
import donations from './donations';

const rootReducers = combineReducers({
    // add reducer files references here
    // default: defaultReducer
    events,
    donations
});

export default rootReducers;