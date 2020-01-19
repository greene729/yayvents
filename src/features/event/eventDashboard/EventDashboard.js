import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashboard = [
    {
        id: "1",
        title: "Trip to Tower of London",
        date: "2018-03-27",
        category: "culture",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
        city: "London, UK",
        venue: "Tower of London, St Katharine's & Wapping, London",
        hostedBy: "Bob",
        hostPhotoUrl: "https://randomuser.me/api/portraits/men/20.jpg",
        attendees: [
            {
                id: "a",
                name: "Bob",
                photoUrl: "https://randomuser.me/api/portraits/men/20.jpg"
            },
            {
                id: "b",
                name: "Tom",
                photoUrl: "https://randomuser.me/api/portraits/men/22.jpg"
            }
        ]
    },
    {
        id: "2",
        title: "Trip to Punch and Judy Pub",
        date: "2018-03-28",
        category: "drinks",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
        city: "London, UK",
        venue: "Punch & Judy, Henrietta Street, London, UK",
        hostedBy: "Tom",
        hostPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
        attendees: [
            {
                id: "b",
                name: "Tom",
                photoUrl: "https://randomuser.me/api/portraits/men/22.jpg"
            },
            {
                id: "a",
                name: "Bob",
                photoUrl: "https://randomuser.me/api/portraits/men/20.jpg"
            }
        ]
    }
];

class EventDashboard extends Component {
    state = {
        events: eventsFromDashboard,
        isOpen: false,
        selectedEvent: null
    };

    // handleIsOpenToggle = () => {
    //     this.setState(({ isOpen }) => ({
    //         isOpen: !isOpen
    //     }));
    // };

    handleFormOpen = () => {
        this.setState({
            isOpen: true,
            selectedEvent: null
        });
    };

    handleFormCancel = () => {
        this.setState({
            isOpen: false
        });
    };

    handleCreateEvent = newEvent => {
        newEvent.id = cuid();
        newEvent.hostPhotoUrl = "/assets/user.png";
        this.setState(({ events }) => ({
            events: [...events, newEvent]
        }));
    };

    handleSelectEvent = event => {
        this.setState({
            selectedEvent: event,
            isOpen: true
        });
    };

    handleUpdateEvent = updatedEvent => {
        this.setState(({ events }) => ({
            events: events.map(event => {
                if (event.id === updatedEvent.id) {
                    return { ...updatedEvent };
                } else {
                    return event;
                }
            }),
            isOpen: false,
            selectedEvent: null
        }));
    };

    handleDeleteEvent = id => {
        this.setState(({ events }) => ({
            events: events.filter(e => e.id !== id)
        }));
    };

    render() {
        const { events, isOpen, selectedEvent } = this.state;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        events={events}
                        selectEvent={this.handleSelectEvent}
                        deleteEvent={this.handleDeleteEvent}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button
                        onClick={this.handleFormOpen}
                        positive
                        content='Create Event'
                    />
                    {isOpen && (
                        <EventForm
                            key={selectedEvent ? selectedEvent.id : 0}
                            updateEvent={this.handleUpdateEvent}
                            selectedEvent={selectedEvent}
                            createEvent={this.handleCreateEvent}
                            cancelFormOpen={this.handleFormCancel}
                        />
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventDashboard;
