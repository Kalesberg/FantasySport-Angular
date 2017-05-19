import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {CohortData} from "../models/cohort-data.model";
import {Http, Headers} from "@angular/http";
import {FilterSettingsConstants, FilterKeyConstants} from "./filter.constant";
import {filter} from "rxjs/operator/filter";
import * as moment from 'moment';
import {FilterCriteria} from "../models/filter-criteria.model";
import {AuthService} from "./auth.service";

/**
 * Created by Hiren on 23-04-2017.
 */

@Injectable()
export class FilterService {
  endpoint:string = "https://api.dfsportgod.com/";
  activeCohortTab:string = CohortTabConstants.SITE;
  activeContestTab:string = ContestTabConstants.CONTESTS;
  activeGraphTab:string = GraphTabConstants.PROFIT;

  filterSettings:any;

  filters:FilterCriteria[];
  cohortFilters:FilterCriteria[];
  contestFilters:FilterCriteria[];

  filtersChangedEvent:EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();
  cohortFilterChangedEvent:EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();
  contestFilterChangedEvent:EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();

  constructor(private http:Http, private authService:AuthService) {

  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (localStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
    }
    return headers;
  }

  retrieveCohortData(tabName:string, filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.getQueryParamStringFromFilters(filters)
    }
    return this.http.get(this.endpoint + 'api/report/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveContestData(tabName:string, filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.getQueryParamStringFromFilters(filters)
    }
    return this.http.get(this.endpoint + 'api/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveOverviewData(filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = 'report/date';
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.getQueryParamStringFromFilters(filters)
    }
    return this.http.get(this.endpoint + 'api/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }


  retrieveGraphData(tabName:string, filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.getQueryParamStringFromFilters(filters)
    }
    /*   return new Observable(
     observer => {
     switch (tabName) {
     case GraphTabConstants.PROFIT:
     observer.next(JSON.parse('{"meta":{"high":22009.33,"total":69,"low":-66786.74,"final":-26434.74},"results":[[1481846400000,-50.0],[1481932800000,-3280.0],[1482019200000,-11739.0],[1482192000000,-10805.0],[1482278400000,-13258.0],[1482364800000,-14458.0],[1482451200000,-15958.0],[1482537600000,-20458.0],[1482883200000,-20624.0],[1482969600000,-21107.0],[1483056000000,-22667.0],[1483228800000,-27967.0],[1483574400000,-27967.0],[1483660800000,-29467.0],[1483747200000,-30533.0],[1484092800000,-31043.0],[1484352000000,-23603.0],[1484438400000,-23903.0],[1484611200000,-24818.0],[1484697600000,-5878.0],[1484784000000,-6938.0],[1484870400000,-9938.0],[1484956800000,-10998.0],[1485043200000,-18858.0],[1485129600000,-19922.0],[1485216000000,-20336.0],[1485302400000,-15396.0],[1485388800000,-17903.0],[1485475200000,-21983.0],[1485561600000,-27283.0],[1485648000000,-29270.0],[1485734400000,-31230.0],[1485820800000,-36530.0],[1485907200000,1620.0],[1485993600000,1593.0],[1486080000000,-3257.0],[1486166400000,-13257.0],[1486339200000,-18557.0],[1486425600000,-19617.0],[1486512000000,-24917.0],[1486598400000,-30217.0],[1486684800000,22009.33],[1486771200000,16489.33],[1486857600000,13809.33],[1486944000000,-710.67],[1487030400000,-1110.67],[1487116800000,-11489.67],[1487203200000,-11477.41],[1487808000000,-2342.41],[1487894400000,-11342.41],[1487980800000,-19975.41],[1488067200000,-19035.41],[1488153600000,-20235.41],[1488240000000,-25535.41],[1488326400000,-31735.41],[1488412800000,-30988.41],[1488499200000,-30988.41],[1488585600000,-46588.41],[1488672000000,-48708.41],[1488758400000,-47840.41],[1488844800000,-49960.41],[1488931200000,-56250.41],[1489017600000,-57750.41],[1489104000000,-63053.41],[1489190400000,-66786.74],[1489276800000,-66786.74],[1489363200000,-25390.74],[1489449600000,-25990.74],[1489536000000,-26434.74]]}'));
     break;
     case GraphTabConstants.SITE:
     observer.next(JSON.parse('{"meta":{},"results":[{"color":"#1bc98e","data":[[1481846400000,-50.0],[1481932800000,-3280.0],[1482019200000,-11739.0],[1482192000000,-10805.0],[1482278400000,-13258.0],[1482364800000,-14458.0],[1482451200000,-15958.0],[1482537600000,-20458.0],[1482883200000,-20624.0],[1482969600000,-21107.0],[1483056000000,-22667.0],[1483228800000,-27967.0],[1483574400000,-27967.0],[1483660800000,-29467.0],[1483747200000,-30533.0],[1484092800000,-31043.0],[1484352000000,-23603.0],[1484438400000,-23903.0],[1484611200000,-24818.0],[1484697600000,-5878.0],[1484784000000,-6938.0],[1484870400000,-9938.0],[1484956800000,-10998.0],[1485043200000,-18858.0],[1485129600000,-19922.0],[1485216000000,-20336.0],[1485302400000,-15396.0],[1485388800000,-17903.0],[1485475200000,-21983.0],[1485561600000,-27283.0],[1485648000000,-29270.0],[1485734400000,-31230.0],[1485820800000,-36530.0],[1485907200000,1620.0],[1485993600000,1593.0],[1486080000000,-3257.0],[1486166400000,-13257.0],[1486339200000,-18557.0],[1486425600000,-19617.0],[1486512000000,-24917.0],[1486598400000,-30217.0],[1486684800000,22009.33],[1486771200000,16489.33],[1486857600000,13809.33],[1486944000000,-710.67],[1487030400000,-1110.67],[1487116800000,-11489.67],[1487203200000,-11477.41],[1487808000000,-2342.41],[1487894400000,-11342.41],[1487980800000,-19975.41],[1488067200000,-19035.41],[1488153600000,-20235.41],[1488240000000,-25535.41],[1488326400000,-31735.41],[1488412800000,-30988.41],[1488499200000,-30988.41],[1488585600000,-46588.41],[1488672000000,-48708.41],[1488758400000,-47840.41],[1488844800000,-49960.41],[1488931200000,-56250.41],[1489017600000,-57750.41],[1489104000000,-63053.41],[1489190400000,-66786.74],[1489276800000,-66786.74],[1489363200000,-25390.74],[1489449600000,-25990.74],[1489536000000,-26434.74]],"name":"DraftKings"}]}'));
     break;
     case GraphTabConstants.SPORT:
     observer.next(JSON.parse('{"meta":{},"results":[{"color":"#1bc98e","data":[[1481846400000,-50.0],[1481932800000,-2170.0],[1482192000000,-1236.0],[1482278400000,-3689.0],[1482451200000,-5189.0],[1482883200000,-5355.0],[1482969600000,-5838.0],[1483056000000,-7398.0],[1483660800000,-8898.0],[1484092800000,-9408.0],[1484611200000,-10323.0],[1484697600000,8617.0],[1484784000000,7557.0],[1484870400000,4557.0],[1484956800000,3497.0],[1485129600000,2433.0],[1485216000000,2019.0],[1485302400000,6959.0],[1485388800000,4452.0],[1485475200000,372.0],[1485561600000,-4928.0],[1485648000000,-6915.0],[1485734400000,-8875.0],[1485820800000,-14175.0],[1485907200000,23975.0],[1485993600000,23948.0],[1486080000000,19098.0],[1486166400000,9098.0],[1486339200000,3798.0],[1486425600000,2738.0],[1486512000000,-2562.0],[1486598400000,-7862.0],[1486684800000,44364.33],[1486771200000,38844.33],[1486857600000,36164.33],[1486944000000,21644.33],[1487030400000,21244.33],[1487116800000,10865.33],[1487808000000,20000.33],[1487894400000,11000.33],[1487980800000,2367.33],[1488067200000,3307.33],[1488153600000,2107.33],[1488240000000,-3192.67],[1488326400000,-9392.67],[1488412800000,-7512.67],[1488499200000,-7512.67],[1488585600000,-23112.67],[1488672000000,-25232.67],[1488758400000,-24364.67],[1488844800000,-26484.67],[1488931200000,-32774.67],[1489017600000,-34274.67],[1489104000000,-39577.67],[1489190400000,-43311.0],[1489276800000,-43311.0],[1489363200000,-1915.0],[1489449600000,-2515.0],[1489536000000,-2959.0]],"name":"NBA"},{"color":"#9f86ff","data":[[1481846400000,0],[1482019200000,-8459.0],[1482537600000,-12959.0],[1483228800000,-18259.0],[1483747200000,-19325.0],[1484352000000,-11885.0],[1484438400000,-12185.0],[1485043200000,-20045.0],[1489536000000,-20045.0]],"name":"NFL"},{"color":"#e4d836","data":[[1481846400000,0],[1483574400000,0.0],[1487203200000,12.26],[1488412800000,-1120.74],[1489536000000,-1120.74]],"name":"Golf"},{"color":"#e64759","data":[[1481846400000,0],[1481932800000,-1110.0],[1489536000000,-1110.0]],"name":"Soccer"}]}'));
     break;
     case GraphTabConstants.CATEGORY:
     observer.next(JSON.parse('{"meta":{},"results":[{"color":"#1bc98e","data":[[1481846400000,0],[1481932800000,-3180.0],[1482019200000,-11454.0],[1482192000000,-10520.0],[1482278400000,-12973.0],[1482364800000,-14173.0],[1482451200000,-15673.0],[1482537600000,-20173.0],[1482883200000,-20339.0],[1482969600000,-20822.0],[1483056000000,-22282.0],[1483228800000,-27582.0],[1483574400000,-27582.0],[1483660800000,-29082.0],[1483747200000,-30148.0],[1484092800000,-30631.0],[1484352000000,-23191.0],[1484438400000,-23491.0],[1484611200000,-24406.0],[1484697600000,-5466.0],[1484784000000,-6526.0],[1484870400000,-9526.0],[1484956800000,-10586.0],[1485043200000,-18446.0],[1485129600000,-19510.0],[1485216000000,-19924.0],[1485302400000,-14984.0],[1485388800000,-17491.0],[1485475200000,-20671.0],[1485561600000,-25971.0],[1485648000000,-27058.0],[1485734400000,-28118.0],[1485820800000,-33418.0],[1485907200000,1282.0],[1485993600000,1255.0],[1486080000000,-1745.0],[1486339200000,-7045.0],[1486425600000,-8105.0],[1486512000000,-13405.0],[1486598400000,-18705.0],[1486684800000,33521.33],[1486771200000,31401.33],[1486857600000,29281.33],[1486944000000,16561.33],[1487030400000,16161.33],[1487116800000,6682.33],[1487203200000,6694.59],[1487808000000,15829.59],[1487894400000,6829.59],[1487980800000,1529.59],[1488067200000,2469.59],[1488153600000,1269.59],[1488240000000,-4030.41],[1488326400000,-9330.41],[1488412800000,-11523.41],[1488499200000,-11523.41],[1488585600000,-16823.41],[1488672000000,-18943.41],[1488758400000,-18075.41],[1488844800000,-20195.41],[1488931200000,-26485.41],[1489017600000,-27985.41],[1489104000000,-33288.41],[1489190400000,-33621.74],[1489276800000,-33621.74],[1489363200000,-32309.74],[1489449600000,-32909.74],[1489536000000,-33353.74]],"name":"GPP"},{"color":"#9f86ff","data":[[1481846400000,0],[1485475200000,-900.0],[1485648000000,-1800.0],[1485734400000,-2700.0],[1486166400000,-12700.0],[1486771200000,-16100.0],[1486944000000,-17900.0],[1487116800000,-18800.0],[1487980800000,-22133.0],[1488326400000,-23033.0],[1488585600000,-33333.0],[1489190400000,-36733.0],[1489363200000,3351.0],[1489536000000,3351.0]],"name":"Qualifier"},{"color":"#e4d836","data":[[1481846400000,-50.0],[1483056000000,-150.0],[1484092800000,-177.0],[1485216000000,-177.0],[1489536000000,-177.0]],"name":"Double Up (50/50)"},{"color":"#e64759","data":[[1481846400000,0],[1481932800000,-50.0],[1482019200000,-235.0],[1485907200000,3215.0],[1486080000000,1365.0],[1486857600000,805.0],[1489536000000,805.0]],"name":"Satellite"}]}'));
     break;
     }
     }
     ).delay(1000);*/
    return this.http.get(this.endpoint + 'api/graph/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveOpponentsData(filters:FilterCriteria[] = null):Observable<any>{
    let queryParams:string = '';
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.getQueryParamStringFromFilters(filters)
    }
    console.log("opponent data in service");
    return this.http.get(this.endpoint + 'api/opponents/profit' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getFilterSettings():Observable<any> {
    return new Observable(observer => {
      if (this.filterSettings) {
        observer.next(this.filterSettings);
      }
      else {
        this.http.get(this.endpoint + 'api/settings', {headers: this.getHeaders()})
          .map(response => response.json())
          .subscribe(
            response => {
              this.filterSettings = response.data;
              console.log(this.filterSettings);
              observer.next(this.filterSettings);
            }
          )
      }
    });
  }

  addFilter(filter:FilterCriteria) {
    this.filters = this.addValueToFilterArray(filter, this.filters);
    this.filtersChangedEvent.emit(this.filters);
  }

  removeFilter(filter:FilterCriteria) {
    this.filters = this.removeValueFromFilterArray(filter, this.filters);
    this.filtersChangedEvent.emit(this.filters);
  }

  clearFilter() {
    this.filters = null;
    this.filtersChangedEvent.emit(this.filters);
  }

  hendleError(error:any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }

  /*addCohortFilter(filter:FilterCriteria) {
   this.cohortFilters = this.addValueToFilterArray(filter, this.cohortFilters);
   this.cohortFilterChangedEvent.emit(this.cohortFilters);
   }

   removeCohortFilter(filter:FilterCriteria) {
   this.cohortFilters = this.removeValueFromFilterArray(filter, this.cohortFilters);
   this.cohortFilterChangedEvent.emit(this.cohortFilters);
   }

   clearCohortFilter() {
   this.cohortFilters = null;
   this.cohortFilterChangedEvent.emit(this.cohortFilters);
   }

   addContestFilter(filter:FilterCriteria) {
   this.contestFilters = this.addValueToFilterArray(filter, this.contestFilters);
   this.contestFilterChangedEvent.emit(this.contestFilters);
   }

   removeContestFilter(filter:FilterCriteria) {
   this.contestFilters = this.removeValueFromFilterArray(filter, this.contestFilters);
   this.contestFilterChangedEvent.emit(this.contestFilters);
   }

   clearContestFilter() {
   this.contestFilters = null;
   this.contestFilterChangedEvent.emit(this.contestFilters);
   }*/

  removeValueFromFilterArray(deleteFilter:FilterCriteria, filterArray:FilterCriteria[]):FilterCriteria[] {
    let searchedFilter:FilterCriteria[] = filterArray.filter(currFilter => {
      if (currFilter.key == deleteFilter.key) {
        return currFilter;
      }
    });
    if (searchedFilter) {
      filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
    }
    return filterArray;
  }

  addValueToFilterArray(newFilter:FilterCriteria, filterArray:FilterCriteria[]):FilterCriteria[] {
    if (!filterArray) {
      filterArray = [];
    }
    if (newFilter.key == FilterKeyConstants.FEE) {
      let searchedFilter:FilterCriteria[] = filterArray.filter(currFilter => {
        if (currFilter.key == FilterKeyConstants.FREE_ROLL) {
          return currFilter;
        }
      });
      if (searchedFilter) {
        filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
      }
    }
    else if (newFilter.key == FilterKeyConstants.FREE_ROLL) {
      let searchedFilter:FilterCriteria[] = filterArray.filter(currFilter => {
        if (currFilter.key == FilterKeyConstants.FEE) {
          return currFilter;
        }
      });
      if (searchedFilter) {
        filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
      }
    }
    let searchedFilter:FilterCriteria[] = filterArray.filter(currFilter => {
      if (currFilter.key == newFilter.key) {
        return currFilter;
      }
    });
    if (searchedFilter && searchedFilter.length) {
      filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1, newFilter);
    }
    else {
      filterArray.push(newFilter);
    }
    return filterArray;
  }

  getQueryParamStringFromFilters(filters:FilterCriteria[]):string {
    let queryStr = '';
    filters.forEach((currFilter, index) => {
      if (index == 0) {
        queryStr = queryStr + this.getFilterKey(currFilter) + "=" + this.getFilterValue(currFilter);
      } else {
        queryStr = queryStr + "&" + this.getFilterKey(currFilter) + "=" + this.getFilterValue(currFilter);
      }

    });
    console.log("queryStr => ", queryStr);
    return queryStr;
  }

  getFilterKey(filter:FilterCriteria):string {
    let key:string;
    switch (filter.key) {
      case FilterKeyConstants.FREE_ROLL:
        key = FilterKeyConstants.FEE;
        break;
      default:
        key = filter.key;
        break;
    }
    return key;
  }

  getFilterValue(filter:FilterCriteria):string {
    let value:string;
    switch (filter.key) {
      case FilterKeyConstants.DATE_FROM:
      case FilterKeyConstants.DATE_TO:
      case FilterKeyConstants.DATE_EXACT:
        value = moment(filter.value).format('YYYY-MM-DD');
        break;
      case FilterKeyConstants.FEE:
        let minValue = filter.value.min ? filter.value.min : '';
        let maxValue = filter.value.max ? filter.value.max : '';
        value = minValue + "-" + maxValue;
        break;
      case FilterKeyConstants.NO_OF_CONTEST_ENTRIES:
        let minContestValue = filter.value.min_contest ? filter.value.min_contest : '';
        let maxContestValue = filter.value.max_contest ? filter.value.max_contest : '';
        value = minContestValue + "-" + maxContestValue;
        break;
      default:
        value = filter.value;
        break;
    }
    return value;
  }
}


export const CohortTabConstants = {
  SITE: 'site',
  SPORT: 'sport',
  CATEGORY: 'category',
  SIZE: 'size',
  FEE: 'fee',
  SLATE: 'slate',
  YEAR: 'year',
  MONTH: 'month',
  WEEKDAY: 'weekday'
};

export const CohortTabs:{value:string,label:string}[] = [
  {value: CohortTabConstants.SITE, label: 'SITE'},
  {value: CohortTabConstants.SPORT, label: 'SPORT'},
  {value: CohortTabConstants.SIZE, label: 'SIZE'},
  {value: CohortTabConstants.FEE, label: 'FEE'},
  {value: CohortTabConstants.YEAR, label: 'YEAR'},
  {value: CohortTabConstants.MONTH, label: 'MONTH'},
  {value: CohortTabConstants.WEEKDAY, label: 'WEEKDAY'}
];

export const ContestTabConstants = {
  CONTESTS: 'contest',
  ENTRIES: 'entry'
};

export const ContestTabs:{value:string,label:string}[] = [
  {value: ContestTabConstants.CONTESTS, label: 'CONTESTS'},
  {value: ContestTabConstants.ENTRIES, label: 'ENTRIES'}
];

export const GraphTabConstants = {
  PROFIT: 'profit',
  SITE: 'site',
  SPORT: 'sport',
  CATEGORY: 'category'
};

export const GraphTabs:{value:string,label:string}[] = [
  {value: GraphTabConstants.PROFIT, label: 'PROFIT'},
  {value: GraphTabConstants.SITE, label: 'BY SITE'},
  {value: GraphTabConstants.SPORT, label: 'BY SPORT'}
];
