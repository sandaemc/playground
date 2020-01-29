import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../state';
import * as _ from 'lodash';

class FilteredTableRow extends Component {
    constructor(props) {
        super(props);

        const { price } = this.props;

        this.state = {
            single_net: price.single.net,
            single_sell: price.single.sell,
            double_net: price.double.net,
            double_sell: price.double.sell,
            triple_net: price.hasOwnProperty("triple") ? price.triple.net : 0,
            triple_sell: price.hasOwnProperty("triple") ? price.triple.sell : 0,
            quadruple_net: price.hasOwnProperty("quadruple") ? price.quadruple.net : 0,
            quadruple_sell: price.hasOwnProperty("quadruple") ? price.quadruple.sell : 0,
            child_net: price.child.net,
            child_sell: price.child.sell
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { price } = nextProps;

        this.setState({
            single_net: price.single.net,
            single_sell: price.single.sell,
            double_net: price.double.net,
            double_sell: price.double.sell,
            triple_net: price.hasOwnProperty("triple") ? price.triple.net : 0,
            triple_sell: price.hasOwnProperty("triple") ? price.triple.sell : 0,
            quadruple_net: price.hasOwnProperty("quadruple") ? price.quadruple.net : 0,
            quadruple_sell: price.hasOwnProperty("quadruple") ? price.quadruple.sell : 0,
            child_net: price.child.net,
            child_sell: price.child.sell
        });
    }

    handleChange(e, price) {
        this.setState({ [e.target.name]: e.target.value });

        const [f, s] = _.split(e.target.name, '_');
        price[f][s] = e.target.value;
        this.props.onChange(price);
    }

    render() {
        const { price, onChange } = this.props; 

        return (
            <tr>
                <td>{price.date.display_value}</td>
                <td>{price.date.day}</td>
                <td>
                    <input
                        name="single_net"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.single_net} />
                </td>
                <td>
                    <input
                        name="single_sell"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.single_sell} />
                </td>
                <td>
                    <input
                        name="double_net"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.double_net} />
                </td>
                <td>
                    <input
                        name="double_sell"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.double_sell} />
                </td>
                {price.hasOwnProperty("triple")
                    ? <td>
                        <input
                            name="triple_net"
                            type="number"
                            min="0"
                            className="form-control input-sm"
                            onChange={e => this.handleChange(e, price)}
                            value={this.state.triple_net} />
                    </td>
                    : null}
                {price.hasOwnProperty("triple")
                    ? <td>
                        <input
                            name="triple_sell"
                            type="number"
                            min="0"
                            className="form-control input-sm"
                            onChange={e => this.handleChange(e, price)}
                            value={this.state.triple_sell} />
                    </td>
                    : null}
                {price.hasOwnProperty("quadruple")
                    ? <td>
                        <input
                            name="quadruple_net"
                            type="number"
                            min="0"
                            className="form-control input-sm"
                            onChange={e => this.handleChange(e, price)}
                            value={this.state.quadruple_net} />
                    </td>
                    : null}
                {price.hasOwnProperty("quadruple")
                    ? <td>
                        <input
                            name="quadruple_sell"
                            type="number"
                            min="0"
                            className="form-control input-sm"
                            onChange={e => this.handleChange(e, price)}
                            value={this.state.quadruple_sell} />
                    </td>
                    : null}
                <td>
                    <input
                        name="child_net"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.child_net} />
                </td>
                <td>
                    <input
                        name="child_sell"
                        type="number"
                        min="0"
                        className="form-control input-sm"
                        onChange={e => this.handleChange(e, price)}
                        value={this.state.child_sell} />
                </td>
            </tr>
        );
    }
}

FilteredTableRow.propTypes = {
    price: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    onChange: (updatedPrice) => {
        return dispatch(actions.updatePrice(updatedPrice));
    }
})

export default connect(state => state, mapDispatchToProps)(FilteredTableRow)