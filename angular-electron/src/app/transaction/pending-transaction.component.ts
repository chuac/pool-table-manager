import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';

@Component({
	selector: 'pending-transaction',
	templateUrl: './pending-transaction.component.html',
	styleUrls: ['./pending-transaction.component.scss']
})
export class PendingTransactionComponent implements OnInit {
	pendingTransactions$ = this.transactionService.pendingTransactions$;

	constructor(
		private readonly transactionService: TransactionService,
	) { }

	ngOnInit() {
	}

}
