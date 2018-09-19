DateTimePicker date only:

```js 
<DateTimePicker
			locale="en"
			dateFormat="L"
			timeFormat={false}
			defaultValue={new Date()}
			onChange={(value) => alert(value)}
		/>
```
DateTimePicker time only:
```js
<DateTimePicker
				locale="en"
				viewMode="time"
				onChange={(value) => alert(value)}
				timeFormat="LT"
			/>
```