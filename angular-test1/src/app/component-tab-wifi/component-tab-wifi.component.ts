/**tableau wifi  */
import { Component, OnInit, Input } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-component-tab-wifi',
  templateUrl: './component-tab-wifi.component.html',
  styleUrls: ['./component-tab-wifi.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class ComponentTabWifiComponent implements OnInit {

  content_tab_wifi: any;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

  @Input() date;
  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) {

  }

  ngOnInit() {
    this.refreshSubscription = this.refresh.subscribe(() => this.tab_wifi())
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }


  dateFilter() {
    var dateClick = new Date(this.date);
    // console.log(dateClick);

    // console.log(this.content_tab_wifi);
    this.content_tab_wifi.filter((element) => {
      var dateElement = new Date(element.last_time_seen);
      // console.log(element.last_time_seen);
      return dateElement >= dateClick;
    });
    // console.log(this.content_tab_wifi);
  }


  tab_wifi() {
    // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_wifi2.json');
    this.service.getRequest('http://' + this.ip + '/project/dossier_json/req_tab_wifi2.json')
      .subscribe(
        (data) => {
          this.content_tab_wifi = data.json();
          this.dateFilter();
        },
        (err) => { console.log(err) }
      );
  }

}