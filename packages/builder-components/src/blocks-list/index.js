/* eslint-disable no-shadow */
/**
 * Internal Dependencies
 */
import Droppable from '../droppable';
import Draggable from '../draggable';
import BlocksListItem from '../blocks-list-item';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * External Dependencies
 */
import classnames from 'classnames';

const BlocksList = () => {
	const blocks = useSelect( ( select ) =>
		select( 'quillForms/blocks' ).getBlockTypes()
	);

	const welcomeScreensLength = useSelect( ( select ) =>
		select( 'quillForms/block-editor' ).getWelcomeScreensLength()
	);

	return (
		<div className="builder-components-blocks-list">
			<Droppable
				droppableId="BLOCKS_LIST"
				isDropDisabled={ true }
				style={ { overflowY: 'auto' } }
			>
				{ ( provided, snapshot ) => (
					<div
						ref={ provided.innerRef }
						isDraggingOver={ snapshot.isDraggingOver }
					>
						{ Object.keys( blocks ).map( ( type, index ) => {
							let isDragDisabled = false;
							if (
								type === 'welcome-screen' &&
								welcomeScreensLength >= 1
							) {
								isDragDisabled = true;
							}
							return (
								<div
									key={ blocks[ type ].id }
									style={ { marginBottom: '20px' } }
								>
									<Draggable
										isDragDisabled={
											isDragDisabled ? true : false
										}
										draggableId={ blocks[ type ].id }
										index={ index }
									>
										{ ( provided, snapshot ) => (
											<Fragment>
												<div
													className={ classnames(
														'builder-components-blocks-list__item-wrapper',
														{
															'is-dragging': snapshot.isDragging
																? true
																: false,
														}
													) }
													{ ...provided.draggableProps }
													{ ...provided.dragHandleProps }
													ref={ provided.innerRef }
													isDragging={
														snapshot.isDragging
													}
													style={ {
														...provided
															.draggableProps
															.style,
													} }
												>
													<BlocksListItem
														item={ blocks[ type ] }
														disabled={
															isDragDisabled
														}
													/>
												</div>
												{ snapshot.isDragging && (
													<div
														className={ classnames(
															'builder-components-blocks-list__item-wrapper'
														) }
													>
														<BlocksListItem
															item={
																blocks[ type ]
															}
															disabled={
																isDragDisabled
															}
														/>
													</div>
												) }
											</Fragment>
										) }
									</Draggable>
								</div>
							);
						} ) }
						{ provided.placeholder }
					</div>
				) }
			</Droppable>
		</div>
	);
};

export default BlocksList;
