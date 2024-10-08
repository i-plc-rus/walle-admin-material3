import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISupStatResponse } from '../models/sup-stat-response';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackAPIService {

  private urlAPIMS = 'http://192.168.111.41:8100/api/v1/';  // URL to web api
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    this.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getSupStat(sup_id: number): Observable<ISupStatResponse> {
    const url = `${this.urlAPIMS}sup_stat/?supid=${sup_id}`;
    const headers = this.headers;
    return this.http.get<ISupStatResponse>(url, { headers })
      .pipe(catchError(this.handleError))
  }

  getSupStatV2(sup_id: number, d1: Date, d2: Date): Observable<ISupStatResponse> {
    /*console.log(sup_id,d1,d2)
    if (!sup_id || !d1 || !d2) {
      console.log('Observable<ISupStatResponse>');
      return new Observable<ISupStatResponse>();
    }*/
    const headers = this.headers;
    const url = `${this.urlAPIMS}sup_stat/?supid=${sup_id}&d1=${d1?.toISOString().slice(0, 10)}&d2=${d2?.toISOString().slice(0, 10)}`;
    return this.http.get<ISupStatResponse>(url, { headers })
      .pipe(catchError(this.handleError))
  }

}
