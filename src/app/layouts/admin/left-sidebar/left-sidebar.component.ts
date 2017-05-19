import {AuthService} from './../../../services/auth.service';
import {Component, OnInit, ElementRef, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/css/modern.css', '../../../../assets/css/themes/green.css']
})
export class LeftSidebar implements OnInit {
  @Output() checkAdmin:EventEmitter<any> = new EventEmitter();

  constructor(private element:ElementRef, private authService:AuthService) {
    if (this.authService.loggedIn()) {
      this.checkAdmin.emit(true)
    } else {
      this.checkAdmin.emit(false)
    }

  }

  ngOnInit() {
    jQuery('.sidebar .accordion-menu li .sub-menu').slideUp(0);
    jQuery(this.element.nativeElement).find('.accordion-menu .droplink > a').on('click', (e) => {
      jQuery(e).addClass('hello')
    });
    jQuery('.waves-effect.waves-button').click(function (e) {
    });
  }

  collapseMenu() {
    //console.log(jQuery(this).addClass('hello'));
    jQuery(this).addClass('hello')

  }

}

@Component({
  moduleId: module.id,
  selector: 'topbar',
  templateUrl: './topbar.html',
  styles: ['a{cursor:pointer;}']
})
export class Topbar implements OnInit {

  constructor(private authService:AuthService) {
  }

  isReleasePopupVisible:boolean;

  ngOnInit() {
  }

  onReleaseOptionClicked() {
    this.isReleasePopupVisible = true;
  }

  release() {
    this.authService.release().subscribe(
      success =>console.log(success),
      error => console.log(error)
    )
  }

  releaseResponseClicked(choice:boolean) {
    if (choice) {
      console.log("choice", choice);
      this.release();
    }
    else {
      console.log("choice", choice);
    }
    this.isReleasePopupVisible = false;
  }
}
@Component({
  moduleId: module.id,
  selector: 'admin-head',
  templateUrl: './admin-head.html'
})
export class AdminHead implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
