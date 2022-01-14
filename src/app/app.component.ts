import { Component, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts';

declare var require: any;
require('highcharts/modules/windbarb')(Highcharts);

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public dates = [
    new Date('2022-01-12 00:00').getTime(),
    new Date('2022-01-12 01:00').getTime(),
    new Date('2022-01-12 02:00').getTime(),
    new Date('2022-01-12 03:00').getTime(),
    new Date('2022-01-12 04:00').getTime(),
    new Date('2022-01-12 05:00').getTime()
  ];
  public pictocode = [1, 1, 4, 1, 7, 1];
  public isdaylight = [1, 1, 1, 1, 0, 0];
  public temperatures = [21.48, 21.35, 21.23, 21.07, 20.90, 20.80];
  public precipitations = [0.00, 1.10, 1.60, 2.00, 2.00, 1.60];
  public pressures = [1012.43, 1012.06, 1011.56, 1011.31, 1011.52, 1011.97];
  public winds = [[9.8, 180], [10.1, 215], [11.3, 266], [10.9, 283], [9.3, 292], [8.8, 305]];
  
  public options: any = {
    title: { text: 'Sample Scatter Plot' },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat:
        '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
        '<b>{point.point.symbolName}</b><br>'
    },
    xAxis: [{
      categories: this.dates,
      type: 'datetime',
      gridLineWidth: 1,
      offset: 30,
      labels: {
        format: '{value:%H}'
      }
    }, {
      linkedTo: 0,
      categories: this.dates,
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
      opposite: true,
      gridLineWidth: 1,
      labels: {
        format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
        align: 'left',
        x: 3,
        y: -5
      }
    }],
    yAxis: [{ // temperature axis
      title: { text: null },
      labels: {
        format: '{value}°',
        style: { fontSize: '10px' },
        x: -3
      },
      plotLines: [{ // zero plane
        value: 0,
        color: '#BBBBBB',
        width: 1,
        zIndex: 2
      }],
      maxPadding: 0.3,
      minRange: 8,
      tickInterval: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)'

    }, { // precipitation axis
      title: { text: null },
      labels: { enabled: false },
      gridLineWidth: 0,
      tickLength: 0,
      minRange: 10,
      min: 0
    }, { // Air pressure
      allowDecimals: false,
      title: { // Title on top of axis
        text: 'hPa',
        offset: 0,
        align: 'high',
        rotation: 0,
        style: {
          fontSize: '10px',
          color: Highcharts.getOptions().colors[2]
        },
        textAlign: 'left',
        x: 3
      },
      labels: {
        style: {
          fontSize: '8px',
          color: Highcharts.getOptions().colors[2]
        },
        y: 2,
        x: 3
      },
      gridLineWidth: 0,
      opposite: true,
      showLastLabel: false
    }],
    series: [{
      type: 'spline',
      name: 'Temperature',
      data: this.temperatures,
      marker: {
        enabled: false,
        states: {
          hover: { enabled: true }
        }
      }
    }, {
      type: 'column',
      name: 'Precipitation',
      data: this.precipitations,
      yAxis: 1
    }, {
      name: 'Air pressure',
      data: this.pressures,
      marker: {
        enabled: false,
        states: {
          hover: { enabled: true }
        }
      },
      dashStyle: 'shortdot',
      yAxis: 2
    }, {
      type: 'windbarb',
      name: 'Wind',
      data: this.winds,
      yOffset: -15,
    }]
  }
  constructor() { }

  isDayLight(value): String {
    if (value < 1) {
      return 'inight';
    } else { return 'iday'; }
  }
  ngOnInit(): void {
    Highcharts.chart('container', this.options, (chart) => {
      const data = chart.series[0].data;
      data.forEach(el => {
        let cond = ('0'+ this.pictocode[el.index]).slice(-2);
        cond = cond +'_'+ this.isDayLight(this.isdaylight[el.index]);

        const points = el.series.points;
        chart.renderer.image(
          'https://static.meteoblue.com/assets/images/picto/'+ cond +'.svg',
          points[el.index]['plotX'] + 13,
          points[el.index]['plotY'] + 55,
          30,
          30
        ).attr({
          zIndex: 5
        }).add();
      });
    });
  }
}