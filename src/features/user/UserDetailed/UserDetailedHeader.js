import React from 'react';
import differenceInYears from 'date-fns/differenceInYears';
import { Segment, Item, Header } from 'semantic-ui-react';

const UserDetailedHeader = ({ profile }) => {
	let age;
	if (profile.dateOfBirth) {
		age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
	} else {
		age = '';
	}

	return (
		<Segment>
			<Item.Group>
				<Item>
					<Item.Image
						avatar
						size='small'
						src='https://randomuser.me/api/portraits/men/20.jpg'
					/>
					<Item.Content verticalAlign='bottom'>
						<Header as='h1'>First Name</Header>
						<br />
						<Header as='h3'>Occupation</Header>
						<br />
						<Header as='h3'>${age}, Lives in London, UK</Header>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
	);
};

export default UserDetailedHeader;
