import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
declare var jQuery: any;

@Component({
	selector: 'app-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

	contests: Object
	contestTypes: Object
	selectedcontestType: string;
	selectedSport;
	types = [];
	filteredData = []
	featuredContests = []
	checksports = []
	sports = []
	allContests: Object
	load = true
	entry_fees = []
	rangeValues = [];
	minRange: number
	maxRange: number
	selectedMin: number
	selectedMax: number

	constructor(private authService: AuthService, private router: Router, private el: ElementRef) {

	}

	ngOnInit() {
		this.authService.getcontests().subscribe(
			getContests => {
				this.contests = getContests.data
				this.allContests = getContests.data
				for (let contest in this.allContests) {
					this.entry_fees.push(this.allContests[contest].entry_fee);
					
					if (this.sports.indexOf(this.allContests[contest].sport) == -1){
						this.sports.push(this.allContests[contest].sport)
						this.checksports.push({'label':this.allContests[contest].sport,'value':this.allContests[contest].sport})
					}
				}
				this.maxRange = Math.max.apply(Math, this.entry_fees)
				this.minRange = Math.min.apply(Math, this.entry_fees)
				this.rangeValues = [this.minRange, this.maxRange]
				this.load = false
			},
			error => {
				this.authService.logout();
				window.location.href = '/login';
			}
		)

		this.authService.getcontestTypes().subscribe(
			contestTypes => {
				this.contestTypes = contestTypes.data
				this.types.push({ label: 'All', value: '', 'selected': true })
				for (let type in this.contestTypes) {
					this.types.push({ label: this.contestTypes[type].label, value: this.contestTypes[type].id })
				}

			},
			error => {
				this.authService.logout();
				window.location.href = '/login';
			}
		)

	}


	filterContest() {
		this.load = true
		this.filteredData = [];
		if (this.selectedcontestType == '' && this.rangeValues[0] == this.minRange && this.rangeValues[1] == this.maxRange && typeof this.selectedSport == 'undefined') {
			this.contests = this.allContests
		}

		else if (this.selectedcontestType == '' || typeof this.selectedcontestType == 'undefined') {
			for (let contest in this.allContests) {
				if (this.allContests[contest].entry_fee >= this.rangeValues[0] && this.allContests[contest].entry_fee <= this.rangeValues[1] && this.allContests[contest].sport == this.selectedSport) {
					this.filteredData.push(this.allContests[contest]);
				}
			}
			this.contests = this.filteredData
		}

		else {
			for (let contest in this.allContests) {
				if (this.allContests[contest].contest_type_id == this.selectedcontestType && this.allContests[contest].entry_fee >= this.rangeValues[0] && this.allContests[contest].entry_fee <= this.rangeValues[1] && (this.allContests[contest].sport == this.selectedSport || typeof this.selectedSport == 'undefined')) {
					this.filteredData.push(this.allContests[contest]);
				}
			}
			this.contests = this.filteredData
		}

		this.load = false
	}


}