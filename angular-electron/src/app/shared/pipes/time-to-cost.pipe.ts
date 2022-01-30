import { Pipe, PipeTransform } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Pipe({
	name: 'timeToCost'
})
export class TimeToCostPipe implements PipeTransform {
	constructor(
		private readonly customerService: CustomerService,
	) { }

	transform(tableNumber: number, clockDate: Date): number {
		return this.customerService.runningCostForCustomer(tableNumber, clockDate);
	}
}
