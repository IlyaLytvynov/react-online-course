import React from 'react';
import { GridItem } from './GridItem';
import { Photo } from '../../models';
import { v4 as uuid } from 'uuid';
import classes from './Grid.scss';

interface Props {
	images: Array<Photo>;
}

class Grid extends React.PureComponent<Props> {
	public render() {
		const { images } = this.props;
		return <div className={classes.grid}>
			<div className={classes.content}>
				{
					images.map(item => {
						const { description, urls, likes, id } = item;
						return <GridItem
							key={uuid()}
							className={'grid__item'}
							id={id}
							description={description}
							url={urls.small}
							likes={likes} />;
					})
				}
			</div>
		</div>;
	}
}

export { Grid };
