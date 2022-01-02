import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
	name: 'timeToCost'
})
export class TimeToCostPipe implements PipeTransform {

	transform(value: Date, tableNumber: number): any {
		const costPerHour = 16.0;
		const difference = differenceInMinutes(new Date(), value);

		return difference / 60 * costPerHour;
	}
}
