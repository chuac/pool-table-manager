import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { TableStateChanged } from '../shared/models/table-state-changed.enum';
import { SwitchboardService } from '../shared/services/switchboard.service';


@Component({
    selector: 'switchboard',
    templateUrl: './switchboard.component.html',
    styleUrls: ['./switchboard.component.scss']
})
export class SwitchboardComponent implements OnInit {
    allTables = Object.keys(TableStateChanged);

    constructor(private readonly switchboardService: SwitchboardService) {
    }

    ngOnInit(): void {
    }

    tableStateChanged(tableEnumKey: string) {
        // console.log(TableStateChanged[tableEnumKey])

        this.switchboardService.addTableStateChanged(TableStateChanged[tableEnumKey]);
    }
}
