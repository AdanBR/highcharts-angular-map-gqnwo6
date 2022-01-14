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
  public temperatures = [
    [new Date('2022-01-12 00:00').getTime(), 21.48],
    [new Date('2022-01-12 01:00').getTime(), 21.35],
    [new Date('2022-01-12 02:00').getTime(), 21.23],
    [new Date('2022-01-12 03:00').getTime(), 21.07],
    [new Date('2022-01-12 04:00').getTime(), 20.90],
    [new Date('2022-01-12 05:00').getTime(), 20.80]
  ];
  public precipitations = [
    [new Date('2022-01-12 00:00').getTime(), 0.00],
    [new Date('2022-01-12 01:00').getTime(), 1.10],
    [new Date('2022-01-12 02:00').getTime(), 1.60],
    [new Date('2022-01-12 03:00').getTime(), 2.00],
    [new Date('2022-01-12 04:00').getTime(), 2.00],
    [new Date('2022-01-12 05:00').getTime(), 1.60]
  ];
  public pressures = [
    [new Date('2022-01-12 00:00').getTime(), 1012.43],
    [new Date('2022-01-12 01:00').getTime(), 1012.06],
    [new Date('2022-01-12 02:00').getTime(), 1011.56],
    [new Date('2022-01-12 03:00').getTime(), 1011.31],
    [new Date('2022-01-12 04:00').getTime(), 1011.52],
    [new Date('2022-01-12 05:00').getTime(), 1011.97]
  ];
  public winds = [
    [new Date('2022-01-12 00:00').getTime(), 180],
    [new Date('2022-01-12 01:00').getTime(), 215],
    [new Date('2022-01-12 02:00').getTime(), 266],
    [new Date('2022-01-12 03:00').getTime(), 283],
    [new Date('2022-01-12 04:00').getTime(), 292],
    [new Date('2022-01-12 05:00').getTime(), 305]
  ];
  
  public options: any = {
    title: { text: 'Sample Scatter Plot' },
    xAxis: [{ // Bottom X axis
      type: 'datetime',
      tickInterval: 2 * 36e5, // two hours
      minorTickInterval: 36e5, // one hour
      tickLength: 0,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      offset: 30,
      showLastLabel: true,
      labels: {
        format: '{value:%H}'
      },
      crosshair: true
    }, { // Top X axis
      linkedTo: 0,
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
      labels: {
        format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
        align: 'left',
        x: 3,
        y: -5
      },
      opposite: true,
      tickLength: 20,
      gridLineWidth: 1
    }],

    yAxis: [{ // temperature axis
      title: {
        text: null
      },
      labels: {
        format: '{value}°',
        style: {
          fontSize: '10px'
        },
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
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
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
    }, {
      type: 'column',
      name: 'Precipitation',
      data: this.precipitations,
      yAxis: 1
    }, {
      name: 'Air pressure',
      data: this.pressures,
      dashStyle: 'shortdot',
      yAxis: 2
    }]
  }
  constructor() { }
  
  ngOnInit(): void {
    Highcharts.chart('container', this.options);
  }
}