import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

type DatePickerProps = {
	value: string | number | Date;
	modifiable: boolean;
	handleValueChange: (date: any) => void;
}

const DatePicker = ({ value, handleValueChange, modifiable }: DatePickerProps) => (
	<Grid className="datepicker">
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant="inline"
				format="yyyy-MM-dd"
				readOnly={!modifiable}
				value={value}
				onChange={(date) => handleValueChange(date)}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
				InputProps={{ readOnly: !modifiable }}
			/>
		</MuiPickersUtilsProvider>
	</Grid>
);

export default DatePicker;
