/**tableau rtl  */
import { Component, OnInit, Input } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators'

@Component({
  selector: 'app-component-tab-rtl',
  templateUrl: './component-tab-rtl.component.html',
  styleUrls: ['./component-tab-rtl.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class ComponentTabRtlComponent implements OnInit {

  content_tab_rtl: any;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

  @Input() date;
  @Input() refresh: Observable<void>;
  
  constructor(private service: ReturnsJsonArrayService) { 

  }


  ngOnInit() {
    //this.tab_rtl()
    this.refreshSubscription = this.refresh.subscribe(() => this.tab_rtl())
  }

  ngOnDestroy(){
   this.refreshSubscription.unsubscribe();
  }


//   tab_rtl(){
//     this.service.getPeople('http://'  + this.ip + '/project/dossier_json/fichier.json')
//     .subscribe(
//       (data) => {
//         this.content_tab_rtl = data;
//         this.isInit = true;
//         // console.log('content_tab_rtl: ' + this.content_tab_rtl);
//       },
//       (err) => {console.log(err)}
//     );
// }


dateFilter() {
  var dateClick = new Date(this.date);
  // console.log(dateClick);

  // console.log(this.content_tab_wifi);
  this.content_tab_rtl.filter((element) => {
    var dateElement = new Date(element.last_time_seen);
    // console.log(element.last_time_seen);
    return dateElement >= dateClick;
  });
  // console.log(this.content_tab_wifi);
}

// dateFilter(){
//   var dateClick = new Date(this.date);
//   var content_tab_rtl_temp;
//   this.content_tab_rtl.forEach((element,index) => {
//     var dateElement = new Date(element.timestamp);
//     // console.log(element.timestamp);
//     // console.log(dateElement);
//     // console.log(dateClick);
//     // console.log(dateElement < dateClick);
//     if (dateElement >= dateClick){
//       // console.log('New rtl detected!');
//       content_tab_rtl_temp.append(element);
//     }
//   });;
//   this.content_tab_rtl = content_tab_rtl_temp;
// }

tab_rtl(){
  // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_rtl.json');
  this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_tab_rtl.json')
  .subscribe(
    (data) => {
      this.content_tab_rtl = data.json();
      this.dateFilter();
    },
    (err) => {console.log(err)}
  );
}

}
