import axios from 'axios';
import { FETCH_EXPENSES, FETCH_TOTALS, FETCH_TYPES } from './types';

export const fetchExpenses = (month, year, sort) => async (dispatch) => {
    const expenseList = await axios.get('/api/expense/' + month + '/' + year, { params: { sortBy: sort }});
	
    dispatch({
        type: FETCH_EXPENSES,
        payload: expenseList.data
    });
};

export const deleteExpense = (expenseId) => async (dispatch) => {
	if(expenseId) {
		await axios.delete('/api/expense/' + expenseId);
	} else {
		console.log("No ID supplied to deleteExpense. Doing nothing");
	}
};

export const fetchTotals = (month, year) => async (dispatch) => {
    const expenseTotals = await axios.get('/api/expense/totals/' + month + '/' + year);

    dispatch({
        type: FETCH_TOTALS,
        payload: expenseTotals.data
    });
};

export const fetchTypes = () => async (dispatch) => {
    const expenseTypes = await axios.get('/api/types');

    dispatch({
        type: FETCH_TYPES,
        payload: expenseTypes.data
    })
};

export const addType = (name) => async (dispatch) => {
    if(name) {
        await axios.put('/api/types', { name });
    } else {
        console.log("No type name supplied to addType. Doing nothing");
    }
};