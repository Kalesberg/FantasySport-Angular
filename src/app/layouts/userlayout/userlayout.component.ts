import {AuthService} from './../../services/auth.service';
import {Component, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-usertopbar',
  templateUrl: './user-topbar.component.html',
  styleUrls: ['./userlayout.component.css', '../../../assets/modern.css', '../../../assets/css/userdashboard/custom.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserlayoutComponent implements OnInit {

  @Output() checkUser:EventEmitter<any> = new EventEmitter();
  userData;

  constructor(private authService:AuthService) {
    if (this.authService.userLoggedIn()) {
      this.checkUser.emit(true)
    } else {
      this.checkUser.emit(false)
    }
    /*if(!localStorage.getItem('user')){
     this.authService.userInfo().subscribe(
     user=>{
     localStorage.setItem('user',JSON.stringify(user.data))
     this.userData = user.data;
     }
     )
     }else{
     this.userData = JSON.parse(localStorage.getItem('user'));
     }*/

  }

  ngOnInit() {
    if (this.authService.userLoggedIn()) {
      this.checkUser.emit(true)
    } else {
      this.checkUser.emit(false)
    }
  }

  logoutUser() {
    this.authService.logout();
  }

}
