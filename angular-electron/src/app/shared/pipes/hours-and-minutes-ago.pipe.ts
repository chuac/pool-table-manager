import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hoursAndMinutesAgo'
})
export class HoursAndMinutesAgoPipe implements PipeTransform {

	transform(value: Date, clockDate: Date): any {
		const minutesAgo = differenceInMinutes(clockDate, value);

		if (minutesAgo > 60) {
			const hoursAgo = differenceInHours(clockDate, value);
			const minutesRemainder = minutesAgo % 60;

			return `${hoursAgo} hours and ${minutesRemainder} minutes ago`;
		}

		return `${minutesAgo} minutes ago`;
	}
}
