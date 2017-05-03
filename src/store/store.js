import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { userUid as uid } from '../components/ui/Login'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// need to grab state from uid (once logged in...
// pass it in from login function?
//

const initialState = base.database().ref(`users/${uid}/store`) ?
		base.database().ref(`users/${uid}/store`) :
		{}

console.log({initialState});


// const initialState = (localStorage["redux-timer-store"]) ?
//     JSON.parse(localStorage["redux-timer-store"]) :
//     {}

let history = createHistory();
let middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		app: mainReducer,
		routing: routerReducer
	}),
	initialState,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);

history = syncHistoryWithStore(history, store);

// const saveState = () => 
//     localStorage["redux-timer-store"] = JSON.stringify(store.getState())

const saveState = () =>{
		if (uid !== "") {
    	base.database().ref(`users/${uid}/store`).set(JSON.stringify(store.getState()))
        console.log({uid});
     }
  }

store.subscribe(saveState);

module.exports = {
	store,
	history
}
