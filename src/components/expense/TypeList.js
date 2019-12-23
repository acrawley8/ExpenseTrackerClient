import React, { Component } from 'react';
import { connect } from 'react-redux';
import Materialize from 'materialize-css/dist/js/materialize.min';
import { fetchTypes, addType } from '../../actions';
import _ from 'lodash';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

class TypeList extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    componentDidMount = () => {
        this.props.fetchTypes();
    }
    
    componentDidUpdate = () => {
        Materialize.AutoInit();
    }

    onDialogOpen = () => {
        this.setState({
            open: true
        });
    }

    onDialogClose = () => {
        this.setState({
            open: false
        });
    }

    onAddType = async () => {
        const typeName = document.getElementById('typeName').value;
        
        if(typeName) {
            await this.props.addType(typeName);
            this.props.fetchTypes();
        }
        this.setState({ open: false });
    }

    renderAddTypeForm = () => {
        return (
            <Dialog 
                open={ this.state.open }
            >
                <DialogTitle>Add Type</DialogTitle>
                <DialogContent>
                    <input type="text" id="typeName" autoComplete="off" />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ this.onDialogClose }
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={ this.onAddType }
                    >
                        Add                        
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderOptions = () => {
        return _.map(this.props.types, ({ name }) => {
            return <option key={ name } value={ name }>{ name }</option>
        });
    }

    render = () => {
        return (      
            <div>
                { this.renderAddTypeForm() }
                <div className="row">  
                    <div style={{ padding: "0" }} className="input-field col s3"> 
                        <select {...this.props.input}>
                            <option value="">Select a type</option>
                            { this.renderOptions() }
                        </select>                    
                        { this.props.meta.touched && this.props.meta.error && <div><span className="red-text">{ this.props.meta.error }</span></div> }                    
                    </div>    
                    <button style={{ position: 'relative', top: '25px', left: '20px' }} className="btn left red" onClick={ this.onDialogOpen } type="button">
                        Add type
                        <i className="material-icons left">add</i>
                    </button>    
                </div>
            </div>
        );
    }
}

function mapStateToProps({ types }) {
    return { types };
}

export default connect(mapStateToProps, { fetchTypes, addType })(TypeList);