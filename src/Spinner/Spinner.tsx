import * as React from "react";
import styled from "styled-components";

const spinnerMap = {
	fade: React.lazy(() => import("react-spinners/FadeLoader")),
	clip: React.lazy(() => import("react-spinners/ClipLoader")),
	bar: React.lazy(() => import("react-spinners/BarLoader")),
	sync: React.lazy(() => import("react-spinners/SyncLoader")),
	pulse: React.lazy(() => import("react-spinners/PulseLoader")),
	bounce: React.lazy(() => import("react-spinners/BounceLoader")),
};

export interface SpinnerProps {
	/** HTML id tag of the root element */
	id?: string;
	/** Spinner size */
	size?: number | string;
	/** Spinner state */
	loading?: boolean;
	/** Spinner label */
	label?: string;
	/** Spinner color */
	color?: string;
	/** Spinner type */
	type: keyof typeof spinnerMap;
}

const SpinnerContainer = styled.div`
	position: relative;
	justify-content: center;
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 10px;
`;

const SpinnerLabel = styled.div`
	margin-left: 10px;
`;

const Spinner: React.FunctionComponent<SpinnerProps> = ({ type, label, ...props }) => {
	const Loader = spinnerMap[type];
	return (
		<React.Suspense fallback="">
			<SpinnerContainer>
				<Loader {...(props as any)} />
				{label && <SpinnerLabel>{label}</SpinnerLabel>}
			</SpinnerContainer>
		</React.Suspense>
	);
};

Spinner.defaultProps = {
	type: "clip",
	color: "#2180c0",
};

export default Spinner;
