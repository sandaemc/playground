import React, { Component, PropTypes } from 'react';
import CruiseFilter from './cruise-filter';
import RoomFilter from './room-filter';
import TourFilter from './tour-filter';
import DateRangeFilter from './date-range-filter';
import * as api from '../api';
import { actions } from '../state';
import { connect } from 'react-redux';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cruises: [],
            rooms: [],
            tours: [],
            cruiseId: 0,
            roomId: 0,
            tourId: 0,
            start: null,
            end: null
        };

        this.handleCruiseChange = this.handleCruiseChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleTourChange = this.handleTourChange.bind(this);
        this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    }

    componentDidMount() {
        api.getTourTypes()
            .then(tours => this.setState({ tours, tourId: tours[0].id }))
            .then(_ => api.getCruises().then(cruises => {
                const defaultCruiseId = cruises[0].id;
                return api.getRooms(defaultCruiseId)
                    .then(rooms => this.setState({
                        cruises,
                        cruiseId: defaultCruiseId,
                        rooms: rooms,
                        roomId: rooms[0].id
                    }, () => this.fetchPrices()));
            }));
    }

    handleCruiseChange(e) {
        const cruiseId = e.target.value;

        api.getRooms(cruiseId).then(rooms => this.setState({ 
            cruiseId,
            rooms, 
            roomId: rooms[0].id 
        }, () => this.fetchPrices()));
    }

    handleRoomChange(e) {
        this.setState({ roomId: e.target.value }, () => this.fetchPrices());
    }

    handleTourChange(e) {
        this.setState({ tourId: e.target.value }, () => this.fetchPrices());
    }

    handleDateRangeChange(kv) {
        this.setState(kv, () => this.fetchPrices());
    }

    fetchPrices() {
        this.props.dispatch(actions.fetchPrices({
            cruise_id: this.state.cruiseId,
            tour_type_id: this.state.tourId,
            room_id: this.state.roomId,
            start: this.state.start,
            end: this.state.end
        }));
    }

    render() {
        return (
            <div className="portlet light bg-inverse">
                <div className="portlet-title">
                    <div className="caption">
                        <i className="icon-settings"></i>
                        Price Control
                    </div>
                </div>

                <div className="portlet-body form" style={{ display: 'block' }}>
                    <form className="horizontal-form">
                        <div className="form-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="control-label">Cruise name</label>
                                        <CruiseFilter cruises={this.state.cruises} onChange={this.handleCruiseChange} value={this.state.cruiseId} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="control-label">Room name</label>
                                        <RoomFilter rooms={this.state.rooms} onChange={this.handleRoomChange} value={this.state.roomId} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="control-label">Tour length</label>
                                        <TourFilter tours={this.state.tours} onChange={this.handleTourChange} value={this.state.tourId} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="control-label">Date range from</label>
                                        <DateRangeFilter onChange={this.handleDateRangeChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
  }
}

export default connect(state => state)(Filter);