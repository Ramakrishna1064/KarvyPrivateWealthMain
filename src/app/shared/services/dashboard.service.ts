import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { DashBoardParentObject } from '../objectMappers/DahBoardParentObject';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private httpClient: HttpClient) { }

  getTodayActivititesList(data: any): Observable<DashBoardParentObject> {
    return this.httpClient.post<DashBoardParentObject>(environment.baseUrl + 'api/meeting/todayActivities', data).
      pipe(catchError(this.handleError));
  }


  getOverDueActivititesList(data: any): Observable<DashBoardParentObject> {
    return this.httpClient.post<DashBoardParentObject>(environment.baseUrl + 'api/meeting/overdueActivities', data).
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
