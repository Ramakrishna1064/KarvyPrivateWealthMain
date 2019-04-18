import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { InterceptorSkipHeader } from '../shared/interceptors/authInterceptors';
import { GlobalVariables } from '../shared/utilities/constants';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService, private toast: ToastrService) {
      console.log("constructor");
     }

  ngOnInit() {
    console.log("ngOnInit");
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (navigator.onLine) {
      const headers = new HttpHeaders().set(InterceptorSkipHeader, '')
      this.loginService.login(form.value, headers).subscribe(data => {
        console.log('--->' + JSON.stringify(data));
        const serverData: any = JSON.parse(JSON.stringify(data));
        if (serverData.status == 'success') {
          localStorage.setItem(GlobalVariables.AUTHERIZATION_TOEKN, serverData.access_token);
          localStorage.setItem(GlobalVariables.USER_ID, serverData.userId);
          this.router.navigate([""]);
        } else {
          this.toast.error(serverData.message, "Fail!");
        }
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error instanceof ErrorEvent) {
          this.toast.error(errorResponse.error.message, "Client Error");
        } else {
          this.toast.error(errorResponse.error.message, "Server Error");
        }
      });
    } else {
      this.toast.error(GlobalVariables.CHECK_INTERNET_CONNECTION, "Fail!");
    }
  }
}



