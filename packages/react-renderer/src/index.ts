import '@quillforms/renderer-core/build-style/style.css';
import { register } from '@wordpress/data';
import { store as blocksStore } from '@quillforms/blocks';
import { store as rendererStore } from '@quillforms/renderer-core';

register( blocksStore );
register( rendererStore );

export { default as registerCoreBlocks } from './register-blocks';
export { Form } from '@quillforms/renderer-core';
