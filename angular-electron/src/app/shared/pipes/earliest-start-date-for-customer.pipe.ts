import { Pipe, PipeTransform } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Pipe({
	name: 'earliestStartDateForCustomer'
})
export class EarliestStartDateForCustomerPipe implements PipeTransform {
	constructor(
		private readonly customerService: CustomerService,
	) { }

	transform(tableNumber: number): any {
		return this.customerService.earliestStartDateForCustomer(tableNumber);
	}
}
