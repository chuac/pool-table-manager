import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../user-input/user-input.service';

@Component({
	selector: 'app-welcome-screen',
	templateUrl: './welcome-screen.component.html',
	styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {

	constructor(private readonly userInputService: UserInputService) {

	}

	ngOnInit(): void {
	}


}
