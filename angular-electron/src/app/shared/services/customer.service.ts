import { Injectable } from '@angular/core';
import { setSeconds } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	customers$: Observable<Array<Customer>>;

	private customersSubject = new BehaviorSubject<Array<Customer>>([]);

	constructor() { }

	addOrUpdateCustomer() {

	}

	startSession(tableNumber: number, timeStarted: Date): void {
		const customers = this.customersSubject.value;

		const customerFound = customers.find((customer) => {
			return customer.currentSession.tableNumber === tableNumber;
		});

		if (customerFound) {
			const oldSession = customerFound.currentSession;
			oldSession.timeEnded = setSeconds(new Date(), 0);

			customerFound.currentSession = {
				tableNumber,
				timeStarted,
				timeEnded: null,
			};

			customerFound.pastSessions.push(oldSession);
		} else {

		}
	}

	endSession(tableNumber: number, timeStarted: Date) {

	}

	calculateCost(tableNumber: number) {
		const customers = this.customersSubject.value;

		const customerFound = customers.find((customer) => {
			return customer.currentSession.tableNumber === tableNumber;
		});

	}
}
