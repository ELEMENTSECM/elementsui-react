import * as React from "react";
import RichText from "elementsui-react/Inputs/RichText";

/** RichText default */

export default function RichTextDefault() {
	return <RichText onChange={e => console.log(e)} />;
}
