import React, { Component } from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

class EventListItem extends Component {
    render() {
        const { event, selectEvent } = this.props;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                size='tiny'
                                circular
                                src='https://randomuser.me/api/portraits/women/42.jpg'
                            />
                            <Item.Content>
                                <Item.Header>Event Title</Item.Header>
                                <Item.Description>
                                    Hosted by hosted by
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock' /> date |
                        <Icon name='marker' /> time
                    </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {event.attendees &&
                            event.attendees.map(attendee => (
                                <EventListAttendee
                                    key={attendee.id}
                                    attendee={attendee}
                                />
                            ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <span>Description will go here</span>
                    <Button
                        onClick={() => selectEvent(event)}
                        as='a'
                        color='teal'
                        floated='right'
                        content='View'
                    />
                </Segment>
            </Segment.Group>
        );
    }
}

export default EventListItem;
