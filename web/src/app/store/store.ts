import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import reducer from '../store/reducers/reducer';

export const store
    = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export const dispatch = store.dispatch;
export default store;