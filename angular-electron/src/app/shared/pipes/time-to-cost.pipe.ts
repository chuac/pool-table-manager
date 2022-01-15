import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
	name: 'timeToCost'
})
export class TimeToCostPipe implements PipeTransform {

	transform(value: Date, clockDate: Date, tableNumber: number): number {
		const costPerHour = 16.0; // TODO: Hardcoded cost per hour for now
		const difference = differenceInMinutes(clockDate, value);

		return +(difference / 60 * costPerHour).toFixed(2);
	}
}
