import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoanAppMaterialModule} from './modules/loan-app-material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "./services/authentication.service";
import {LoaderService} from "./services/loader.service";
import {NetworkService} from "./services/network.service";
import {NotificationService} from "./services/notificaton.service";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NotificationComponent} from "./components/notification-container/notification/notification.component";
import {NotificationContainerComponent} from "./components/notification-container/notification-container.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoanAppErrorHandler} from "./misc/loan-app.error-handler";
import {LoginComponent} from "./components/login/login.component";
import {InternalServerErrorComponent} from "./components/internal-server-error/internal-server-error.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";

@NgModule({
  declarations: [
    AppComponent,
    NotificationContainerComponent,
    NotificationComponent,
    LoginComponent,
    InternalServerErrorComponent,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    LoanAppMaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    LoaderService,
    NetworkService,
    NotificationService,
    StorageService,
    UserService,
    LoanAppErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
