import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import TypeList from './TypeList';

class ExpenseForm extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    }
    componentDidMount = () => {
		var initProps = {};
        if(this.props.expense) {
            initProps = this.props.expense;
            initProps.date = Moment(initProps.date).format('MM-DD-YYYY');
        } else {
			initProps.date = formatDateValue(new Date());
		}
        this.props.initialize(initProps);

    }

    onDialogOpen = () => {
        this.setState({ open: true });
    }

    onDialogClose = () => {
        this.setState({ open: false });
    }

    renderFields = () => {
        return (
            <div>
                <Field key="value" name="value" label="Amount" type="number" component={renderTextField} />
                <Field key="type" name="type" label="Type" component={TypeList} onDialogOpen={ this.onDialogOpen } />
                <Field key="date" name="date" label="Date" component={renderDatePickerField} />
                <Field key="description" name="description" label="Description" component={renderTextField} />
            </div>
        );
    }

    render = () => {
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.props.onExpenseSubmit) }>
                    { this.renderFields() }
                    <Link style={{ marginTop: '20px', zIndex: "-1" }} to="/" className="btn waves-effect waves-light white-text left red">
                        Cancel
                        <i className="material-icons left">cancel</i>
                    </Link>
                    <button style={{ marginTop: '20px' }} className="btn waves-effect waves-light white-text right red" type="submit">
                        Submit
                        <i className="material-icons left">send</i>
                    </button>
                </form>
            </div>

        );
    }
}

const renderTextField = ({ input, label, type = "text", meta: { touched, error }}) => {
    return (
        <div>
            <label>{ label }</label>
            <input {...input} type={ type } autoComplete="off" />
            { touched && error && <span className="red-text">{ error }</span> }
        </div>
    );
};

const renderDatePickerField = ({ input, meta: { touched, error }}) => {
    return (
        <div>
            <DatePicker
                {...input}
                selected={ input.value ? new Date(Date.parse(input.value)) : new Date() }
                value={ input.value ? formatDateValue(input.value) : formatDateValue(new Date()) }
                placeholderText="Select a date"
                dateFormat="MM-dd-YYYY"
                autoComplete="off"
            />
            { touched && error && <div><span className="red-text">{ error }</span></div> }
        </div>
    );
};

const formatDateValue = (date) => {
    if(typeof date == 'string'){
        return date;
    }
    const parsedDate = Moment(date).toDate();
    return Moment(parsedDate).format('MM-DD-YYYY');
};

const validate = (values) => {
    const errors =  {};

    if(!values.value) {
        errors.value = 'Please specify an amount';
    }
    if(!values.type) {
        errors.type = 'Please select a type';
    }
    if(!values.date) {
        errors.date = 'Please specify a date';
    }

    return errors;
};

export default reduxForm({
    validate,
    form: 'expenseForm'
})(ExpenseForm);
