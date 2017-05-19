import { Component , OnInit } from '@angular/core';
import {LeftSidebar} from '../layouts/admin/left-sidebar/left-sidebar.component';
import {FrontLayout} from '../layouts/front/FrontLayout.component'
import {FrontFooter} from '../layouts/front/FrontLayout.component'
import {AuthService} from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router, NavigationEnd,ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: '../app.component.html',
	styleUrls: ['../app.component.css']
})
export class MainComponent implements OnInit{
	admin = false;
	title= "Admin";
	user = false;
	front = false;
	type : String;

	constructor(private auth: AuthService,private titleService: Title,private activatedRoute: ActivatedRoute,private router: Router
		) {

		if(this.auth.loggedIn()){
			this.admin = true
		}else if(this.auth.userLoggedIn()){
			this.user = true
		}else{
			this.user = false;
			this.admin = false;
			this.front  =true;
		}
		this.titleService.setTitle('My awesome app');
	}

	ngAfterViewInit() {
		/*this.auth.checkuser().subscribe(
			success => console.log(success),
			error => {
				this.auth.logout()
				this.router.navigate(['/login'])
			}
			)*/
		}


		ngOnInit(){
			this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map(route => {
				while (route.firstChild) route = route.firstChild;
				this.type = route.snapshot.data['type'];
				if(this.auth.loggedIn() && this.type == 'admin'){
					this.admin = true
					jQuery('body').removeClass('compact-menu');
					jQuery('body').removeClass('page-horizontal-bar');
				}else if(this.auth.userLoggedIn() && this.type == 'user'){
					this.user = true
					jQuery('body').addClass('compact-menu');
					jQuery('body').addClass('page-horizontal-bar');
				}else{
					this.user = false;
					this.admin = false;
					this.front =  true;
				}
				return route;
			})
			.filter(route => route.outlet === 'primary')
			.mergeMap(route => route.data)
			.subscribe((event) => this.titleService.setTitle(event['title']));
		}

		collapseMenu(){


		}

		sidebarAndContentHeight() {
			var content = jQuery('.page-inner'),
			sidebar = jQuery('.page-sidebar'),
			body = jQuery('body'),
			height,
			footerHeight = jQuery('.page-footer').outerHeight(),
			pageContentHeight = jQuery('.page-content').height();

			content.attr('style', 'min-height:' + sidebar.height() + 'px !important');

			if (body.hasClass('page-sidebar-fixed')) {
				height = sidebar.height() + footerHeight;
			} else {
				height = sidebar.height() + footerHeight;
				if (height  < jQuery(window).height()) {
					height = jQuery(window).height();
				}
			}

			if (height >= content.height()) {
				content.attr('style', 'min-height:' + height + 'px !important');
			}
		}

		checkUser(event){
			if(event == true){
				this.user = true;
				this.front = false
			}else{
				this.user = false;
				this.front = true
			}
		}

		checkAdmin(event){
			if(event == true){
				this.admin = true;
				this.front = false;
			}else{
				this.admin = false;
				this.front = true;
			}
		}
	}
