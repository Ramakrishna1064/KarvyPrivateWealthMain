import { CustomerService } from './shared/services/customer.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './shared/services/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeadsService } from './shared/services/leads.service';
import { ErrorInterceptor } from './shared/interceptors/errorInterceptors';
import { AutherizationInterceptor } from './shared/interceptors/authInterceptors';
import { ToastrModule } from 'ngx-toastr';
import { CallMettingService } from './shared/services/callMetting.service';
import { PotentialService } from './shared/services/potential.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    //Services
    //Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutherizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    //Guards
    AuthGuard
    //Resolvers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
