import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {InternalServerErrorComponent} from "./components/internal-server-error/internal-server-error.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
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
