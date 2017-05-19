import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

function createCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; domain=dfsportgod.com; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function removeCookie(name) {
  document.cookie = name + "=; expires=" + new Date(0).toUTCString() +"; domain=dfsportgod.com; path=/";
}

interface Credentials {
  email:string,
  password:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/modern.css', '../../../assets/css/userdashboard/custom.css']
})
export class LoginComponent implements OnInit {
  credentials:Credentials;
  isUnverified:boolean;
  isError:boolean;
  errorMsg:string = "";

  constructor(private authService:AuthService, private router:Router) {
  }

  ngOnInit() {
    this.navigateUser()
  }


  navigateUser() {
    if (this.authService.loggedIn()) {
      //window.location.href = '/admin/dashboard';
      this.router.navigate(['/admin/dashboard']);
    } else if (this.authService.userLoggedIn()) {
      //window.location.href = '/dashboard';
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSignIn(form:NgForm) {
    let data = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(JSON.stringify(data)).subscribe(
      response => {
        console.log("response => ", response);
        this.authService.userLoggedInEvent.emit(true);
        localStorage.setItem('token', JSON.stringify(response.data));
        this.authService.userInfo().subscribe(
          user => {
            console.log("user details => ", user);
            localStorage.setItem('user', JSON.stringify(user.data))
            this.authService.loginWP(JSON.stringify(data)).subscribe(
              response => {
                if(response.uid) {
                  var uid = response.uid;
                  removeCookie('dfs_wp_logout');
                  createCookie('dfs_wp_user', uid, 1);
                  createCookie('dfs_wp_email', user.data.email, 1);
                }
              }
            );
          }
        );
        this.navigateUser();
      },
      (error) => {
        console.log("error => ", error);
        this.isError = false;
        this.isUnverified = false;
        if (error.data == 'userIsNotVerified' || error.data == 'userIsNotVerifiedWithNullPWD') {
          this.isUnverified = true;
          this.isError = false;
        } else {
          this.isUnverified = false;
          this.isError = true;
          this.errorMsg = error.message;
          console.log(error.message);
        }
      }
    );
  }
}

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router) {
  }

  ngOnInit() {
    this.authService.logout();
    removeCookie('dfs_wp_user');
    removeCookie('dfs_wp_email');
    createCookie('dfs_wp_logout', 1, 1);
    window.location.href = '';
  }

}
