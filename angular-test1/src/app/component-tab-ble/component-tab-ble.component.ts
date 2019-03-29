/**tableau ble */
import { Component, OnInit, Input } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-component-tab-ble',
  templateUrl: './component-tab-ble.component.html',
  styleUrls: ['./component-tab-ble.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class ComponentTabBleComponent implements OnInit {

  content_tab_ble: any;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

  @Input() date;
  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) { 

  }

  ngOnInit() {
    //this.tab_ble()
    this.refreshSubscription = this.refresh.subscribe(() => this.tab_ble())
  }

  ngOnDestroy(){
   this.refreshSubscription.unsubscribe();
  }


//   tab_ble(){
//     this.service.getPeople('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json')
//     .subscribe(
//       (data) => {
//         this.content_tab_ble = data;
//         this.isInit = true;
//         // console.log('content_tab_ble: ' + this.content_tab_ble);
//       },
//       (err) => {console.log(err)}
//     );
// }


dateFilter() {
  var dateClick = new Date(this.date);
  // console.log(dateClick);

  // console.log(this.content_tab_wifi);
  this.content_tab_ble.filter((element) => {
    var dateElement = new Date(element.last_time_seen);
    // console.log(element.last_time_seen);
    return dateElement >= dateClick;
  });
  // console.log(this.content_tab_wifi);
}

// dateFilter(){
//   var dateClick = new Date(this.date);
//   var content_tab_ble_temp;
//   this.content_tab_ble.forEach((element,index) => {
//     var dateElement = new Date(element.last_time_ble);
//     // console.log(element.last_time_ble);
//     // console.log(dateElement);
//     // console.log(dateClick);
//     // console.log(dateElement < dateClick);
//     if (dateElement >= dateClick){
//       // console.log('New ble detected!');
//       content_tab_ble_temp.append(element);
//     }
//   });;
//   this.content_tab_ble = content_tab_ble_temp;
// }


tab_ble(){
  // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json');
  this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json')
  .subscribe(
    (data) => {
      this.content_tab_ble = data.json();
      this.dateFilter();
    },
    (err) => {console.log(err)}
  );
}

}