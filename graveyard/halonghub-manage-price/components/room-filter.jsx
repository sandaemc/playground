import React, { Component, PropTypes } from 'react';

class RoomFilter extends Component {
    render() {
        return (
            <select id="room-control" required className="form-control input-small" {...this.props}>
                {this.props.rooms.map(room => <option value={room.id}>{room.name}</option>)}
            </select>
        );
    }
}

RoomFilter.propTypes = {
    rooms: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RoomFilter;