import React, { Component } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

class ExpenseEdit extends Component {
    async updateExpense(values) {
        try{
            await axios.post('/api/expense/' + values._id, values);
        } catch(error) {
            alert("Something bad happened! " + error);
        }
        this.props.history.push('/');
    }

    render() {
        return (         
            <div>   
                <h5 className="red-text">Edit expense</h5>
                <ExpenseForm onExpenseSubmit = { (values) => this.updateExpense(values) } expense={ this.props.location.state } />
            </div>
        );
    }
}

export default ExpenseEdit;