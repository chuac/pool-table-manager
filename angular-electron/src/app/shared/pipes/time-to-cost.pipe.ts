import { Pipe, PipeTransform } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Pipe({
	name: 'timeToCost'
})
export class TimeToCostPipe implements PipeTransform {
	constructor(
		private readonly customerService: CustomerService,
	) { }

	transform(tableNumber: number, clockDate: Date): string {
		const runningCost = this.customerService.runningCostForTableNumber(tableNumber, clockDate);

		let discountedCost = runningCost.totalWithoutDiscount - runningCost.discountAmount;

		if (discountedCost < 0) {
			discountedCost = 0;
		}

		return discountedCost.toFixed(2);
	}
}
