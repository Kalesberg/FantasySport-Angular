import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./responsive.css', './style.css']
})
export class FrontLayout implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}


@Component({
  moduleId: module.id,
  selector: 'app-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls:['./user-footer.component.css']
})
export class FrontFooter implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
