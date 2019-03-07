import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
//
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class ReturnsJsonArrayService {

  constructor(private http: Http) {}

  getPeople(path: string): Observable<any> {
        return this.http.get(path)
          .pipe(map(res => res.json()));
  }

}
