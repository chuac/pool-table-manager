import { Injectable } from '@angular/core';
import { differenceInMinutes, setSeconds } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { isEmpty } from 'lodash-es';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	customers$: Observable<Array<Customer>>;

	private customersSubject = new BehaviorSubject<Array<Customer>>([]);

	constructor() {
		this.customers$ = this.customersSubject.asObservable();
	}

	startOrUpdateSession(currentTableNumber: number, nextTableNumber: number, timeStarted: Date): void {
		const customers = this.customersSubject.value;

		const customerIndex = customers.findIndex((customer) => {
			return customer.currentSession.tableNumber === currentTableNumber;
		});

		if (customerIndex !== -1) {
			const oldSession = customers[customerIndex].currentSession;

			if (!isEmpty(oldSession)) {
				oldSession.timeEnded = setSeconds(new Date(), 0); // The consumer may already be setting seconds to 0 but do it again anyway
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

	endSession(currentTableNumber: number, timeEnded: Date) {
		const customers = this.customersSubject.value;

		const customerIndex = customers.findIndex((customer) => {
			return customer.currentSession.tableNumber === currentTableNumber;
		});

		if (customerIndex !== -1) {
			const oldSession = customers[customerIndex].currentSession;
			oldSession.timeEnded = setSeconds(timeEnded, 0); // The consumer may already be setting seconds to 0 but do it again anyway

			customers[customerIndex].currentSession = null;

			customers[customerIndex].pastSessions.push(oldSession);

			this.customersSubject.next(customers);
		}
	}

	earliestStartDateForCustomer(tableNumber: number): Date {
		const customer = this.customerForTableNumber(tableNumber);

		if (!isEmpty(customer)) {
			if (customer.pastSessions?.length > 0) {
				// Assuming we always 'push' onto a Customer's Past Sessions so the first element should be the oldest
				return customer.pastSessions[0].timeStarted;
			} else {
				return customer.currentSession.timeStarted;
			}
		}
	}

	runningCostForCustomer(tableNumber: number, clockDate: Date): number {
		let totalCost = 0;
		const costPerHour = 16.0; // TODO: Hardcoded cost per hour for now. Get it from Schemes

		const customer = this.customerForTableNumber(tableNumber);

		if (!isEmpty(customer)) {
			totalCost += this.calculateCostForTimeDifference(costPerHour, customer.currentSession.timeStarted, clockDate);

			if (customer.pastSessions?.length > 0) {
				for (const session of customer.pastSessions) {
					totalCost += this.calculateCostForTimeDifference(costPerHour, session.timeStarted, session.timeEnded);
				}
			}
		}

		return totalCost;
	}

	private calculateCostForTimeDifference(costPerHour: number, smallerDate: Date, largerDate: Date): number {
		const difference = differenceInMinutes(largerDate, smallerDate);

		return +(difference / 60 * costPerHour).toFixed(2); // TODO: Important: Proper rounding
	}

	private customerForTableNumber(tableNumber: number): Customer {
		const customers = this.customersSubject.value;

		return customers.find((customer) => {
			return customer.currentSession.tableNumber === tableNumber;
		});
	}
}
