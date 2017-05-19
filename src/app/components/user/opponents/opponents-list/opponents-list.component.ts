import {Component, Input} from "@angular/core";
import {FilterService} from "../../../../services/filter.service";
import {OpponentData} from "../../../../models/opponent-data.model";
/**
 * Created by Hiren on 12-05-2017.
 */

@Component({
  selector:'dfs-opponents-list',
  templateUrl:'./opponents-list.component.html',
  styleUrls:['./opponents-list.component.css']
})
export class OpponentsListComponent{

  @Input() records:OpponentData[];

  constructor(public filterService:FilterService) {

  }

  getDataStyle(data:any, key:string):Object {
    let styleObj;
    switch (data.title) {
      case 'Total won':
      case 'Entry fees':
      case 'Net profit/loss':
      case 'ITM':
      case 'net':
        styleObj = data[key] < 0 ? {'color': 'red'} : {};
        break;
      default:
        styleObj = {};
        break;
    }
    return styleObj;
  }

}
