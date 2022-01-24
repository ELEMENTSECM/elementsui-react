import { mount, shallow } from "enzyme";
import { Popper } from "react-popper";
import DropdownMenu from "../DropdownMenu";

describe("DropdownMenu", () => {
	let isOpen;
	let direction;
	let inNavbar;

	beforeEach(() => {
		isOpen = false;
		direction = "down";
		inNavbar = false;
	});

	test('should not have the class "show" when isOpen context is false', () => {
		isOpen = false;
		const wrapper = mount(
			<DropdownMenu>
				<p>Content</p>
			</DropdownMenu>,
			{
				context: { isOpen, direction, inNavbar },
			}
		);

		expect(wrapper.find(".dropdown-menu").hostNodes().hasClass("show")).toBe(false);
		expect(wrapper.find(".show").hostNodes().length).toBe(0);
	});

	test("should render down when direction is unknown on the context", () => {
		isOpen = true;
		direction = "unknown";
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("placement")).toBe("bottom-start");
	});

	test('should render down when direction is "down" on the context', () => {
		isOpen = true;
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("placement")).toBe("bottom-start");
	});

	test('should render up when direction is "up" on the context', () => {
		isOpen = true;
		direction = "up";
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("placement")).toBe("top-start");
	});

	test('should render left when direction is "left" on the context', () => {
		isOpen = true;
		direction = "left";
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("placement")).toBe("left-start");
	});

	test('should render right when direction is "right" on the context', () => {
		isOpen = true;
		direction = "right";
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("placement")).toBe("right-start");
	});

	test("should not disable flip modifier by default", () => {
		isOpen = true;
		const wrapper = shallow(<DropdownMenu>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("modifiers")).toBe(undefined);
	});

	test("should disable flip modifier when flip is false", () => {
		isOpen = true;
		const wrapper = shallow(<DropdownMenu flip={false}>Hello, world</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.find(Popper).prop("modifiers")).toEqual({ flip: { enabled: false } });
	});

	test("should render custom tag", () => {
		const wrapper = mount(<DropdownMenu tag="main">Yo!</DropdownMenu>, {
			context: { isOpen, direction, inNavbar },
		});

		expect(wrapper.text()).toBe("Yo!");
		expect(wrapper.childAt(0).hasClass("dropdown-menu")).toBe(true);
		expect(wrapper.getDOMNode().tagName.toLowerCase()).toBe("main");
	});
});
