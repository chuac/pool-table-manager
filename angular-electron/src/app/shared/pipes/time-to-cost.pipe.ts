import { Pipe, PipeTransform } from '@angular/core';
import { MathHelper } from '../helpers/math.helper';
import { CustomerService } from '../services/customer.service';

@Pipe({
	name: 'timeToCost'
})
export class TimeToCostPipe implements PipeTransform {
	constructor(
		private readonly customerService: CustomerService,
	) { }

	transform(tableNumber: number, clockDate: Date): string {
		const cost = this.customerService.runningCostForCustomer(tableNumber, clockDate);

		const roundedDownCost = MathHelper.roundDownToNearestTenCents(cost);

		return roundedDownCost.toFixed(2);
	}
}
