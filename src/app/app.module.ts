import {PasswordValidator} from './directives/password-validator';
import {VerifyEmailComponent, ChangePasswordComponent} from './components/front/front.component';
//Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {SimpleNotificationsModule} from 'angular2-notifications';
import {
  SharedModule,
  ButtonModule,
  DialogModule,
  SliderModule,
  SelectButtonModule,
  FileUploadModule,
  OverlayPanelModule,
  CalendarModule,
  ToggleButtonModule
} from 'primeng/primeng';
import {DataTableModule as PDataTableModule} from 'primeng/primeng';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {DropzoneModule, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BusyModule} from 'angular2-busy';
import 'hammerjs';
import {DataTableModule} from "angular2-datatable";
//Routes
import {AppRoutes} from './routes/app.routes';

//Components
import {LoginComponent, LogoutComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MlbComponent, MlbPlayerComponent} from './components/admin/mlb/mlb.component';
import {
  MembersComponent,
  AddMemberComponent,
  UploadMemberComponent
} from './components/admin/members/members.component';
import {
  CmsComponent,
  AddCmsComponent,
  EditCmsComponent
} from './components/admin/cms/cms.component';


import {MainComponent} from './components/main.component';

//Services
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {ArticleService} from './services/article.service';

// Admin Layouts
import {LeftSidebar} from './layouts/admin/left-sidebar/left-sidebar.component';
import {Topbar} from './layouts/admin/left-sidebar/left-sidebar.component';
import {AdminHead} from './layouts/admin/left-sidebar/left-sidebar.component';


//FrontEnd Components
import {
  VerifyTokenComponent,
  HomepageComponent,
  BankrollComponent,
  ContactUsComponent,
  AboutComponent,
  ResearchToolComponent
} from './components/front/front.component';
import {ContestsComponent} from './components/contests/contests.component';
import {UserdashboardComponent} from './components/user/userdashboard/userdashboard.component';
import {OpponentsComponent} from './components/user/opponents/opponents.component';

//FrontEnd Layouts
import {UserlayoutComponent} from './layouts/userlayout/userlayout.component';
import {FrontLayout} from './layouts/front/FrontLayout.component';
import {FrontFooter} from './layouts/front/FrontLayout.component';
import {UploadComponent} from './components/user/upload/upload.component';
import {ContestComponent} from './components/user/contest/contest.component';
import {RegisterComponent} from './components/register/register.component';
import {OverviewComponent} from './components/user/overview/overview.component';
import {GraphComponent} from './components/user/graph/graph.component';
import {SearchComponent} from './components/user/search/search.component';
import {CohortComponent} from './components/user/cohort/cohort.component';
import {ArticlesComponent} from './components/front/articles/articles.component';
import {BankrollCalculatorComponent} from './components/front/bankroll-calculator/bankroll-calculator.component';
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DFSMaterialModule} from "./dfsmaterialmodule/dfs-material-components.module";
import {CohortListComponent} from "./components/user/cohort/cohort-list/cohort-list.component";
import {FilterService} from "./services/filter.service";
import {DashboardStaticsComponent} from "./components/user/userdashboard/dashboard-statics/dashboard-statics.component";
import {DashboardTopWinsComponent} from "./components/user/userdashboard/dashboard-top-wins/dashboard-top-wins.component";
import {TabViewComponent} from "./components/user/common/tab-view/tab-view.component";
import {ContestListComponent} from "./components/user/contest/conetst-list/contest-list.component";
import { DfsGlossaryComponent } from './components/front/dfs-glossary/dfs-glossary.component';
import { GettingStartedVideosComponent } from './components/front/getting-started-videos/getting-started-videos.component';
import {AppliedFiltersComponent} from "./components/user/search/applied-filters/applied-filters.component";
import {OverviewlistComponent} from "./components/user/overview/overview-list/overview-list.component";
import {DFSAmountPipe} from "./ng-pipes/dfs-amount.pipe";
import {OpponentsListComponent} from "./components/user/opponents/opponents-list/opponents-list.component";
import {SignUpComponent} from "./components/front/sign-up/sign-up.component";
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    LeftSidebar,
    Topbar,
    AdminHead,
    LogoutComponent,
    MlbComponent,
    MlbPlayerComponent,
    BankrollComponent,
    MembersComponent,
    AddMemberComponent,
    UploadMemberComponent,
    CmsComponent,
    AddCmsComponent,
    EditCmsComponent,
    ContestsComponent,
    UserdashboardComponent,
    UserlayoutComponent,
    HomepageComponent,
    ResearchToolComponent,
    ContactUsComponent,
    AboutComponent,
    FrontLayout,
    FrontFooter,
    UploadComponent,
    ContestComponent,
    OpponentsComponent,
    RegisterComponent,
    VerifyTokenComponent,
    VerifyEmailComponent,
    ChangePasswordComponent,
    PasswordValidator,
    OverviewComponent,
    GraphComponent,
    SearchComponent,
    CohortComponent,
    ArticlesComponent,
    BankrollCalculatorComponent,
    CohortListComponent,
    DashboardStaticsComponent,
    DashboardTopWinsComponent,
    TabViewComponent,
    ContestListComponent,
    DfsGlossaryComponent,
    GettingStartedVideosComponent,
    AppliedFiltersComponent,
    OverviewlistComponent,
    DFSAmountPipe,
    OpponentsListComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    SimpleNotificationsModule.forRoot(),
    DataTableModule,
    SharedModule,
    SliderModule,
    SelectButtonModule,
    DialogModule,
    FileUploadModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    DropzoneModule.forRoot(),
    ChartsModule,
    BusyModule,
    OverlayPanelModule,
    CalendarModule,
    ToggleButtonModule,
    DFSMaterialModule,
    ButtonModule,
    PDataTableModule
  ],
  providers: [AuthService, AuthGuard, UserService, FilterService, ArticleService],
  bootstrap: [MainComponent]
})
export class AppModule {
  constructor() {

  }
}
