import {NgModule} from "@angular/core";
import {
  MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule,
  MdSlideToggleModule, MdTooltipModule,MdMenuModule
} from "@angular/material";
/**
 * Created by Hiren on 22-04-2017.
 */

@NgModule({
  imports:[
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdMenuModule
  ],
  exports:[
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdMenuModule
  ]
})
export class DFSMaterialModule{

}
