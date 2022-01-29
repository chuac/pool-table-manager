import { Injectable } from '@angular/core';
import { setSeconds } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { isEmpty } from 'lodash-es';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	customers$: Observable<Array<Customer>>;

	private customersSubject = new BehaviorSubject<Array<Customer>>([]);

	constructor() { }

	addOrUpdateCustomer() {

	}

	startSession(currentTableNumber: number, nextTableNumber: number, timeStarted: Date): void {
		const customers = this.customersSubject.value;

		const customerIndex = customers.findIndex((customer) => {
			return customer.currentSession.tableNumber === currentTableNumber;
		});

		if (customerIndex !== -1) {
			const oldSession = customers[customerIndex].currentSession;

			if (!isEmpty(oldSession)) {
				oldSession.timeEnded = setSeconds(new Date(), 0);
				customers[customerIndex].pastSessions.push(oldSession);
			}

			customers[customerIndex].currentSession = {
				tableNumber: nextTableNumber,
				timeStarted,
				timeEnded: null,
			};

		} else {
			const newCustomer: Customer = {
				currentSession: {
					tableNumber: nextTableNumber,
					timeStarted,
					timeEnded: null,
				},
				pastSessions: [],
			};

			customers.push(newCustomer);
		}

		this.customersSubject.next(customers);
	}

	endSession(tableNumber: number, timeStarted: Date) {
		const customers = this.customersSubject.value;

		const customerFound = customers.find((customer) => {
			return customer.currentSession.tableNumber === tableNumber;
		});

		if (customerFound) {
			const oldSession = customerFound.currentSession;
			oldSession.timeEnded = setSeconds(new Date(), 0);

			customerFound.currentSession = null;

			customerFound.pastSessions.push(oldSession);
		}
	}

	calculateCost(tableNumber: number) {
		const customers = this.customersSubject.value;

		const customerFound = customers.find((customer) => {
			return customer.currentSession.tableNumber === tableNumber;
		});

	}
}
