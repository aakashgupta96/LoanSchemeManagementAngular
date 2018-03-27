import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {InternalServerErrorComponent} from "./components/internal-server-error/internal-server-error.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {LaunchComponent} from "./components/launch/launch.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: 'app',
    component: LaunchComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full'
  },
  {path: 'fourofour', component: NotFoundComponent},
  {path: '500', component: InternalServerErrorComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', redirectTo: '/fourofour'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
