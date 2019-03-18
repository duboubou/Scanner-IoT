import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ReturnsJsonArrayService {

  constructor(private http: Http) {}

  getPeople(path: string): Observable<any> {
        return this.http.get(path)
          .pipe(map(res => {
            // console.log('blabla ' + res.json()); 
          }));
  }

  getRequest(path: string): Observable<any> {
    return this.http.get(path);
}

}
