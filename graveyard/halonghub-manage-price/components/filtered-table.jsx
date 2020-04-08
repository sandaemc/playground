import React, { Component, PropTypes } from 'react';
import FilteredTableRow from './filtered-table-row';
import FilteredTableAutoFill from './filtered-table-autofill';
import { connect } from 'react-redux';
import { actions } from '../state';

class FilteredTable extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.onAutoFillSubmit(values);
    }

    render() {
        const { prices } = this.props;

        const probePrice = prices[0]; // grab the first price for manipulation

        if (this.props.progress.loading) {
            return <h3 className="text-center">Loading...</h3>;
        }

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th width="10%">Date</th>
                        <th width="8%">Day</th>
                        <th colSpan="2" className="text-center">Single</th>
                        <th colSpan="2" className="text-center">Double</th>
                        {probePrice && probePrice.hasOwnProperty('triple')
                            ? <th colSpan="2" className="text-center">3 Persons</th>
                            : null}
                        {probePrice && probePrice.hasOwnProperty('quadruple')
                            ? <th colSpan="2" className="text-center">4 Persons</th>
                            : null}
                        <th colSpan="2" className="text-center">Child</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Net Incl.</td>
                        <td>Sell Incl.</td>
                        <td>Net Incl.</td>
                        <td>Sell Incl.</td>
                        {probePrice && probePrice.hasOwnProperty('triple') ? <td>Net Incl.</td> : null}
                        {probePrice && probePrice.hasOwnProperty('triple') ? <td>Sell Incl.</td> : null}
                        {probePrice && probePrice.hasOwnProperty('quadruple') ? <td>Net Incl.</td> : null}
                        {probePrice && probePrice.hasOwnProperty('quadruple') ? <td>Sell Incl.</td> : null}
                        <td>Net Incl.</td>
                        <td>Sell Incl.</td>
                        <td></td>
                    </tr>
                    <FilteredTableAutoFill onSubmit={this.handleSubmit} />
                    {prices.map(p => <FilteredTableRow price={p} />)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="13">
                            <button 
                                className="btn btn-primary pull-right" 
                                disabled={this.props.dirtness.saved || this.props.dirtness.saving} 
                                onClick={this.props.onSaveChanges}>{this.props.dirtness.saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    onAutoFillSubmit: values => dispatch(actions.fillPrices(values)),
    onSaveChanges: () => dispatch(actions.saveChanges())
});

export default connect(mapStateToProps, mapDispatchToProps)(FilteredTable);
