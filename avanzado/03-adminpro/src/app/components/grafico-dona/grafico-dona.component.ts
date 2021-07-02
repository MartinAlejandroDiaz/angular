import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {
  
  // @Input('labels') labels: string[];
  // @Input('data') data: number[];
  // @Input('type') type: string;
  // @Input('leyenda') leyenda: string;

  @Input('chartLabels') doughnutChartLabels: string[] = [];
  @Input('chartData') doughnutChartData: number[] = [];
  @Input('chartType') doughnutChartType: string = 'doughnut';
  
  constructor() {
  }

  ngOnInit() {
  }

}
