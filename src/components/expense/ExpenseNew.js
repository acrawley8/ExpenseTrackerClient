import React, { Component } from 'react';
import axios from 'axios';
import { reduxForm } from 'redux-form';
import ExpenseForm from './ExpenseForm';

class ExpenseNew extends Component {
    async submitExpense(values) {
        try{
            await axios.put('/api/expense', values);
        } catch(error) {
            alert("Something bad happened! " + error);
        }
        this.props.history.push('/');
    }

    render () {
        return (
            <div>
                <h5 className="red-text">Create a new expense</h5>
                <ExpenseForm onExpenseSubmit = { (values) => this.submitExpense(values) } />
            </div>
        );
    }
};

export default reduxForm({
    form: 'expenseForm'
})(ExpenseNew)