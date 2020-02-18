import React, { Fragment } from 'react';
import { Menu, Image, Dropdown, Button } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const SignedInMenu = ({ signOut, profile }) => {
	return (
		<Fragment>
			<Menu.Item as={NavLink} to='/people' name='People' />
			<Menu.Item as={NavLink} to='/test' name='Test' />
			<Menu.Item>
				<Button
					as={Link}
					to='/createEvent'
					floated='right'
					positive
					inverted
					content='Create Event'
				/>
			</Menu.Item>
			<Menu.Item position='right'>
				<Image avatar spaced='right' src={profile.photoURL || '/assets/user.png'} />
				<Dropdown pointing='top left' text={profile.displayName}>
					<Dropdown.Menu>
						<Dropdown.Item text='Create Event' icon='plus' />
						<Dropdown.Item text='My Events' icon='calendar' />
						<Dropdown.Item text='My Network' icon='users' />
						<Dropdown.Item text='My Profile' icon='user' />
						<Dropdown.Item
							as={Link}
							to='/settings'
							text='Settings'
							icon='settings'
						/>
						<Dropdown.Item
							onClick={signOut}
							text='Sign Out'
							icon='power'
						/>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		</Fragment>
	);
};

export default SignedInMenu;
