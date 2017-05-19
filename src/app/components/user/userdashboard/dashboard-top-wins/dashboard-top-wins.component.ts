import {Component, Input} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {trigger, state, style, animate, transition} from '@angular/animations';
import {DashboardFilter} from "../../../../models/dashboard-filter.model";
import {ContestTopWin} from "../../../../models/contest";
/**
 * Created by Hiren on 26-04-2017.
 */


@Component({
  selector: 'dfs-dashboard-top-wins',
  templateUrl: './dashboard-top-wins.component.html',
  styleUrls: ['./dashboard-top-wins.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0.98)', opacity: 0}),
          animate('225ms', style({transform: 'scale(1)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class DashboardTopWinsComponent {

  readyState = 'inactive';
  errorMsg:string = "";
  isLoading:boolean;
  winRecords:ContestTopWin[];
  private _dashboardFilter:DashboardFilter;

  @Input() set dashoardFilter(filter:DashboardFilter) {
    this._dashboardFilter = filter;
    if (this._dashboardFilter)
      this.getContestTopWinData(this._dashboardFilter)
  }

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.getContestTopWinData();
  }

  getContestTopWinData(data:DashboardFilter = null) {
    this.showLoader();
    this.userService.getContestTopWinData(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.winRecords = response.data;
            this.hideLoader();
          }
          else {

          }
        },
        error => {
          this.hideLoader();
          this.errorMsg = error.message;
          console.log("error => ", error);
        }
      )
  }

  showLoader() {
    this.isLoading = true;
    this.readyState = 'inactive';
  }

  hideLoader() {
    this.isLoading = false;
    this.readyState = 'active';
  }
}
