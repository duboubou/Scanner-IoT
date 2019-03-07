/**tableau rtl avec fichier fichier.json */
import { Component, OnInit } from '@angular/core';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';


@Component({
  selector: 'app-component-tab-rtl',
  templateUrl: './component-tab-rtl.component.html',
  styleUrls: ['./component-tab-rtl.component.scss']
})
export class ComponentTabRtlComponent implements OnInit {

  content_tab_rtl="";
  isInit = false;

  constructor(private service: ReturnsJsonArrayService) { 

  }

  ngOnInit() {
    this.tab_rtl();
  }


  tab_rtl(){
    this.service.getPeople('./assets/fichier.json')
    .subscribe(
      (data) => {
        this.content_tab_rtl = data;
        this.isInit = true;
        // console.log('content_tab_rtl: ' + this.content_tab_rtl);
      },
      (err) => {console.log(err)}
    );
}

}
