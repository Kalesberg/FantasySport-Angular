import {Component, ViewChild, ElementRef} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {UserContestData} from "../../../models/user-contest-data.model";
import * as moment from "moment";
import * as c3 from "c3";
import {ContestTopWin} from "../../../models/contest";
import {DashboardFilter} from "../../../models/dashboard-filter.model";
declare var jQuery:any;

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {

  @ViewChild('lineChart') lineChart:ElementRef;

  dashboardFilter:DashboardFilter;
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartType:string = 'line';


  dateLable:string = '';
  maxDate:Date = new Date();
  selectedDate:Date;
  filterType:'week'|'month'|'year';
  sportType:'Golf'|'NBA'|'NFL'|'NHL'|'Soccer';
  siteType:'DraftKings';
  category:{label:string,value:string};
  categoryTypes = [
    {label: 'Double Up (50/50)', value: 'doubleUp'},
    {label: 'Winner Take All', value: 'winnerTakeAll'},
    {label: 'Satellite', value: 'satellite'},
    {label: 'League', value: 'league'},
    {label: 'Qualifier', value: 'qualifier'},
    {label: 'GPP', value: 'gpp'}];

  constructor(private userService:UserService) {
    this.selectedDate = moment().toDate();
    this.filterType = "week";
  }

  ngOnInit() {
    let endDate = moment(this.selectedDate).add(1, this.filterType).toDate();
    endDate = moment(endDate).isAfter(moment()) ? moment().toDate() : endDate;
    this.dateLable = moment(this.selectedDate).format('MM-DD-YYYY') + " ' To ' " + moment(endDate).format('MM-DD-YYYY');
    this.getChartData();
    //this.updateDashboard();
  }

  onBtnPreviousClicked() {
    this.selectedDate = moment(this.selectedDate).subtract(1, this.filterType).toDate();
    this.updateDashboard();
  }

  onBtnNextClicked() {
    let newDate = moment(this.selectedDate).add(1, this.filterType).toDate();
    this.selectedDate = moment(newDate).isAfter(moment()) ? moment().toDate() : newDate;
    this.updateDashboard();
  }

  onBtnTodayClicked() {
    this.selectedDate = moment().toDate();
    this.updateDashboard();
  }

  filterTimePeriodChanged(timePeriod:'week'|'month'|'year') {
    this.filterType = timePeriod;
    this.updateDashboard();
  }

  isTodayDate():boolean {
    return moment(this.selectedDate).isSame(moment(), 'day');
  }

  onDateChanged() {
    console.log(moment(this.selectedDate).format("DD MM YYYY"));
    this.updateDashboard();
  }

  updateDashboard() {
    let startDate = moment(this.selectedDate).startOf(this.filterType).toDate();
    let endDate = moment(this.selectedDate).endOf(this.filterType).toDate();
    endDate = moment(endDate).isAfter(moment()) ? moment().toDate() : endDate;
    this.dateLable = moment(startDate).format('MM-DD-YYYY') + " ' To ' " + moment(endDate).format('MM-DD-YYYY');
    let data = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      site: this.siteType ? this.siteType : '',
      sport: this.sportType ? this.sportType : '',
      category: this.category ? this.category.value : '',
      time_period: this.filterType
    };
    this.selectedDate = null;
    this.selectedDate = moment(data.startDate).toDate();
    this.dashboardFilter = data;
    this.getChartData(this.dashboardFilter);
  }


  getChartData(data:DashboardFilter = null) {
    this.userService.getProfitByDayOfWeek(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.lineChartData = response.data.datas;
            this.lineChartLabels = response.data.labels;
            let chart = c3.generate({
              bindto: this.lineChart.nativeElement,
              data: {
                columns: [
                  ['amount', ...this.lineChartData]
                ],
                types: {
                  amount: 'area-spline'
                },
                colors: {
                  'amount': '#ffc107'
                }
              },
              point: {
                show: false
              },
              axis: {
                x: {
                  type: 'category',
                  categories: [...this.lineChartLabels]
                },
                y: {
                  tick: {
                    format: (d) => {
                      return "$" + d;
                    }
                  }
                }
              }
            });
          }
          else {

          }
        },
        error => {
          console.log("error => ", error);
        }
      )
  }
}
