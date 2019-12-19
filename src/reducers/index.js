import { combineReducers } from 'redux';

// calling the default reducer to create a link
// import defaultReducer from './default-reducer';
import people from './people';

const rootReducers = combineReducers({
    // add reducer files references here
    // default: defaultReducer
    people
});

export default rootReducers;