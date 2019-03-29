import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ReturnsJsonArrayService } from './returns-json-array.service';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval'
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scanner IoT';
  color = 'primary';
  mode = 'indeterminate';
  content_php = '';
  isInit = false;
  scanIsLaunched = false;
  scanLaunched;
  ip = '172.20.10.2';

  private refresh: Subject<void> = new Subject<void>();
  private date;

  /**Besoin pour test pour lancer un php quand on clique sur le bouton */
  constructor(private service: ReturnsJsonArrayService) {
  }

  ngOnInit() {
    this.creation_bdd_php();
  }

  ngOnDestroy(){
    this.stop_scan_php(); 
  }

  /**bouton lancer le scan */
  handleClickstart(event: Event) {
    // console.log('Click start!', event)
    /**Besoin pour test pour lancer un php quand on clique sur le bouton */
    if (!this.scanIsLaunched){
      this.getDate();
      this.lancer_scan_php();
    }
  }
  /**bouton arreter le scan */
  handleClickstop(event: Event) {
    // console.log('Click stop!', event)

    this.stop_scan_php();
  }

  getDate() {
    let today = new Date();
    this.date = today.getFullYear() + '-'
      + (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-'
      + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
      + ' ' +
      + (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ':'
      + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) + ':'
      + (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());
    }

  /**Test pour lancer un php quand on clique sur le bouton */
  lancer_scan_php() {
    console.log('Scan lancé');
    this.scanIsLaunched = true;
    this.machin_a_executer_periodiquement();
    // // console.log('la date est: ', this.date);
    // this.service.getPeople('http://'  + this.ip + '/project/lancement_scan.php')
    // .subscribe(
    //   () => {
    //   },
    //   (err) => { console.log(err) }
    //   );    
  }

  machin_a_executer_periodiquement() {
    this.scanLaunched = Observable.interval(5000)
      .subscribe(
        () => {
          // console.log('Refresh lancé');
          this.refresh.next();
      },
      (err) => { console.log(err) });
  }

  // injection_dans_bdd() {
  //   this.service.getPeople('http://'  + this.ip + '/project/injection_bdd_php.php')
  //     .subscribe(
  //       () => {
  //         console.log('Données injectées dans la BDD');
  //       },
  //       (err) => { console.log(err) }
  //     );
  // }

  // recuperation_bdd() {
  //   console.log('http://'  + this.ip + '/project/recuperation_bdd_php.php?date=' + this.date);
  //   this.service.getPeople('http://'  + this.ip + '/project/recuperation_bdd_php.php?date=' + this.date)
  //     .subscribe(
  //       (res) => {
  //         console.log('Données récuperées');
  //         this.refresh.next();
  //         console.log('Refresh event emitted')
  //       },
  //       (err) => { console.log(err) }
  //     );
  // }

  stop_scan_php() {
    console.log('Scan stoppé');
    if (this.scanIsLaunched) {
      this.scanIsLaunched = false;
      this.scanLaunched.unsubscribe();
    }
    // this.service.getPeople('http://'  + this.ip + '/project/stop_scan.php')
    //   .subscribe(
    //     (res) => {
    //       this.content_php = res['data'];
    //     },
    //     (err) => { console.log(err) }
    //   );
  }

  creation_bdd_php() {
    this.service.getPeople('http://'  + this.ip + '/project/creation_bdd_php.php')
      // this.service.getPeople('http://'  + this.ip + '/project/test_php_angular.php')
      .subscribe(
        (res) => {
          console.log('Création de la BDD');
        },
        (err) => { console.log(err) }
      );
  }


}
