import React, { Fragment } from 'react';
import { Segment, Header } from 'semantic-ui-react';

export const EventActivity = () => {
	return (
		<Fragment>
			<Header attached='top' content='Recent Activity' />
			<Segment attached>
				<p>Recent activity</p>
			</Segment>
		</Fragment>
	);
};
