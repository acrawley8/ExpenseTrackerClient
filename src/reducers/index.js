 import { combineReducers } from 'redux';
 import expenseReducer from './expenseReducer';
 import totalsReducer from './totalsReducer';
 import aggregateReducer from './aggregateReducer';
 import typesReducer from './typesReducer';
 import { reducer as formReducer } from 'redux-form';

 export default combineReducers({
    expense: expenseReducer,
    totals: totalsReducer,
    form: formReducer,
    types: typesReducer,
    aggregate: aggregateReducer
 });
