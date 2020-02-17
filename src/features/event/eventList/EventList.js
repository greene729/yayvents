import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
    render() {
        const { events, deleteEvent } = this.props;
        return (
            <Fragment>
                <h1>Event List</h1>
                {events && events.map(event => (
                    <EventListItem
                        key={event.id}
                        event={event}
                        deleteEvent={deleteEvent}
                    />
                ))}
            </Fragment>
        );
    }
}

export default EventList;
