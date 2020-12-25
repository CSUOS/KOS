import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date: any) => {
		setSelectedDate(date);
	};

	return (
		<Grid className="datepicker">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="yyyy-MM-dd"
					id="date-picker-inline"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</Grid>
	);
};

export default DatePicker;
