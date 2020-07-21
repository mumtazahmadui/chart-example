import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ServiceService } from '../service.service';
import { chartColors } from './data-series';

@Component({
  selector: 'line-chart3',
  templateUrl: './line-chart3.component.html',
  styleUrls: ['./line-chart3.component.css']
})
export class LineChart3Component implements OnInit {

  constructor(private _api: ServiceService) { }

  
  ngOnInit() {
    this.getGraphData('3600');
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
         min: 50,
          max: 150,
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
  public lineChartLabels: string[] = [];
  public lineChartData = [];
  public lineChartTemp = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartColors;

  dataSeries = [
    {
      title:'one',
      index: 0,
      axisId: 'Out',
      colorName: 'orange',
      label: 'Traffic Out.',
      units: '',
      activeInBypassMode: true,
    },
    {
      title:'two',
      index: 1,
      axisId: 'In',
      colorName: 'green',
      label: 'Traffic In.',
      units: '',
      activeInBypassMode: true,
    },
  ];

  refreshDataSeries(txt) {
    // This is an ugly hack in ng2-charts, line colors will not work without this:
    this.lineChartColors = this.dataSeries.map(r => ({
      backgroundColor: chartColors[r.colorName]
    }));

    this.lineChartData = this.dataSeries.map(r => ({
      title:'one',
      data: [],
      label: r.label,
      yAxisID: r.axisId,
      pointRadius: 3,
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 2,
      pointHitRadius: 1,
      borderWidth: r.axisId === 'Out' ? 4 : 1,
      fill: false,
      borderColor: chartColors[r.colorName], // ...and this...
    }));

    this.lineChartTemp = this.dataSeries.map(r => ({
      data: [],
      label: r.label,
    }));

    this.lineChartLabels = ['10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'];

    this.lineChartData[0].data = [50,65,68,89,92,99,108,122,130];

    this.lineChartData[1].data = [5,13,15.6,16.2,18.4,19.8,22,24.4,26];

    
  }


  getGraphData(int) {
    //let payload = 'host_id=51723&host=172.16.116.232';
    //let payload = 'host_id=44763&host=172.16.113.12&interval';
    //let payload = 'host_id=50350&host=172.16.103.123&interval';
    let payload = 'host_id=44763&host=172.16.113.12&interval=' + int;
    this._api.getAllDataZabbix(payload, 'myaccount/api/v1/monitor/server_health.php').pipe(
      pluck('data')
    ).subscribe((res: any) => {
      this.refreshDataSeries(res)
    })
  }
}