/**tableau wifi avec fichier fichier.json */
import { Component, OnInit } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';

/** 
export interface PeriodicElement {
   essid: string;
   bssid: string;
   privacy: string;
   nb_sta_co: number;
}*/

@Component({
  selector: 'app-component-tab-wifi',
  templateUrl: './component-tab-wifi.component.html',
  styleUrls: ['./component-tab-wifi.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class ComponentTabWifiComponent implements OnInit {

  content_tab_wifi="";
  isInit = false;

  constructor(private service: ReturnsJsonArrayService) { 

  }

  ngOnInit() {
    this.tab_wifi();
  }


  tab_wifi(){
    this.service.getPeople('./assets/fichier.json')
    .subscribe(
      (data) => {
        this.content_tab_wifi = data;
        this.isInit = true;
        // console.log('content_tab_wifi: ' + this.content_tab_wifi);
      },
      (err) => {console.log(err)}
    );
}

}