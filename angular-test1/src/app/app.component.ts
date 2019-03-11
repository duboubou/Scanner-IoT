import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ReturnsJsonArrayService } from './returns-json-array.service';



/**tableau de molécules */
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
/**tableau de molécules */
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scanner-IoT';
  color = 'primary';
  mode = 'indeterminate';
  content_php = '';
  isInit = false;
  scanLaunched = false;
  date;

  /**Besoin pour test pour lancer un php quand on clique sur le bouton */
  constructor(private service: ReturnsJsonArrayService) {
  }

  ngOnInit() {
    this.creation_bdd_php();
  }


  /**tableau de molécules */
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**bouton lancer le scan */
  handleClickstart(event: Event) {
    console.log('Click start!', event)
    /**Besoin pour test pour lancer un php quand on clique sur le bouton */
    this.lancer_scan_php();
  }
  /**bouton arreter le scan */
  handleClickstop(event: Event) {
    console.log('Click stop!', event)

    this.stop_scan_php();
  }

  getDate(){
    let today = new Date();
    this.date = today.getFullYear() + '-'
                + (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-'
                + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) + ' '
                + (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ':'
                + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) + ':'
                + (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());
  }

  /**Test pour lancer un php quand on clique sur le bouton */
  lancer_scan_php() {
    this.scanLaunched = true;
    this.getDate();
    console.log('la date est: ', this.date);
    // this.machin_a_executer_toutes_les_deux_secondes();
    // this.service.getPeople('http://localhost/project/lancement_scan.php')
    //   .subscribe(
    //     (res) => {
    //       this.content_php = res['data'];
    //       this.isInit = true;
    //     },
    //     (err) => { console.log(err) }
    //   );

  }

  machin_a_executer_toutes_les_deux_secondes() {
    while (this.scanLaunched) {
      setTimeout(() => {
        this.injection_dans_bdd();
        this.recuperation_bdd();
      }, 2000);
    }
  }

  injection_dans_bdd(){
    this.service.getPeople('http://localhost/project/injection_bdd_php.php')
          .subscribe(
            (res) => {
              this.content_php = res['data'];
              this.isInit = true;
            },
            (err) => { console.log(err) }
          );
  }

  recuperation_bdd(){
    this.service.getPeople('http://localhost/project/recuperation_bdd_php.php?date=' + this.date)
          .subscribe(
            (res) => {
              this.content_php = res['data'];
              this.isInit = true;
            },
            (err) => { console.log(err) }
          );
  }

  stop_scan_php() {
    this.scanLaunched = false;
    this.service.getPeople('http://localhost/project/stop_scan.php')
      .subscribe(
        (res) => {
          this.content_php = res['data'];
          this.isInit = true;
        },
        (err) => { console.log(err) }
      );
  }

  creation_bdd_php() {
    this.service.getPeople('http://localhost/project/creation_bdd_php.php')
      // this.service.getPeople('/project/test_php_angular.php')
      .subscribe(
        (res) => {
          console.log('Je suis rentré');
          this.content_php = res['data'];
          this.isInit = true;
          console.log('content_php: ' + this.content_php);
        },
        (err) => { console.log(err) }
      );
  }


}
