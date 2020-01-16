import { combineReducers } from 'redux';

// calling the default reducer to create a link
// import defaultReducer from './default-reducer';
import people from './people';
import events from './events';
import donations from './donations';

const rootReducers = combineReducers({
    // add reducer files references here
    // default: defaultReducer
    people,
    events,
    donations
});

export default rootReducers;