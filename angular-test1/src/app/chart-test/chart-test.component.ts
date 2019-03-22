/**pie chart */
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  isInit = false;
  ip = '172.20.10.2';
  nb_accesspoint:any;
  nb_stations:any;
  nb_ble:any;
  nb_rtl:any;

  private refreshSubscription: any;

  @Input() refresh: Observable<void>;

  constructor(private service: ReturnsJsonArrayService) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.createChart();
    // }, 1000)
    // this.refreshSubscription = this.refresh.subscribe(() => {
    //   this.tab_wifi();
    //   this.liste_cam_wifi_stations();
    //   this.tab_ble();
    //   this.tab_rtl();
    //  // this.calculPourcentage();
    //   setTimeout(this.createChart, 1000)
    // });

    this.service.getJSON().subscribe(data => {
      console.log(data._body.toString());
      let obj = JSON.parse(data._body.toString());
      console.log(obj.cam_accesspoint);
      this.nb_accesspoint = obj.cam_accesspoint;
  });

  console.log("coucoucoucou");
  console.log(this.nb_accesspoint);

    this.service.getJSON2().subscribe(data2 => {
      console.log(data2._body.toString());
      let obj2 = JSON.parse(data2._body.toString());
      console.log(obj2.cam_stations);

    });


    this.service.getJSON3().subscribe(data3 => {
      console.log(data3._body.toString());
      let obj3 = JSON.parse(data3._body.toString());
      console.log(obj3.cam_rtl);
    });


    this.service.getJSON4().subscribe(data4 => {
      console.log(data4._body.toString());
      let obj4 = JSON.parse(data4._body.toString());
      console.log(obj4.cam_ble);
    });

    // this.createChart();
    // console.log("Bonjour");
 //   this.recup_accesspoint();

}

  // recup_accesspoint() {
  //   this.service.getJSON().subscribe(data => {
  //     console.log(data._body.toString());
  //     let obj = JSON.parse(data._body.toString());
  //     console.log(obj.cam_accesspoint);
  // });
  // }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  createChart() {

    new Chart('piechart', {
      type: 'doughnut',
      data: {
        //labels: ['Wifi ', 'Bluetooth', 'RTL'],
        labels: ['Wifi AP', 'Wifi Stations', 'Bluetooth', 'RTL'],
        datasets: [{

          //data: [25, 35, 30, 10],
          data: [obj.cam_accesspoint, obj2.cam_stations, obj3.cam_rtl, obj4.cam_ble],

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
