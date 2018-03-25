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

@NgModule({
  declarations: [
    AppComponent,
    NotificationContainerComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    LoanAppMaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    LoaderService,
    NetworkService,
    NotificationService,
    StorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
