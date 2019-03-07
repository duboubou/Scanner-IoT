/**tableau ble avec fichier fichier.json */
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
  selector: 'app-component-tab-ble',
  templateUrl: './component-tab-ble.component.html',
  styleUrls: ['./component-tab-ble.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class ComponentTabBleComponent implements OnInit {

  content_tab_ble="";
  isInit = false;

  constructor(private service: ReturnsJsonArrayService) { 

  }

  ngOnInit() {
    this.tab_ble();
  }


  tab_ble(){
    this.service.getPeople('./assets/fichier.json')
    .subscribe(
      (data) => {
        this.content_tab_ble = data;
        this.isInit = true;
        // console.log('content_tab_ble: ' + this.content_tab_ble);
      },
      (err) => {console.log(err)}
    );
}

}