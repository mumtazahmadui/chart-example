import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ServiceService } from '../service.service';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'mix-chart',
  templateUrl: './mix-chart.component.html',
  styleUrls: ['./mix-chart.component.css']
})
export class MixChartComponent implements OnInit {

  intervals = [
    { key: "3600", value: "Last Hour" },
    { key: "21600", value: "Last 6 Hours" },
    { key: "43200", value: "Last 12 Hours" },
    { key: "86400", value: "Last 24 Hours" },
    { key: "604800", value: "Last 1 Week" }
  ];

  loading;
  interval;
  //line chart 1
  cpuChartData: any[];
  cpuChartLabels;
  cpuData;
  cpuLabels;

  lineChartOptions: any = {
    elements: {
      point: { radius: 2 },
      line: { tension: 0 }
    },
    legend: { display: false },
    scales: {
      xAxes: [{
        ticks: {
          steps: 20,
          stepValue: 20,
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 10,
          // Include a dollar sign in the ticks
          callback: (value) => value + '%'
        },
      }]
    },
    scaleShowVerticalLines: false,
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(255, 99, 132, 1',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1
    },
  ];

  lineChartLegend = false;
  lineChartType = 'line';

  // line 
  diskChartData: any[];
  diskChartLabels;
  diskData;
  diskLabels;

  //operationData
  optChartData;
  optChartLabels;
  optData;
  optLabels;

  //operationData
  networkChartData;
  networkChartLabels;
  networkData;
  networkLabels;

  constructor(private _api: ServiceService) { }

  ngOnInit() {
    this.onIntervalChange('3600');
  }

  //"host_id=51723&host=172.16.116.232"

  getGraphData(int) {
    //let payload = 'host_id=51723&host=172.16.116.232';
    this.loading = true;
    let payload = 'host_id=44763&host=172.16.113.12&interval=' + int;
    this._api.getAllDataZabbix(payload, 'myaccount/api/v1/monitor/server_health.php').pipe(
      pluck('data')
    ).subscribe((res: any) => {
      console.log(res)
      this.getChartData(res);

      this.cpuChartData = [{ 'data': this.cpuData, label: '' }];
      this.cpuChartLabels = this.cpuLabels;

      this.diskChartData = [{ 'data': this.diskLabels, label: '' }];
      this.diskChartLabels = this.diskLabels;

      this.optChartData = [{ 'data': this.optData, label: '' }];
      this.optChartLabels = this.optLabels;

      this.networkChartData = [{ 'data': this.networkData, label: '' }];
      this.networkChartLabels = this.networkLabels;
      this.loading = false;


      /* this.cpuGraphData(res);
      this.diskIopsReadGraphData(res);
      this.diskIopsWriteGraphData(res);
      this.networkGraphData(res);
      this.chart_loading = false; */
    },
      error => {
        console.log('getGraphData', error)
      });
  }

  getChartData(res) {
    //cpu
    this.cpuLabels = [...res.cpu.labels];
    this.cpuData = [...res.cpu.results];

    //disk_iops_read
    this.diskLabels = [...res.disk_iops_read.labels];
    this.diskData = [...res.disk_iops_read.results];

    //network
    this.networkLabels = [...res.network.eth0.in.labels];
    this.networkData = [...res.disk_iops_read.results];

    //disk_iops_write
    this.optLabels = this.formatedData([...res.disk_iops_write.labels]);

    const chartData = this.formatedData([...res.disk_iops_write.results]);
    this.optData = chartData;



    // let formatedData = chartData.map(item=> item)


    console.log(chartData)
  }

  formatedData(data) {
    let prekey = null;
    let currentkey = null;
    let newarray = [];
    for (const key of data) {
      if (currentkey !== null) {
        prekey = currentkey;
      }
      currentkey = key;

      if (prekey !== currentkey) {
        newarray.push(currentkey);
      }
    }
    return newarray;
  }

  onIntervalChange(value: any) {
    this.getGraphData(value);
  }

}