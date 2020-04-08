import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';

class FilteredTableAutoFill extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            single_net: 0,
            single_sell: 0,
            double_net: 0,
            double_sell: 0,
            triple_net: 0,
            triple_sell: 0,
            quadruple_net: 0,
            quadruple_sell: 0,
            child_net: 0,
            child_sell: 0
        };
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        this.props.onSubmit(this.state);
        this.setState({
            single_net: 0,
            single_sell: 0,
            double_net: 0,
            double_sell: 0,
            triple_net: 0,
            triple_sell: 0,
            quadruple_net: 0,
            quadruple_sell: 0,
            child_net: 0,
            child_sell: 0
        })
    }

    render() {
        const { prices } = this.props;

        return (
            <tr>
                <td></td>
                <td></td>   
                <td><input onChange={this.onChange} value={this.state.single_net} name="single_net" type="number" min="0" className="form-control input-sm" /></td>
                <td><input onChange={this.onChange} value={this.state.single_sell} name="single_sell" type="number" min="0" className="form-control input-sm" /></td>
                <td><input onChange={this.onChange} value={this.state.double_net} name="double_net" type="number" min="0" className="form-control input-sm" /></td>
                <td><input onChange={this.onChange} value={this.state.double_sell} name="double_sell" type="number" min="0" className="form-control input-sm" /></td>
                {prices && prices.length && prices[0].hasOwnProperty("triple")
                    ? <td><input onChange={this.onChange} value={this.state.triple_net} name="triple_net" type="number" className="form-control input-sm" /></td>
                    : null}
                {prices && prices.length && prices[0].hasOwnProperty("triple")
                    ? <td><input onChange={this.onChange} value={this.state.triple_sell} name="triple_sell" type="number" className="form-control input-sm" /></td>
                    : null}
                {prices && prices.length && prices[0].hasOwnProperty("quadruple")
                    ? <td><input onChange={this.onChange} value={this.state.quadruple_net} name="quadruple_net" type="number" className="form-control input-sm" /></td>
                    : null}
                {prices && prices.length && prices[0].hasOwnProperty("quadruple")
                    ? <td><input onChange={this.onChange} value={this.state.quadruple_sell} name="quadruple_sell" type="number" className="form-control input-sm" /></td>
                    : null}
                <td><input onChange={this.onChange} value={this.state.child_net} name="child_net" type="number" className="form-control input-sm" /></td>
                <td><input onChange={this.onChange} value={this.state.child_sell} name="child_sell" type="number" className="form-control input-sm" /></td>
                <td><button className="btn" onClick={this.handleSubmit}>Auto Fill</button></td>
            </tr>
        );
    }
}

FilteredTableAutoFill.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default connect(state => state)(FilteredTableAutoFill);
