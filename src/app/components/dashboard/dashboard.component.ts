import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {LeftSidebar} from '../../layouts/admin/left-sidebar/left-sidebar.component';
declare var jQuery: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private authService : AuthService) { }

	ngOnInit() {
		jQuery(".live-tile").liveTile();
		//jQuery('.counter').counterUp({delay: 10,time: 1000});
	}

}
