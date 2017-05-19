import { Component, OnInit , ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
	selector: 'app-mlb',
	templateUrl: './mlb.component.html',
	encapsulation: ViewEncapsulation.None
})
export class MlbComponent implements OnInit {
	private mlbTeams: Object;
	players = []
	constructor(private mlbService: AuthService) {
		
	}

	ngOnInit() {
		this.mlbService.getMlbTeams().
		subscribe(
			teams => {
				this.mlbTeams = teams; 
			} ,
			error => console.log(error)
			);
		
	}
}


@Component({
	selector: 'app-mlb-player',
	templateUrl: './players.component.html',
	encapsulation: ViewEncapsulation.None
})
export class MlbPlayerComponent implements OnInit {
	
	private mlbTeams: Object;
	players = []
	cols: any[];
	teams: any[];
	constructor(private mlbService: AuthService) {
		
	}

	ngOnInit() {
		this.mlbService.getMlbPlayers().
		subscribe(
			teams => {
				for(var i =0; i < teams.length; i++){
					for(var j = 0; j < teams[i].players.length; j++){
						teams[i].players[j].team = teams[i].name;
						this.players.push(teams[i].players[j]);
					}
				}


			} ,
			error => console.log(error)
			);

		this.teams = [];
		this.teams.push({label: 'All Brands', value: null});
		this.teams.push({label: 'Audi', value: 'Audi'});
		console.log(this.teams);
		
	}}