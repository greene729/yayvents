import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../EventForm/EventForm";

class EventDashboard extends Component {
    state = {
        // events: eventsFromDashboard,
        isOpen: false
    };

    handleIsOpenToggle = () => {
        this.setState(({isOpen}) => ({
            isOpen: !isOpen
        }));
    };

    handleCreateEvent = (newEvent) =>

    render() {
        const { events, isOpen } = this.state;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={events} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button
                        onClick={this.handleIsOpenToggle}
                        positive
                        content='Create Event'
                    />
                    {isOpen && (
                        <EventForm cancelFormOpen={this.handleIsOpenToggle} />
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventDashboard;
