import { Component, OnInit, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataSeries, chartColors } from './data-series';
import { ServiceService } from '../service.service';
import { pluck } from 'rxjs/operators';




@Component({
  selector: 'line-chart-multiple',
  templateUrl: './line-chart-multiple.component.html',
  styleUrls: ['./line-chart-multiple.component.css']
})


export class LineChartMultipleComponent implements OnInit {

  constructor(private _api: ServiceService) { }

  
  ngOnInit() {
    this.getGraphData('21600');
  }

  lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: { display: false },

    scales: {
      yAxes: [{
        id: 'Out',
        type: 'linear',
        ticks: {
         // beginAtZero: true,
         min: 0,
         max: 100,
        },
        scaleLabel: {
          display: true,
          labelString: 'kbps',
        },
      },
      {
        id: 'In',
        type: 'linear',
        position: 'right',
        ticks: {
          min: 0,
          max: 30,
        },
        scaleLabel: {
          display: true,
          labelString: '',
        },
      }],
    }  
  };
  public lineChartData = [];
  public lineChartTemp = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartColors;

  dataSeries;

  chartData(txt){
    let tmpArray = [];
    
    tmpArray[0] = txt.in.results
    tmpArray[1] = txt.out.results
    return tmpArray;
  }

  refreshDataSeries(txt) {
    console.log('full response data ', txt)
    // This is an ugly hack in ng2-charts, line colors will not work without this:
    this.dataSeries = [];
    for (var key in txt) {
      this.dataSeries.push({
        title: key,
        chartLabel: txt[key].in.labels,
       // data: txt[key].in.results,
        data: [...txt[key].in.results],
        axisId: 'Out',
        colorName: 'orange',
        label: 'Traffic Out.',
        activeInBypassMode: true,
      })
    }

    this.lineChartData = this.dataSeries.map(r => ({
      title: r.title,
      chartLabel: r.chartLabel,
      data: [{data: [...r.data]}],
      label: r.label,
      yAxisID: r.axisId,
      pointRadius: 3,
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 2,
      pointHitRadius: 1,
      borderWidth: r.axisId === 'Out' ? 4 : 1,
      fill: false,
      backgroundColor: "#ffffff",
      borderColor: chartColors[r.colorName], // ...and this...
    }));
    console.log(this.lineChartData)
   /*  for (var key in txt) {
      debugger
      console.log(this.lineChartData)

      this.lineChartData[0].data = [...txt.eth0.out.results]
      this.lineChartData[1].data = [...txt.eth0.in.results]
    }
     */
/* 
    

    this.lineChartTemp = this.dataSeries.map(r => ({
      data: [],
      label: r.label,
    }));
    */
    
  }

  getGraphData(int) {
    //let payload = 'host_id=51723&host=172.16.116.232';
    //let payload = 'host_id=44763&host=172.16.113.12&interval';
    //let payload = 'host_id=50350&host=172.16.103.123&interval';
    let payload = 'host_id=44763&host=172.16.113.12&interval=' + int;
    this._api.getAllDataZabbix(payload, 'myaccount/api/v1/monitor/server_health.php').pipe(
      pluck('data')
    ).subscribe((res: any) => {
      this.refreshDataSeries(res.network)
    })
  }
}