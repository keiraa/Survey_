import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import {BnNgIdleService} from 'bn-ng-idle'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'
import { EventService } from './event.service'

import { TokenInterceptorService } from './token-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService,AuthGuard, EventService, BnNgIdleService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
   }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
