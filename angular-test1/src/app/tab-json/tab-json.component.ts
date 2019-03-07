/**tableau test avec le fichier people.json */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';

@Component({
  selector: 'app-tab-json',
  templateUrl: './tab-json.component.html',
  styleUrls: ['./tab-json.component.scss'],
  providers: [ReturnsJsonArrayService]
})
export class TabJsonComponent implements OnInit{
  title = 'app works!';
  content = "";

   data: Observable<Array<any>>;

   constructor(private service: ReturnsJsonArrayService) {
     
   }
   ngOnInit(){
    this.test();

   }

   test(){
    this.service.getPeople('./assets/people.json')
    .subscribe(
      (data) => {
        this.content = data;
        // console.log('content: ' + this.content);
      },
      (err) => {console.log(err)}
    );
   }


 }