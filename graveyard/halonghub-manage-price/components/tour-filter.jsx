import React, { Component, PropTypes } from 'react';

class TourFilter extends Component {
    render() {
        return (
            <select id="tour-control" className="form-control input-small" {...this.props}>
                {this.props.tours.map(tour => <option value={tour.id}>{tour.short_name}</option>)}
            </select>
        );
    }
}

TourFilter.propTypes = {
    tour: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TourFilter;
