import React, { Component, PropTypes} from 'react';

class CruiseFilter extends Component {
    render() {
        return (
            <select id="cruise-control" required className="form-control input-medium" {...this.props}>
                {this.props.cruises.map(cruise => <option value={cruise.id}>{cruise.name}</option>)}
            </select>
        );
    }
}

CruiseFilter.propTypes = {
    cruises: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CruiseFilter;