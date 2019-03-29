import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient} from '@angular/common/http';



@Injectable()
export class ReturnsJsonArrayService {
  ip = '172.20.10.2';
  x = 0;
  constructor(private http: Http) {console.log(this.getJSON().subscribe(data => {
  		console.log(data);
  	}))
  }

  getJSON(): Observable<any> {
  	return this.http.get('http://'  + this.ip + '/project/dossier_json/req_cam1.json');
  }

  public getJSON2() : Observable<any> {
    return this.http.get('http://'  + this.ip + '/project/dossier_json/req_cam2.json')
  }

  public getJSON3() : Observable<any> {
    return this.http.get('http://'  + this.ip + '/project/dossier_json/req_cam3.json')
  }

  public getJSON4() : Observable<any> {
    return this.http.get('http://'  + this.ip + '/project/dossier_json/req_cam4.json')
  }

  getPeople(path: string): Observable<any> {
        return this.http.get(path)
          .pipe(map(res => {
            // console.log('blabla ' + res.json()); 
          }));
  }

  getRequest(path: string): Observable<any> {
    return this.http.get(path);
}

// getCam1(): Observable<any>{


//   getCam1(){
//   return this.http.get('http://' + this.ip + '/project/dossier_json/req_cam1.json')
//   //.pipe(map(res => {
//    // .subscribe(res => {console.log(res)})
//     .subscribe(res => { })
//   // let x =  JSON.parse(res._body);
// }


// // }));

// getCam2(){
//   return this.http.get('http://' + this.ip + '/project/dossier_json/req_cam2.json')
//   .pipe(map(res => {

//   }));
// }

// getCam3(){
//   return this.http.get('http://' + this.ip + '/project/dossier_json/req_cam3.json')
//   .pipe(map(res => {

//   }));
// }

// getCam4(){
//   return this.http.get('http://' + this.ip + '/project/dossier_json/req_cam4.json')
//   .pipe(map(res => {

//   }));
// }

}
