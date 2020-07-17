import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

const SAMPLE_DATA = [
  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
]

const SAMPLE_LABEL = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];

@Component({
  selector: 'new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css']
})
export class NewChartComponent implements OnInit {

  constructor() { }
 
  barChartData: any[] = SAMPLE_DATA;
  barChartLabels = SAMPLE_LABEL;
  barChartType = 'bar';
  barChartLegend = true;
  barChartOptions: any = {
    responsive: true,
  };


  ngOnInit() { }

}
