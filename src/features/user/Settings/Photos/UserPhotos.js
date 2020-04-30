import React, { Fragment } from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

export const UserPhotos = ({ photos, profile, deletePhoto, setMainPhoto }) => {
    let filteredPhotos;
    if (photos) {
        filteredPhotos = photos.filter(photo => {
            return photo.url !== profile.photoURL
        })
	}
	
	const style = {objectFit: 'scale-down'}
	return (
		<Fragment>
			<Header sub color='teal' content='All Photos' />

			<Card.Group itemsPerRow={5}>
				<Card>
					<Image size='medium' src={profile.photoURL || '/assets/user.png'} />
					<Button positive>Main Photo</Button>
				</Card>
				{photos &&
					filteredPhotos.map(photo => (
						<Card key={photo.id}>
							<Image size='medium' src={photo.url} style={style} />
							<div className='ui two buttons'>
								<Button onClick={() => setMainPhoto(photo)} basic color='green'>
									Main
								</Button>
								<Button onClick={() => deletePhoto(photo)} basic icon='trash' color='red' />
							</div>
						</Card>
					))}
			</Card.Group>
		</Fragment>
	);
};
