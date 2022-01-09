export interface Transaction {
	tableNumber: number;
	timeStarted: Date;
	timeEnded: Date;
	cost: number; // TODO: Or string?
}
