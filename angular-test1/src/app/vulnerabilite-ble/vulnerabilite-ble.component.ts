import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval'
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-vulnerabilite-ble',
  templateUrl: './vulnerabilite-ble.component.html',
  styleUrls: ['./vulnerabilite-ble.component.scss']
})
export class VulnerabiliteBleComponent implements OnInit {

  ip = '172.20.10.2';

  constructor(private service: ReturnsJsonArrayService) { }

  ngOnInit() {
  }

  handleClickBleu(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/ampoule/bleu.php')
      .subscribe(
        () => {
          console.log('bleu');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickVert(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/ampoule/vert.php')
      .subscribe(
        () => {
          console.log('vert');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickRouge(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/ampoule/rouge.php')
      .subscribe(
        () => {
          console.log('rouge');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickON(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/ampoule/on.php')
      .subscribe(
        () => {
          console.log('On');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickOFF(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/ampoule/off.php')
      .subscribe(
        () => {
          console.log('Off');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickONBip(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/bip/on.php')
      .subscribe(
        () => {
          console.log('On bip');
        },
        (err) => { console.log(err) }
      );
  }

  handleClickOFFBip(event: Event) {
    this.service.getPeople('http://'  + this.ip + '/project/bip/off.php')
      .subscribe(
        () => {
          console.log('Off bip');
        },
        (err) => { console.log(err) }
      );
  }

}
