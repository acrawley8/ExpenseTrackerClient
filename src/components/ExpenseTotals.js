import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTotals } from '../actions';

class Totals extends Component {
    constructor({ month, year }) {
        super();
        this.state = { month, year }
    }
    componentDidMount() {
        this.props.fetchTotals(new Date().getMonth() + 1, new Date().getFullYear());
    }
    render() {
        return (
            <div className="row">
                <div className="card col s12">
                    <div className="card-content">
                        <div>
                            <div style={{ display: 'inline-block', width: '120px' }}>Total:</div>
                            <div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>
                                { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(this.props.totals.total) }
                            </div>                             
                        </div>
                        <div>
                            <div style={{ display: 'inline-block', width: '120px' }}>Remaining:</div>
                            <div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>
                                { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(this.props.totals.remaining) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ totals }) {
    return { totals };
}

export default connect(mapStateToProps, { fetchTotals })(Totals);