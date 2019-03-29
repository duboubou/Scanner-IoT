/**pie chart */
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { ReturnsJsonArrayService } from 'src/app/returns-json-array.service';
import { HttpClient } from '@angular/common/http';

declare const Chart;

interface MyObj{
  myString: string;
  myNumber: number;
}
interface MyObj2{
  myString2: string;
  myNumber2: number;
}
interface MyObj3{
  myString3: string;
  myNumber3: number;
}
interface MyObj4{
  myString4: string;
  myNumber4: number;
}

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
  nb_stations:any;
  nb_ble:any;
  nb_rtl:any;
  nb_accesspoint:any;
  nbTest = 0;
  nbTest2 = 0;
  nbTest3 = 0;
  nbTest4 = 0;
  isInit = false;
  ip = '172.20.10.2';

  private refreshSubscription: any;

  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) { }
  
  ngOnInit() {
    
    this.service.getJSON().subscribe(data => {
  
    this.nb_accesspoint = JSON.parse(data._body.toString());
    this.nbTest = this.nb_accesspoint.cam_accesspoint;
    });

    this.service.getJSON2().subscribe(data2 => {
      console.log(data2._body.toString());
      this.nb_stations = JSON.parse(data2._body.toString());
      this.nbTest2 = this.nb_stations.cam_stations;

    });


    this.service.getJSON3().subscribe(data3 => {
      console.log(data3._body.toString());
      this.nb_rtl = JSON.parse(data3._body.toString());
      this.nbTest3 = this.nb_rtl.cam_rtl;
    });


    this.service.getJSON4().subscribe(data4 => {
      console.log(data4._body.toString());
      this.nb_ble = JSON.parse(data4._body.toString());
      this.nbTest4 = this.nb_ble.cam_ble;
    });

    setTimeout(() => { this.createChart(); }, 5000)
    // this.refreshSubscription = this.refresh.subscribe(() => {
    // setTimeout(this.createChart, 3000)
    // });
    this.refreshSubscription = this.refresh.subscribe(() => this.createChart())

  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }


  createChart() {
    new Chart('piechart', {
      type: 'doughnut',
      data: {
        //labels: ['Wifi ', 'Bluetooth', 'RTL'],
        labels: ['Wifi AP', 'Wifi Stations', 'RTL', 'Bluetooth'],
        datasets: [{

          //data: [25, 35, 30, 10],
          data: [this.nbTest, this.nbTest2, this.nbTest3, this.nbTest4],

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
