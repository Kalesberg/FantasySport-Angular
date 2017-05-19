import {AuthService} from './../../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ContestTabs, ContestTabConstants, FilterService} from "../../../services/filter.service";
import {ContestData} from "../../../models/contest";
import {Router, ActivatedRoute} from "@angular/router";
import {FilterCriteria} from "../../../models/filter-criteria.model";
declare var jQuery:any;

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html'
})
export class ContestComponent implements OnInit {

  display:boolean;
  contestTabs = ContestTabs;
  contestTabConstants = ContestTabConstants;

  activeTab:string = this.contestTabConstants.CONTESTS;

  records:ContestData[] = [];
  filters:FilterCriteria[];
  filterSettings:any;
  isLoading:boolean;
  filterEventSubscription:any;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private filterService:FilterService) {
    this.filterEventSubscription = this.filterService.filtersChangedEvent.subscribe(
      filters => {
        this.getData(this.filterService.activeContestTab, filters);
        this.filters = filters;
      }
    );
    this.filters = this.filterService.filters;
    this.filterService.getFilterSettings()
      .subscribe(settings => {this.filterSettings = settings});
  }

  ngOnInit() {
    this.filterService.activeCohortTab = ContestTabConstants.CONTESTS;
    this.activeTab = this.filterService.activeContestTab;
    this.activeRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty('tab')) {
          this.getData(params['tab'], this.filterService.filters);
          this.activeTab = this.filterService.activeContestTab = params['tab'];
        }
        else {
          this.router.navigate(['/contests'], {queryParams: {tab: this.activeTab}})
        }
      }
    )
  }

  getData(tabName, filters:FilterCriteria[] = null) {
    this.isLoading = true;
    this.filterService.retrieveContestData(tabName, filters)
      .subscribe(
        data => {
          if (data.statusCode == 200) {
            this.filterService.activeCohortTab = tabName;
            this.records = data.data;
            this.isLoading = false;
          }
        });
  }

  onContestTabChanged(tabName:{value:string,label:string}) {
    this.activeTab = tabName.value;
    this.router.navigate(['/contests'], {queryParams: {tab: tabName.value}})
  }

  onAddFilterEventHandler(filter:FilterCriteria) {
    this.filterService.addFilter(filter);
  }

  onRemoveFilterEvent(filter:FilterCriteria) {
    this.filterService.removeFilter(filter);
  }

  onRemoveAllFiltersEvent(filters:FilterCriteria[]) {
    this.filterService.clearFilter();
  }

  ngOnDestroy() {
    this.filterEventSubscription.unsubscribe();
  }
}
