import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../../../services/auth.service';
import {FilterCriteria} from "../../../models/filter-criteria.model";
import {FilterService} from "../../../services/filter.service";
import {OverviewData} from "../../../models/overview-data.model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  records:OverviewData[];
  filters:FilterCriteria[];
  filterSettings:any;
  isLoading:boolean;
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
      .subscribe(settings => {this.filterSettings = settings});
  }

  ngOnInit() {
    this.getData();
  }

  getData(filters:FilterCriteria[] = null) {
    this.isLoading = true;
    this.filterService.retrieveOverviewData(filters)
      .subscribe(
        data => {
          if (data.statusCode == 200) {
            if (data.data && Array.isArray(data.data)) {
              this.records = data.data as OverviewData[];
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

  ngOnDestroy() {
    this.filterEventSubscription.unsubscribe();
  }
}
