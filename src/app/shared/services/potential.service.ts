import { PotentialParentObject } from './../objectMappers/PotentialParentObject';
import { LeadsParentObject } from '../objectMappers/LeadsParentObject';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PotentialService {

  constructor(private httpClient: HttpClient) { }

  getPotentialList(data: any): Observable<PotentialParentObject> {
    return this.httpClient.post<PotentialParentObject>(environment.baseUrl + 'api/potential/search', data).pipe(catchError(this.handleError));
  }

  /**
   * handleError
   * @param errorResponse 
   */
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      //console.error('Client Side Error---> :', errorResponse.error.message);
    } else {
      //console.error('Server Side Error---> :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
