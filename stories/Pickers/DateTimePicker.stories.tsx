import { Story, Meta } from "@storybook/react/types-6-0";
import DateTimePicker, { DateTimePickerProps } from "../../src/DateTimePicker";
import "react-datepicker/dist/react-datepicker.css";

export default {
	title: "Pickers/DateTimePicker",
	component: DateTimePicker,
	args: {
		todayButton: true,
		allowSameDay: true,
		locale: "nb",
		defaultValue: new Date(),
		viewMode: "datetime",
		dateFormat: "L",
		timeFormat: "LT",
	},
	argTypes: {
		defaultValue: {
			control: { type: "date" },
		},
		dateFormat: {
			control: { type: "select", options: ["L", "LL", "LLL", "LLLL", "LT", "LTS", false] },
		},
		timeFormat: {
			control: { type: "select", options: ["LT", "LTS", false] },
		},
	},
} as Meta;

export const Basic: Story<DateTimePickerProps> = (args) => {
	return <DateTimePicker {...args} onChange={(e) => alert(e)} />;
};
Basic.storyName = "Basic usage";
