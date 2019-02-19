import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';

@Component({
  selector: 'app-tab-json',
  templateUrl: './tab-json.component.html',
  styleUrls: ['./tab-json.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class TabJsonComponent {
  title = 'app works!';

   data: Observable<Array<any>>;

   constructor(private service: ReturnsJsonArrayService) {
     this.data = service.getPeople();
     console.log("AppComponent.data:" + this.data);
   }

 }
