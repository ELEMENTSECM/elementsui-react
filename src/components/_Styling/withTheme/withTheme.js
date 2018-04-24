import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { loadTheme, AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import PropTypes from 'prop-types';

export default function withTheme(WrappedComponent, semanticColors) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			loadTheme({
				semanticColors
			});
		}

		render() {
			return (
				<Fabric>
					<WrappedComponent {...this.props} />
				</Fabric>
			);
		}
	};
}
