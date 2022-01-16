/**
 * QuillForms Dependencies
 */
import { getDefaultThemeProperties } from '@quillforms/utils';

/**
 * Internal Dependencies
 */
import useFormContext from './use-form-context';
import useCurrentBlock from './use-current-block';

const useTheme = () => {
	const {
		formObj: { theme, themesList },
	} = useFormContext();
	console.log( theme, themesList );
	const currentBlock = useCurrentBlock();
	let appliedThemeId = theme;
	if ( currentBlock?.attributes?.theme ) {
		appliedThemeId = currentBlock.attributes.theme;
	}

	let appliedTheme = themesList.find(
		( $theme ) => $theme.id === appliedThemeId
	)?.properties;
	if ( ! appliedTheme ) {
		appliedTheme = {};
	}
	return {
		...getDefaultThemeProperties(),
		...appliedTheme,
	};
};

export default useTheme;
