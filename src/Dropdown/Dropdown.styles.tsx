import styled from "styled-components";

export const DropdownContainer = styled.div`
	&.dropup,
	&.dropright,
	&.dropdown,
	&.dropleft {
		position: relative;
	}
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 110;
		display: none;
		float: left;
		min-width: 10rem;
		padding: 0.5rem 0;
		margin: 0.125rem 0 0;
		font-size: 1rem;
		color: inherit;
		text-align: left;
		list-style: none;
		background-color: inherit;
		background-clip: padding-box;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 0.25rem;
		&.show {
			display: block;
		}
	}
	.dropdown-menu-right {
		right: 0;
		left: auto;
	}
	@media (min-width: 576px) {
		.dropdown-menu-sm-right {
			right: 0;
			left: auto;
		}
	}
	@media (min-width: 768px) {
		.dropdown-menu-md-right {
			right: 0;
			left: auto;
		}
	}
	@media (min-width: 992px) {
		.dropdown-menu-lg-right {
			right: 0;
			left: auto;
		}
	}
	@media (min-width: 1200px) {
		.dropdown-menu-xl-right {
			right: 0;
			left: auto;
		}
	}
	.dropdown-menu-left {
		right: auto;
		left: 0;
	}
	@media (min-width: 576px) {
		.dropdown-menu-sm-left {
			right: auto;
			left: 0;
		}
	}
	@media (min-width: 768px) {
		.dropdown-menu-md-left {
			right: auto;
			left: 0;
		}
	}
	@media (min-width: 992px) {
		.dropdown-menu-lg-left {
			right: auto;
			left: 0;
		}
	}
	@media (min-width: 1200px) {
		.dropdown-menu-xl-left {
			right: auto;
			left: 0;
		}
	}
	&.dropup {
		.dropdown-menu {
			top: auto;
			bottom: 100%;
			margin-top: 0;
			margin-bottom: 0.125rem;
		}
		.dropdown-toggle::after {
			display: inline-block;
			margin-left: 0.255em;
			vertical-align: 0.255em;
			content: "";
			border-top: 0;
			border-right: 0.3em solid transparent;
			border-bottom: 0.3em solid;
			border-left: 0.3em solid transparent;
		}
		.dropdown-toggle:empty::after {
			margin-left: 0;
		}
	}
	&.dropright {
		.dropdown-menu {
			top: 0;
			right: auto;
			left: 100%;
			margin-top: 0;
			margin-left: 0.125rem;
		}
		.dropdown-toggle::after {
			display: inline-block;
			margin-left: 0.255em;
			vertical-align: 0.255em;
			content: "";
			border-top: 0.3em solid transparent;
			border-right: 0;
			border-bottom: 0.3em solid transparent;
			border-left: 0.3em solid;
		}
		.dropdown-toggle:empty::after {
			margin-left: 0;
		}
		.dropdown-toggle::after {
			vertical-align: 0;
		}
	}
	&.dropleft {
		.dropdown-menu {
			top: 0;
			right: 100%;
			left: auto;
			margin-top: 0;
			margin-right: 0.125rem;
		}
		.dropdown-toggle::after {
			display: inline-block;
			margin-left: 0.255em;
			vertical-align: 0.255em;
			content: "";
		}
		.dropdown-toggle::after {
			display: none;
		}
		.dropdown-toggle::before {
			display: inline-block;
			margin-right: 0.255em;
			vertical-align: 0.255em;
			content: "";
			border-top: 0.3em solid transparent;
			border-right: 0.3em solid;
			border-bottom: 0.3em solid transparent;
		}
		.dropdown-toggle:empty::after {
			margin-left: 0;
		}
		.dropdown-toggle::before {
			vertical-align: 0;
		}
	}

	.dropdown-divider {
		height: 0;
		margin: 0.5rem 0;
		overflow: hidden;
		border-top: 1px solid #e9ecef;
	}
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.25rem 1.5rem;
		clear: both;
		font-weight: 400;
		color: #212529;
		text-align: inherit;
		white-space: nowrap;
		background-color: transparent;
		border: 0;
		&:first-child {
			border-top-left-radius: calc(0.25rem - 1px);
			border-top-right-radius: calc(0.25rem - 1px);
		}
		&:last-child {
			border-bottom-right-radius: calc(0.25rem - 1px);
			border-bottom-left-radius: calc(0.25rem - 1px);
		}
		&:hover,
		&:focus {
			color: #16181b;
			text-decoration: none;
			background-color: #f8f9fa;
		}
		&.active,
		&:active {
			color: #fff;
			text-decoration: none;
			background-color: #007bff;
		}
		&.disabled,
		&:disabled {
			color: #6c757d;
			pointer-events: none;
			background-color: transparent;
		}
	}
	.dropdown-item,
	.dropdown-header {
		font-size: 1.3rem;
	}
	.dropdown-header {
		display: block;
		padding: 0.5rem 1.5rem;
		margin-bottom: 0;
		font-family: OpenSans-Semibold, Tahoma;
		color: #fff;
		white-space: nowrap;
	}
	.dropdown-item-text {
		display: block;
		padding: 0.25rem 1.5rem;
		color: #212529;
	}
	.dropdown-toggle-split {
		padding-right: 0.5625rem;
		padding-left: 0.5625rem;
	}
	.dropdown-toggle-split::after,
	.dropup .dropdown-toggle-split::after,
	.dropright .dropdown-toggle-split::after {
		margin-left: 0;
	}
	.dropleft .dropdown-toggle-split::before {
		margin-right: 0;
	}
	.btn-sm + .dropdown-toggle-split,
	.btn-group-sm > .btn + .dropdown-toggle-split {
		padding-right: 0.375rem;
		padding-left: 0.375rem;
	}
	.btn-lg + .dropdown-toggle-split,
	.btn-group-lg > .btn + .dropdown-toggle-split {
		padding-right: 0.75rem;
		padding-left: 0.75rem;
	}
`;
