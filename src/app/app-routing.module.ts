import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { MixChartComponent } from './mix-chart/mix-chart.component';
import { NewChartComponent } from './new-chart/new-chart.component';
import { LineChartMultipleComponent } from './line-chart-multiple/line-chart-multiple.component';
import { LineChart3Component } from './line-chart3/line-chart3.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'line-chart' },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'doughnut-chart', component: DoughnutChartComponent },
  { path: 'radar-chart', component: RadarChartComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'bubble-chart', component: BubbleChartComponent },
  { path: 'mix-chart', component: MixChartComponent },
  { path: 'cust-chart', component: NewChartComponent },
  { path: 'line-chart-multiple', component: LineChartMultipleComponent },
  { path: 'line-chart3', component: LineChart3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
