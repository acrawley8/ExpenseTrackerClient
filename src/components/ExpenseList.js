import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExpenses, fetchTotals, deleteExpense } from '../actions';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import ExpenseTotals from './ExpenseTotals';

class ExpenseList extends Component {
    constructor() {
        super();
		this.sortSelect = React.createRef();
		this.filterSelect = React.createRef();
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
			sort: 'date asc',
            loading: false
        };
    }

    componentDidMount = () => {
        this.props.fetchExpenses(this.state.month, this.state.year, this.state.sort);
    }

    formatDate = (date) => {
        const parsedDate = new Date(Date.parse(date));
        return parsedDate.toDateString();
    }

    onDeleteExpense = async (id) => {
        await this.props.deleteExpense(id);
        this.refresh(true);
    }

    nextMonth = async () => {
        var updatedMonth = -1;
        var updatedYear = this.state.year;
        if(this.state.month === 12){
            updatedMonth = 1;
            updatedYear = this.state.year + 1;
        } else {
            updatedMonth = this.state.month + 1;
        }
        await this.setState({
            month: updatedMonth,
            year: updatedYear,
            loading: true
        });
        this.refresh(true);
    }

    previousMonth = async () => {
        var updatedMonth = -1;
        var updatedYear = this.state.year;
        if(this.state.month === 1){
            updatedMonth = 12;
            updatedYear = this.state.year - 1;
        } else {
            updatedMonth = this.state.month - 1;
        }

        await this.setState({
            month: updatedMonth,
            year: updatedYear,
            loading: true
        });
        this.refresh(true);
    }

	/**
	  * Responds to sort selection events by the user. Causes the expense
	  * list to be refreshed.
	  *
	  */
	sort = async () => {
		const sortBy = this.sortSelect.current.value;
		await this.setState({
			sort: sortBy,
			loading: true
		});
		this.refresh(false);
	}

	/*
	 * Causes this component to refresh its data from the server (expense list and totals).
	 *
     * @param refreshTotals - Whether or not to refresh the totals area
	 *
	 */
    refresh = async (refreshTotals) => {
		if(refreshTotals) {
			await Promise.all([
				this.props.fetchExpenses(this.state.month, this.state.year, this.state.sort),
				this.props.fetchTotals(this.state.month, this.state.year)
			]);
		} else {
			this.props.fetchExpenses(this.state.month, this.state.year, this.state.sort);
		}
        this.setState({ loading: false });
    }

    renderExpenses = () => {
		if(this.props.expense.expenses) {
			return this.props.expense.expenses.map((expense) => {
				return (
					<div className="card col s6 m4 l2" key={ expense._id }>
						<div className="card-content">
							<span className="card-title">{ expense.type }</span>
							<p>{ this.formatDate(expense.date) }</p>
							<p>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(expense.value) }</p>
							<p style={{ height: '100px', overflow: 'auto' }}>{ expense.description }</p>
						</div>
						<div className="card-action">
							<button className="btn-floating red right" style={{ marginLeft: "10px"}}
								onClick={ () => this.onDeleteExpense(expense._id) }
							>
								<i className="material-icons right">delete</i>
							</button>
							<Link to={ { pathname: "/expense/edit", state: expense }} className="btn-floating red right">
								<i className="material-icons right">edit</i>
							</Link>
						</div>
					</div>
				);
			});
		} else {
			return "";
		}
    }
    render =() => {
        return (
            <div>
                <div className="row">
                    <button className="btn red left" onClick={ this.previousMonth }>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                    <button className="btn red right" onClick={ this.nextMonth }>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                    <h5 className="red-text center">{ Moment(new Date("" + this.state.month + "/01/" + this.state.year)).format('MMMM') }, { this.state.year }</h5>
                </div>
                { this.state.loading ? <div className="progress"><div className="indeterminate"></div></div> : null }
                <div className={ this.state.loading ? 'hide' : ''}>
					<div className="row">
						<ExpenseTotals month={ this.state.month } year={ this.state.year } />
						<div className="input-field col s6 m4 l3">
							<select style={{ display: 'block' }} value={ this.state.sort } ref={ this.sortSelect } onChange={ this.sort }>
								<option value="date asc">Date (oldest first)</option>
								<option value="date desc">Date (newest first)</option>
								<option value="value asc">Value (low to high)</option>
								<option value="value desc">Value (high to low)</option>
							</select>
						</div>
					</div>
                    <div className="row">
                        { this.renderExpenses() }
                        <div className="fixed-action-btn">
                            <Link to="/expense/new" className="btn-floating btn-large red right">
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ expense }) {
    return { expense };
}

export default connect(mapStateToProps, { fetchExpenses, fetchTotals, deleteExpense })(ExpenseList);
