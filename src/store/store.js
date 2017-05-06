import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { setunsubscribeSyncId } from '../actions'
import { getStoreData } from './getStoreData'
import { asyncStore } from './asyncStore'

window.clear = () => localStorage.clear();
window.base = base;

console.log('store.js is loading...');

const uid = localStorage['workout-timer-uid'] || 0;

/*
 This info is never deleted from localStorage on logout.

 Ideally, I need to set up async code to fetch the user's information from the server if they're logged in (if localStorage['workout-timer-uid'] exists)

*/
// const initialState = localStorage['workout-timer-app'] ?
// 	JSON.parse(localStorage['workout-timer-app']) :
// 	{}


if (uid) {
	asyncStore;
} else {
	const initialState = {}

	console.log(typeof initialState);
	console.log(initialState);


	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	let history = createHistory();
	const middleware = routerMiddleware(history);

	const store = createStore(
		mainReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(middleware)
		)
	);

	history = syncHistoryWithStore(history, store);

	const syncStateServerAndLocal = () => {
			const stringified = JSON.stringify(store.getState());
			base.database().ref(`users/${uid}/store`).set(stringified)
			localStorage.setItem('workout-timer-app', stringified);
		}

	const saveStateToLocal = () => {
		const stringified = JSON.stringify(store.getState());
	}

	if (localStorage['workout-timer-uid']) {
		console.log('Restoring state from page refresh!');
	 	const unsubscribeSyncId = store.subscribe(syncStateServerAndLocal); 
		setunsubscribeSyncId(unsubscribeSyncId);	
	}
}

module.exports = {
	store,
	history
}
