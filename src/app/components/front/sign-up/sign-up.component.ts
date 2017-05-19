import {Component} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by Hiren on 14-05-2017.
 */


@Component({
  selector: 'dfs-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private router:Router) {

  }

  onBtnSignUpClick() {
    this.router.navigate(['/register'])
  }
}
