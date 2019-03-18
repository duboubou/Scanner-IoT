/**pie chart */
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
declare const Chart;

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
  content_cam_wifi = 0;
  content_cam_stations = 0;
  content_cam_ble = 0;
  content_cam_rtl = 0;
  content_tab_rtl: any;
  content_tab_ble: any;
  content_tab_wifi: any;
  content_tab_stations: any;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) { }

  ngOnInit() {
    setTimeout(() => {
      this.createChart();
    }, 1000)
    this.refreshSubscription = this.refresh.subscribe(() => {
      this.tab_wifi();
      this.liste_cam_wifi_stations();
      this.tab_ble();
      this.tab_rtl();
      setTimeout(this.calculPourcentage, 5000)
    });
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  calculPourcentage() {
    let total = 0;
    console.log("pourcent");
    this.content_tab_ble.forEach(element => {
      this.content_cam_ble++;
    });
    this.content_tab_wifi.forEach(element => {
      this.content_cam_wifi++;
    });
    console.log("apres");
    this.content_tab_rtl.forEach(element => {
      this.content_cam_rtl++;
    });
    this.content_tab_stations.forEach(element => {
      this.content_cam_stations++;
    });
    total += this.content_cam_wifi;
    total += this.content_cam_stations;
    total += this.content_cam_ble;
    total += this.content_cam_rtl;
    console.log(this.content_tab_ble);
    console.log(this.content_tab_wifi);
    console.log(this.content_tab_stations);
    console.log(this.content_tab_rtl);
    this.content_cam_wifi = this.content_cam_wifi / total;
    this.content_cam_stations = this.content_cam_stations / total;
    this.content_cam_ble = this.content_cam_ble / total;
    this.content_cam_rtl = this.content_cam_rtl / total;
    this.createChart();
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
  liste_cam_wifi_stations() {
    // console.log('http://'  + this.ip + '/project/dossier_json/req_cam2.json');
    this.service.getRequest('http://' + this.ip + '/project/dossier_json/req_cam2.json')
      .subscribe(
        (data) => {
          this.content_cam_stations = data.json()["COUNT(*)"];
          this.isInit = true;
        },
        (err) => { console.log(err) }
      );
  }
  tab_rtl(){
    // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_rtl.json');
    this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_tab_rtl.json')
    .subscribe(
      (data) => {
        this.content_tab_rtl = data.json();
        console.log(this.content_tab_rtl);
        this.dateFilter();
      },
      (err) => {console.log(err)}
    );
  }
  tab_ble(){
    // console.log('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json');
    this.service.getRequest('http://'  + this.ip + '/project/dossier_json/req_tab_ble1.json')
    .subscribe(
      (data) => {
        this.content_tab_ble = data.json();
        this.dateFilter();
      },
      (err) => {console.log(err)}
    );
  }

  dateFilter() {
    // var dateClick = new Date(this.date);
    // // console.log(dateClick);

    // // console.log(this.content_tab_wifi);
    // this.content_tab_wifi.filter((element) => {
    //   var dateElement = new Date(element.last_time_seen);
    //   // console.log(element.last_time_seen);
    //   return dateElement >= dateClick;
    // });
    // // console.log(this.content_tab_wifi);
  }

  createChart() {

    new Chart('piechart', {
      type: 'doughnut',
      data: {
        //labels: ['Wifi ', 'Bluetooth', 'RTL'],
        labels: ['Wifi AP', 'Wifi Stations', 'Bluetooth', 'RTL'],
        datasets: [{

          //data: [25, 35, 30, 10],
          data: [this.content_cam_wifi, this.content_cam_stations, this.content_cam_ble, this.content_cam_rtl],

          backgroundColor: [
            'rgba(255, 99, 132,.7)',
            'rgba(66, 165, 245,.7)',
            'rgba(38, 166, 154,.7)',
            'rgba(220, 92, 255,.7)',
          ],
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0.000001
          }
        },
        legend: {
          display: true
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          filler: {
            propagate: true
          }
        },
        title: {
          display: true,
          text: 'Répartition des appareils détectés '
          
        }
      }

    })
  }
}
