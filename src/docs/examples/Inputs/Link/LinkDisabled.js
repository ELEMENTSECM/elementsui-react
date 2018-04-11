import * as React from 'react';
import { Link } from 'elementsui-react';

/**Disabled Link */
export default function LinkDisabled() {
	return <Link htmlId="linkDisabled" label="Disabled link" disabled href="https://evry.com" />;
}