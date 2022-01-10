import { TableState } from './table-state.enum';

export interface Table {
    timeStarted: Date;
    state: TableState;
}
