/**pie chart */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare const Chart;

@Component({
    selector: 'app-chart-test',
    templateUrl: './chart-test.component.html',
    styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        setTimeout(() => {
            this.createChart();
        }, 400)
    }
    createChart() {

        new Chart('piechart', {
            type: 'doughnut',
            data: {
                labels: ['Wifi', 'Bluetooth', 'RTL'],
                datasets: [{

                    data: [46.97, 46.91, 24.56,],

                    backgroundColor: [
                        'rgba(255, 99, 132,.7)',
                        'rgba(66, 165, 245,.7)',
                        'rgba(38, 166, 154,.7)',
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
