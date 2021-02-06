import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { dispatchType, UserAction, UserState } from '../../../interfaces';


import * as reducer from '../store/reducers/reducer';

export const store: Store<UserState, UserAction> & {
    dispatch: dispatchType
} = createStore(reducer.reducer, applyMiddleware(reducer.reducerMiddleware));

export const dispatch = store.dispatch;

export default store;