import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent {

  doughnutChartLabels: Label[] = ['Free Disk', 'Used Disk'];
  doughnutChartData: MultiDataSet = [[55, 20]];
  doughnutChartData1: MultiDataSet = [[68, 20]];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions: any = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    tooltips: { enabled: true },
    legend: { display: false }
  }
  doughnutChartColors: Color[] = [
    { backgroundColor: ["#2ecc71", "#e74c3c"] }
  ];
  doughnutChartColors1: Color[] = [
    { backgroundColor: ["#0074D9","#FFDC00"] }
  ];
}
