import React, { Component, PropTypes } from 'react';

class DateRangeFilter extends Component {
    componentDidMount() {
        const dateRange = $('#date-range-filter');
        const { onChange } = this.props;

        dateRange.datepicker();
        dateRange.on('changeDate', e => {
            onChange({ [e.target.name]: e.target.value });
        });
    }

    render() {
        return (
			<div className="input-group input-daterange date" id="date-range-filter">
                <input name="start" type="text" className="form-control" data-date-format="yyyy-mm-dd" />
				<span className="input-group-addon">to</span>
				<input name="end" type="text" className="form-control" data-date-format="yyyy-mm-dd" />
			</div>
        );
    }
}

DateRangeFilter.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default DateRangeFilter;