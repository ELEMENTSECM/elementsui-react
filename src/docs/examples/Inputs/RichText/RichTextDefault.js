import * as React from "react";
import RichText from "elementsui-react/Inputs/RichText";

/** RichText default */
export default function RichTextDefault() {
	return (
		<RichText
			events={{
				change: e => console.log(e)
			}}
		/>
	);
}
