import {Component, Input} from "@angular/core";
import {trigger, state, style, animate, transition} from '@angular/animations';
import {DashboardFilter} from "../../../../models/dashboard-filter.model";
import {UserService} from "../../../../services/user.service";
import {UserContestData} from "../../../../models/user-contest-data.model";
/**
 * Created by Hiren on 26-04-2017.
 */


@Component({
  selector: 'dfs-dashboard-statics',
  templateUrl: './dashboard-statics.component.html',
  styleUrls: ['./dashboard-statics.component.css'],
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
export class DashboardStaticsComponent {

  readyState = 'inactive';
  errorMsg:string;
  isLoading:boolean;
  contestData:UserContestData;
  private _dashboardFilter:DashboardFilter;

  @Input() set dashoardFilter(filter:DashboardFilter) {
    this._dashboardFilter = filter;
    if (this._dashboardFilter) {
      this.getContestData(this._dashboardFilter);
    }
  }

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.getContestData();
  }

  getContestData(data:DashboardFilter = null) {
    this.showLoader();
    this.userService.getContestReport(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.contestData = UserContestData.getObject(response.data);
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
