import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,private _notificationsService: NotificationsService,private router:Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm){
    this.authService.register(form.value).subscribe(
      success =>{
        this._notificationsService.success(
          'Registeration Successfull',
          'Please Login',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false
          }
        );
        this.authService.registerWP(form.value).subscribe(
          success => {
            console.log('WP user registered.');
          },
          error => {
            console.log('WP Error => ', error);
          }
        )
        this.router.navigate(['/login']);
      },
      error => {
        console.log('error => ',error);
      }
    )
  }

}
