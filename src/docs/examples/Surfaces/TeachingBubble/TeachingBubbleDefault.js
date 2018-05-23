import * as React from 'react';
import TeachingBubble from 'elementsui-react/Surfaces/TeachingBubble';
import Button from 'elementsui-react/Inputs/Button';

/**Default TeachingBubble */
export default class TeachingBubbleDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isTeachingBubbleVisible: false, dismissed: true, label: 'Show bubble?' };
	}

	toggleTeachingBubble = () => {
		this.setState(() => ({
			isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible,
			dismissed: !this.state.dismissed,
			label: !this.state.isTeachingBubbleVisible ? 'Bubble visible :)' : 'Show bubble?'
		}));
	};

	render() {
		return (
			<div>
				<span ref={menuButton => (this._menuButtonTarget = menuButton)}>
					<Button
						htmlId="defaultButton"
						label={this.state.label}
						onClick={this.toggleTeachingBubble}
						isPrimary={true}
					/>
				</span>
				{this.state.isTeachingBubbleVisible ? (
					<TeachingBubble
						htmlid="defaultTeachingBubble"
						headline="TeachingBubble"
						targetElement={this._menuButtonTarget}
						dismissed={this.state.dismissed}>
						<span>
							<span>I am a teachingbubble!</span>
							<br />
							<br />
							<span>
								<Button label="Ok" isPrimary={true} onClick={this.toggleTeachingBubble} />
								<Button label="Cancel" onClick={this.toggleTeachingBubble} />
							</span>
						</span>
					</TeachingBubble>
				) : null}
			</div>
		);
	}
}
