import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAggregate } from '../actions';

class Aggregate extends Component {
  constructor({ month, year }) {
      super();
      this.state = { month, year, open: false }
  }

  componentDidMount() {
      this.props.fetchAggregate(new Date().getMonth() + 1, new Date().getFullYear());
  }

  openClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  renderAggregates = () => {
    if(this.props.aggregate && this.props.aggregate.length > 0) {
      return this.props.aggregate.map((aggr) => {
        return (
          <div className="col card s12 m4 l3" key={aggr._id}>
            <span>{aggr._id}</span>
            <span className="secondary-content red-text">
              { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(aggr.total) }
            </span>
          </div>
        );
      });
    } else {
      return '';
    }
  }

  render () {
    return (
      <div className="">
        <div id="aggregateOpenClose" className="small icon btn-flat" onClick={this.openClose}>
          <i className="material-icons left">
            { this.state.open ? 'expand_more' : 'expand_less' }
          </i>
        </div>
        <div className={ this.state.open ? '' : 'hide' }>
          { this.renderAggregates() }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ aggregate }) {
    return { aggregate };
}

export default connect(mapStateToProps, { fetchAggregate })(Aggregate);
