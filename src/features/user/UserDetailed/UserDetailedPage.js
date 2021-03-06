import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';
import { userDetailedQuery } from '../userQueries';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { getUserEvents, followUser, unfollowUser } from '../userActions';

const mapStateToProps = (state, ownProps) => {
	let userUid = null;
	let profile = {};

	if (ownProps.match.params.id === state.auth.uid) {
		profile = state.firebase.profile;
	} else {
		profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
		userUid = ownProps.match.params.id;
	}

	return {
		profile,
		userUid,
		events: state.events.userEvents,
		eventsLoading: state.async.loading,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		requesting: state.firestore.status.requesting,
		following: state.firestore.ordered.following
	};
};

const actions = {
	getUserEvents,
	followUser,
	unfollowUser,
};

class UserDetailedPage extends Component {
	async componentDidMount() {
		console.log(this.props.userUid);
		await this.props.getUserEvents(this.props.userUid);
	}

	changeTab = (e, data) => {
		this.props.getUserEvents(this.props.userUid, data.activeIndex);
	};

	render() {
		const {
			profile,
			photos,
			auth,
			match,
			requesting,
			events,
			eventsLoading,
			followUser,
			following,
			unfollowUser
		} = this.props;
		const isCurrentUser = auth.uid === match.params.id;
		const isFollowing = !isEmpty(following);
		const loading = Object.values(requesting).some((a) => a === true);
		if (loading) return <LoadingComponent />;
		return (
			<Grid>
				<UserDetailedHeader profile={profile} />
				<UserDetailedDescription profile={profile} />
				<UserDetailedSidebar
					profile={profile}
					followUser={followUser}
					unfollowUser={unfollowUser}
					isCurrentUser={isCurrentUser}
					isFollowing={isFollowing}
				/>
				{photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
				<UserDetailedEvents
					events={events}
					eventsLoading={eventsLoading}
					changeTab={this.changeTab}
				/>
			</Grid>
		);
	}
}

export default compose(
	connect(mapStateToProps, actions),
	firestoreConnect((auth, userUid, match) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
