import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hoursAndMinutesDifference'
})
export class HoursAndMinutesDifferencePipe implements PipeTransform {
	transform(value: Date, clockDate: Date): string {
		const minutesAgo = differenceInMinutes(clockDate, value);

		if (minutesAgo > 60) {
			const hoursAgo = differenceInHours(clockDate, value);
			const minutesRemainder = minutesAgo % 60;

			return `${hoursAgo} hours and ${minutesRemainder} minutes`;
		}

		return `${minutesAgo} minutes`;
	}
}
