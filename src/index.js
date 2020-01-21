import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/base/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
//Error: Actions must be plain objects. Use custom middleware for async actions.
import thunk from 'redux-thunk';

// Getting Redux DevTools To Work - https://stackoverflow.com/questions/37298559/getting-redux-devtools-to-work
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
    reducers,
    enhancers,
    applyMiddleware(logger, ReduxPromise, thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('base'));
registerServiceWorker();
