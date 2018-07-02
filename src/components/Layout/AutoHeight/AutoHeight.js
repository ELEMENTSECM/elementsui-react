import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './AutoHeight.styles';

export class AutoHeight extends React.Component {

	rootRef = React.createRef();
	$root;
	$container;

	constructor(props) {
		super(props);
		this.state = { height: `${this.props.heightRelativeToParent}%`, padding: `${this.props.padding}px` };
	}

	componentDidMount() {
		this.$root = $(this.rootRef.current);
		this.$container = this.$root.closest(this.props.containerSelector);
		if (this.$container) {
			$(window).on("resize.AutoHeight", this.resize);
			$(window.document).on("shown.bs.collapse hidden.bs.collapse", this.resize);
			this.resize();
		}
	}

	componentWillUnmount() {
		$(window).off("resize.AutoHeight", this.resize);
		$(window.document).off("shown.bs.collapse hidden.bs.collapse", this.resize);
	}

	render() {
		return (
			<div ref={this.rootRef} style={this.state}>
				{this.props.children}
			</div>
		);
	}

	resize = () => {
		const totalHeight =
			this.$container.height() -
			(this.$root.offset().top - this.$container.offset().top) -
			this.props.padding;
		const heightPx = (totalHeight * this.props.heightRelativeToParent) / 100;
		this.setState({ ...this.state, height: `${heightPx}px` });
		this.$root.triggerHandler("resize");
	};

}

AutoHeight.defaultProps = {
	containerSelector: "body",
	padding: 0,
	heightRelativeToParent: 100
};

AutoHeight.propTypes = {
		/** CSS selector for component's container element up in the DOM tree */
		containerSelector: PropTypes.string,
		/** Padding for component */
		padding: PropTypes.number,
		/** % of container's height to force on the component */
		heightRelativeToParent: PropTypes.number
};

export default AutoHeight;