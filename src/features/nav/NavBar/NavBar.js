import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
	openModal,
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

class NavBar extends Component {
	handleSignIn = () => {
		this.props.openModal('LoginModal');
	};

	handleSignOut = () => {
		this.props.firebase.logout();
		this.props.history.push('/');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	render() {
		const { auth, profile } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item as={NavLink} exact to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Yay!-vents
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Events' />
					{authenticated ? (
						<SignedInMenu
							auth={auth}
							signOut={this.handleSignOut}
							profile={profile}
						/>
					) : (
						<SignedOutMenu
							signIn={this.handleSignIn}
							register={this.handleRegister}
						/>
					)}
				</Container>
			</Menu>
		);
	}
}

export default withRouter(
	withFirebase(connect(mapStateToProps, actions)(NavBar))
);
