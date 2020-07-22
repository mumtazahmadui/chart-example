import { Component, OnInit, } from '@angular/core';
import { ServiceService } from '../service.service';
import { pluck } from 'rxjs/operators';
import { chartColors } from '../line-chart-multiple/data-series';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {
  intervals = [
    { key: "3600", value: "Last Hour" },
    { key: "21600", value: "Last 6 Hours" },
    { key: "43200", value: "Last 12 Hours" },
    { key: "86400", value: "Last 24 Hours" },
    { key: "604800", value: "Last 1 Week" }
  ];

  constructor(private _api: ServiceService) { }

  ngOnInit() {
    this.onIntervalChange('3600');
  }

  lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: { display: false },

    scales: {
      yAxes: [{
        id: 'In',
        type: 'linear',
        ticks: {
          // beginAtZero: true,
          min: 0,
          max: 80,
        },
        scaleLabel: {
          display: true,
          labelString: 'kbps',
        },
      },
      {
        id: 'Out',
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

  mainData = [];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartColors;

  dataSeries = [
    {
      title: 'one',
      index: 0,
      axisId: 'In',
      colorName: 'orange',
      label: 'Traffic In.',
      units: '',
      activeInBypassMode: true,
    },
    {
      title: 'two',
      index: 1,
      axisId: 'Out',
      colorName: 'green',
      label: 'Traffic Out.',
      units: '',
      activeInBypassMode: true,
    },
  ];

  dataList = [];
  minMax = [];

  updateChartData(res) {
    this.mainData[res].lineChartData = this.dataSeries.map(r => ({
      title: 'one',
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

    this.mainData[res].lineChartTemp = this.dataSeries.map(r => ({
      data: [],
      label: r.label,
    }));
  }

  refreshDataSeries() {
    // This is an ugly hack in ng2-charts, line colors will not work without this:
    this.lineChartColors = this.dataSeries.map(r => ({
      backgroundColor: chartColors[r.colorName]
    }));

    for (let i = 0; i < this.dataList.length; i++) {
      this.updateChartData(i)
      this.mainData[i].lineChartTitle = this.dataList[i].title;
      this.mainData[i].lineChartLabels = this.dataList[i].label;
      this.mainData[i].lineChartData[0].data = [...this.dataList[i].result];
      this.mainData[i].lineChartData[1].data = [...this.dataList[i].result1];
    }
  }

  getNetworkData(res) {
    this.mainData = [];
    this.dataList = [];
    for (var key in res) {
      this.mainData.push({
        lineChartTitle: '',
        lineChartLabels: [],
        lineChartData: [],
        lineChartTemp: []
      })

      this.dataList.push({
        title: key,
        label: res[key].in.labels,
        result: res[key].in.results,
        result1: res[key].out.results
      });

      //this.findMinMax(res[key].in.results)
    }
    this.refreshDataSeries();
  }
  findMinMax(txt) {
    let min = txt.reduce((p, v) => p < v ? p : v);
    let max = txt.reduce((p, v) => p > v ? p : v);
    this.minMax.push({
      min: Math.round(+min + +min),
      max: Math.round(+max + +max),
    })
  }

  onIntervalChange(value: any) {
    this.getGraphData(value);
  }

  getGraphData(int) {
    let payload = 'host_id=44763&host=172.16.113.12&interval=' + int;
    this._api.getAllDataZabbix(payload, 'myaccount/api/v1/monitor/server_health.php').pipe(
      pluck('data')
    ).subscribe((res: any) => {
      this.getNetworkData(res.network)

    })
  }
}
