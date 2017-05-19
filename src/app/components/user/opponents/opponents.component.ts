import {Component, OnInit, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../../../services/auth.service';
import {FilterCriteria} from "../../../models/filter-criteria.model";
import {FilterService} from "../../../services/filter.service";
import {OpponentData} from "../../../models/opponent-data.model";

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html'
})
export class OpponentsComponent {

  records:OpponentData[];
  isLoading:boolean;
  filters:FilterCriteria[];
  filterSettings:any;
  filterEventSubscription:any;

  constructor(private authService:AuthService, private filterService:FilterService) {
    this.filterEventSubscription = this.filterService.filtersChangedEvent.subscribe(
      filters => {
        this.getData(filters);
        this.filters = filters;
      }
    );
    this.filters = this.filterService.filters;
    this.filterService.getFilterSettings()
      .subscribe(settings => {
        this.filterSettings = settings
      });
  }

  ngOnInit() {
    console.log("Opponent Init");
    this.getData();
  }

  getData(filters:FilterCriteria[] = null) {
    console.log("onInit Opponent");
    this.isLoading = true;
    this.filterService.retrieveOpponentsData(filters)
      .subscribe(
        data => {
          if (data.statusCode == 200) {
            if (data.data) {
              this.records = data.data as OpponentData[];
            }
            this.isLoading = false;
          }
        });
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

}
