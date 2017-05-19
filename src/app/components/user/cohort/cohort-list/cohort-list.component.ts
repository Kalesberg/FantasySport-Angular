import {Component, Input} from "@angular/core";
import {FilterService} from "../../../../services/filter.service";
import {CohortData} from "../../../../models/cohort-data.model";
/**
 * Created by Hiren on 23-04-2017.
 */

@Component({
  selector: 'dfs-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort.component.css', '../../../../../assets/css/userdashboard/custom.css']
})
export class CohortListComponent {

  tabName:string;

  @Input() records:CohortData[];

  constructor(public filterService:FilterService) {
    this.tabName = this.filterService.activeCohortTab;
  }

  getTitleField():string {
    let name = '';
    if (this.records && this.records.length  && this.records[0].hasOwnProperty(this.filterService.activeCohortTab)) {
      name = this.filterService.activeCohortTab;
    }
    else {
      name = 'group';
    }
    return name
  }

}
