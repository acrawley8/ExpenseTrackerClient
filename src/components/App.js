import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './Home';
import ExpenseNew from './expense/ExpenseNew';
import ExpenseEdit from './expense/ExpenseEdit';

class App extends Component {    
    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <Route path="/" exact component={Home} />
                    <Route path="/expense/new" component={ExpenseNew} />
                    <Route path="/expense/edit" component={ExpenseEdit} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);