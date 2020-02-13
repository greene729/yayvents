import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
	openModal,
};

class NavBar extends Component {
	state = {
		authenticated: false,
	};

	handleSignIn = () => {
		this.props.openModal('LoginModal');
	};

	handleSignOut = () => {
		this.setState({ authenticated: false });
		this.props.history.push('/');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	render() {
		const { authenticated } = this.state;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item as={NavLink} exact to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Yay!-vents
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Events' />
					<Menu.Item as={NavLink} to='/people' name='People' />
					<Menu.Item as={NavLink} to='/test' name='Test' />
					{authenticated ? (
						<SignedInMenu signOut={this.handleSignOut} />
					) : (
						<SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
					)}
				</Container>
			</Menu>
		);
	}
}

export default withRouter(connect(null, actions)(NavBar));
