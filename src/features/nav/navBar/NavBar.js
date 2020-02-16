import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

const actions = {
	openModal,
	logout,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

class NavBar extends Component {
	handleSignIn = () => {
		this.props.openModal('LoginModal');
	};

	handleSignOut = () => {
		this.props.logout();
		this.props.history.push('/');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	render() {
		const { auth } = this.props;
		const authenticated = auth.authenticated;
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
							signOut={this.handleSignOut}
							currentUser={auth.currentUser}
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

export default withRouter(connect(mapStateToProps, actions)(NavBar));
