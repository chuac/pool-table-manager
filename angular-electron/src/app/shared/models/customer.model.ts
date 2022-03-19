import { Discount } from '../../discount/models/discount';
import { Session } from './session.model';

export interface Customer {
	currentSession: Session;
	pastSessions: Array<Session>;
	discount: Discount;
}
