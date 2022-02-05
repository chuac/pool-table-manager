import { Session } from './session.model';

export interface Customer {
	currentSession: Session;
	pastSessions: Array<Session>;
}
