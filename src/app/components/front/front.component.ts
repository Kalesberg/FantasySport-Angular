import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './bankroll.component.html'
})
export class BankrollComponent implements OnInit {


	constructor() { }

	ngOnInit() {
	}

}


@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './homepage.html'
})
export class HomepageComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './research-tool.html'
})
export class ResearchToolComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './contact-us.html'
})
export class ContactUsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}


@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './about_us.html'
})
export class AboutComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

@Component({
	moduleId: module.id,
	template: ``
})
export class VerifyTokenComponent implements OnInit {

	token: any;
	checkNoPassword:any;
  isError = false;
  errorMsg = "";
	constructor(private activatedR: ActivatedRoute, private services: AuthService, private router: Router, private _notificationsService: NotificationsService) { }

	ngOnInit() {

		this.activatedR.params.subscribe(
			params => {
				this.token = params['token'];
				this.checkNoPassword = this.token.split('_');
				if(this.checkNoPassword[0] == 'pass'){
					this.router.navigate([this.checkNoPassword[1]+'/changepassword']);
				}else{
				this.services.verifyToken(this.token).subscribe(
					success => {
						this._notificationsService.success(
							'Success',
							success.message,
							{
								timeOut: 5000,
								showProgressBar: true,
								pauseOnHover: false,
								clickToClose: false
							}
						);
						this.router.navigate(['/login',{'token':'abcs'}]);
					},
					error => {
						this._notificationsService.error(
							'Error',
							'Invalid Token',
							{
								timeOut: 5000,
								showProgressBar: true,
								pauseOnHover: false,
								clickToClose: false
							}
						);
						this.router.navigate(['/login']);
					}
				)

			}
			}
		)
	}

}


@Component({
	moduleId: module.id,
	templateUrl: './verify.html',
	styleUrls: ['./front.component.css']
})
export class VerifyEmailComponent implements OnInit {

	token: any;
	errors: any;
  isError:boolean;
  errorMsg:string = "";
	constructor(private activatedR: ActivatedRoute, private services: AuthService, private router: Router, private _notificationsService: NotificationsService) { }

	ngOnInit() {
	}

	onVerify(form: NgForm) {
		this.services.verifyEmail(form.value.email).subscribe(
			token => {
        this.isError = false;
        this.errorMsg = "";
				this._notificationsService.success(
					'Please Check',
					'Your Email',
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
				);
				this.router.navigate(['/login']);
			},
			error => {
			  console.log("error => ", error);
        this.isError = true;
        this.errorMsg = error.message;
				this._notificationsService.error(
					'Error',
					this.errors.message,
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
				)
			}
		)
	}

}


@Component({
	moduleId: module.id,
	templateUrl: './change-password.html',
	styleUrls: ['./front.component.css']
})
export class ChangePasswordComponent implements OnInit {

	password:any;
	confirmPassword:any;
	token:any;
  isError:boolean;
  errorMsg:string = "";
	constructor(private activatedR:ActivatedRoute,private authService:AuthService,private _notificationsService: NotificationsService,private router:Router) { }

	ngOnInit() {
		this.activatedR.params.subscribe(
			params => {
				this.token = params['token']
			}
		)
	}

	onChangePassword(form:NgForm){
		form.value.token = this.token;
		this.authService.changePassword(form.value).subscribe(
			success=>{
				this._notificationsService.success(
					'Success',
					'Password has been Changed',
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
				);
				this.router.navigate(['/login']);
			},
			error=>{
        this.isError = true;
        this.errorMsg = error.message;
				this._notificationsService.error(
					'Error',
					'Token Expired or Not Match',
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
				)
			}
		)
	}

}
