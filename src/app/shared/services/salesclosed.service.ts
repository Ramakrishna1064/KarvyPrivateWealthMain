import { CallMettingParentObject } from './../objectMappers/CallMettingParentObject';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { SalesParentObject } from '../objectMappers/SalesParentObject';

@Injectable({
  providedIn: 'root'
})
export class SalesClosedService {

  constructor(private httpClient: HttpClient) { }

  getSalesClosedList(data: any): Observable<SalesParentObject> {
    return this.httpClient.post<SalesParentObject>(environment.baseUrl + 'api/closedSale/search', data).
      pipe(catchError(this.handleError));
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
