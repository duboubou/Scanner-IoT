import { Component, OnInit, Input } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-vulnerabilite-rtl',
  templateUrl: './vulnerabilite-rtl.component.html',
  styleUrls: ['./vulnerabilite-rtl.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class VulnerabiliteRtlComponent implements OnInit {

  content_tab_temperature: any;
  content_tab_humidity: any;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

 // @Input() date;
  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) { }

  ngOnInit() {
    this.refreshSubscription = this.refresh.subscribe(() => this.tab_temperature())
    this.refreshSubscription = this.refresh.subscribe(() => this.tab_humidity())
  }

  ngOnDestroy(){
    this.refreshSubscription.unsubscribe();
   }

   tab_temperature(){
    // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json');
    this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_temperature.json')
    .subscribe(
      (data) => {
        console.log(data.json());
        this.content_tab_temperature = data.json();

      },
      (err) => {console.log(err)}
    );
  }

  tab_humidity(){
    // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json');
    this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_humidity.json')
    .subscribe(
      (data) => {
        console.log(data.json());
        this.content_tab_humidity = data.json();
        
      },
      (err) => {console.log(err)}
    );
  }
}
