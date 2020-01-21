import React, { Component } from "react";
import { Button, Form, Segment, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import {
    combineValidators,
    composeValidators,
    isRequired,
    hasLengthGreaterThan
} from "revalidate";

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {};

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        initialValues: event
    };
};

const actions = {
    createEvent,
    updateEvent
};

const validate = combineValidators({
    title: isRequired({ message: "The event title is required" }),
    category: isRequired({ message: "The category is required" }),
    description: composeValidators(
        isRequired({ message: "Please enter a description" }),
        hasLengthGreaterThan(4)({
            message: "Description needs to be at least 5 characters"
        })
    )(),
    city: isRequired("city"),
    venue: isRequired("venue")
});

const category = [
    { key: "drinks", text: "Drinks", value: "drinks" },
    { key: "culture", text: "Culture", value: "culture" },
    { key: "film", text: "Film", value: "film" },
    { key: "food", text: "Food", value: "food" },
    { key: "music", text: "Music", value: "music" },
    { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
    onFormSubmit = values => {
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.push(`/events/${this.props.initialValues.id}`);
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoUrl: "/assets/user.png",
                hostedBy: "Bob"
            };
            this.props.createEvent(newEvent);
            this.props.history.push(`/events/${newEvent.id}`);
        }
    };

    render() {
        const {
            history,
            initialValues,
            invalid,
            submitting,
            pristine
        } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Event Details' />
                        <Form
                            onSubmit={this.props.handleSubmit(
                                this.onFormSubmit
                            )}
                            autoComplete='off'
                        >
                            <Field
                                name='title'
                                component={TextInput}
                                placeholder='Event Title'
                            />
                            <Field
                                name='category'
                                component={SelectInput}
                                options={category}
                                placeholder='Category'
                            />
                            <Field
                                name='description'
                                component={TextArea}
                                rows={3}
                                placeholder='Description'
                            />
                            <Header sub color='teal' content='Location' />
                            <Field
                                name='city'
                                component={TextInput}
                                placeholder='City'
                            />
                            <Field
                                name='venue'
                                component={TextInput}
                                placeholder='Venue'
                            />
                            <Field
                                name='date'
                                component={TextInput}
                                placeholder='Date'
                            />
                            <Button positive type='submit'>
                                Submit
                            </Button>
                            <Button
                                onClick={
                                    initialValues.id
                                        ? () =>
                                              history.push(
                                                  `/events/${initialValues.id}`
                                              )
                                        : () => history.push("/events")
                                }
                                type='button'
                                disabled={invalid || submitting || pristine}
                            >
                                Cancel
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
