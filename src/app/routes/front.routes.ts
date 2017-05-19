import { BankrollCalculatorComponent } from './../components/front/bankroll-calculator/bankroll-calculator.component';
import { ArticlesComponent } from './../components/front/articles/articles.component';
import { CohortComponent } from './../components/user/cohort/cohort.component';
import { GraphComponent } from './../components/user/graph/graph.component';
import { OverviewComponent } from './../components/user/overview/overview.component';
import { VerifyTokenComponent, VerifyEmailComponent, ChangePasswordComponent, AboutComponent } from './../components/front/front.component';
import { OpponentsComponent } from './../components/user/opponents/opponents.component';
import { RegisterComponent } from './../components/register/register.component';
import { BankrollComponent } from '../components/front/front.component';
import { HomepageComponent } from '../components/front/front.component';
import { ResearchToolComponent } from '../components/front/front.component';
import { ContactUsComponent } from '../components/front/front.component';
import { UserService } from '../services/user.service';
import { UserdashboardComponent } from '../components/user/userdashboard/userdashboard.component';
import { UploadComponent } from '../components/user/upload/upload.component';
import { ContestComponent } from '../components/user/contest/contest.component';
import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/login/login.component';
import {Route} from "@angular/router/router";
import {CohortChildRoute} from "./cohort-child.routes";
import { DfsGlossaryComponent } from './../components/front/dfs-glossary/dfs-glossary.component';
import { GettingStartedVideosComponent } from './../components/front/getting-started-videos/getting-started-videos.component';
import {SignUpComponent} from "../components/front/sign-up/sign-up.component";

export const FrontRoutes = [
{ path: '', component: HomepageComponent,data:{title:"Home"}},
// { path: '', component: LoginComponent,data:{title:"Login"}},
{ path: ':token/verify', component: VerifyTokenComponent,data:{title:"Verify User"}},
{ path: ':token/changepassword', component: ChangePasswordComponent,data:{title:"Change Password"}},
{ path: 'verify', component: VerifyEmailComponent,data:{title:"Verify Email"}},
{ path: 'bankroll', component: BankrollComponent,data:{title:"Bankroll"}},
{ path: 'research-tool', component: ResearchToolComponent,data:{title:"Research Tool"}},
{ path: 'contact-us', component: ContactUsComponent,data:{title:"Contact Us"}},
{ path: 'about-us', component: AboutComponent,data:{title:"About Us"}},
{ path: 'articles', component: ArticlesComponent,data:{title:"Articles"}},
{ path: 'bankroll-calculator', component: BankrollCalculatorComponent,data:{title:"Bankroll Calculator"}},
{ path: 'dfs-glossary', component: DfsGlossaryComponent,data:{title:"DFS Glossary"}},
{ path: 'getting-started-videos', component: GettingStartedVideosComponent,data:{title:"Getting Started Videos"}},
{ path: 'login', component: LoginComponent,data:{title:"Login"}},
{ path: 'register', component: RegisterComponent,data:{title:"Register"}},
{ path: 'dashboard', component: UserdashboardComponent,canActivate: [UserService],data:{title:"Dashboard",type:"user"} },
{ path: 'uploads', component: UploadComponent,canActivate: [UserService],data:{title:"Upload",type:"user"} },
{ path: 'contests', component: ContestComponent,canActivate: [UserService],data:{title:"Contests",type:"user"} },
{ path: 'opponents', component: OpponentsComponent,canActivate: [UserService],data:{title:"Opponents",type:"user"} },
{ path: 'overview', component: OverviewComponent,canActivate: [UserService],data:{title:"Overview",type:"user"} },
{ path: 'graphs', component: GraphComponent,canActivate: [UserService],data:{title:"Graphs",type:"user"} },
{ path: 'cohort', component: CohortComponent,canActivate: [UserService],data:{title:"Cohort",type:"user"}},
{ path: 'logout', component: LogoutComponent },
{ path: 'signup', component: SignUpComponent,data:{title:'Sign Up — DF Sports Gods'} }
];
