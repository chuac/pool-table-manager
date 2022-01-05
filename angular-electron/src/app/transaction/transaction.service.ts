import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Transaction } from './models/transaction';
import { subMinutes } from 'date-fns';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	pendingTransactions$: Observable<Array<Transaction>>;

	private pendingTransactionsSubject = new BehaviorSubject<Array<Transaction>>([]); // Array should be maintained like a queue

	constructor() {
		this.pendingTransactions$ = this.pendingTransactionsSubject.asObservable();

		this.pendingTransactionsSubject.next([{
			tableNumber: 3,
			timeStarted: subMinutes(new Date(), 45),
			timeEnded: new Date(),
			cost: 8,
		}]); // hardcoded sample transaction
	}

	addTransaction(transactionToAdd: Transaction) {
		const newTransactions = [...this.pendingTransactionsSubject.value];
		newTransactions.push(transactionToAdd); // Make sure we add to the end of the array

		this.pendingTransactionsSubject.next(newTransactions);
	}

	commitTransaction(transactionToCommit: Transaction) {
		// TODO: Commit this transaction into the Transaction History log

		// We could also simply pop from the start of the queue but I figured this way may be more robust
		const newTransactions = this.pendingTransactionsSubject.value
			.filter((transaction) => transaction !== transactionToCommit);

		this.pendingTransactionsSubject.next(newTransactions);
	}
}
