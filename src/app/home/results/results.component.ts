import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ResultService } from '../../shared/services/result.service';
import { Result } from '../../shared/models/result.model';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  user: User;
  option = 1;
  results: Result[];

  labels = [];
  ping = [];
  download = [];
  upload = [];

  barChartOptions: ChartOptions = {
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
    title: {
      display: true,
      text: 'PING [ms]',
    },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = false;

  barChartData: ChartDataSets[] = [];

  constructor(
    private resultService: ResultService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userValue;
    if (this.user) {
      setTimeout(() => {
        this.resultService.getAll().subscribe((res) => {
          this.results = res.filter(
            (result) => result.user_id === this.authService.userValue.id
          );
          this.results.forEach((key, i) => {
            this.labels.push(i + 1);
            this.ping.push(key.ping);
            this.download.push(key.download);
            this.upload.push(key.upload);
          });
          if (this.results.length === 0) {
            this.notificationService.showInfo(
              'History is empty, modify results.'
            );
          }
        });
      });
      this.barChartLabels = this.labels;
      this.barChartData = [{ data: this.ping, label: 'PING' }];
    } else {
      this.notificationService.showInfo(
        'To access the test history, please log in.'
      );
    }
  }

  changeChart(option: number): void {
    option = Number(option);
    if (option === 1) {
      this.barChartData = [{ data: this.ping, label: 'PING' }];
      this.chart.chart.options.title.text = 'PING [ms]';
    } else if (option === 2) {
      this.barChartData = [{ data: this.download, label: 'DOWNLOAD' }];
      this.chart.chart.options.title.text = 'DOWNLOAD [Mbps]';
    } else if (option === 3) {
      this.barChartData = [{ data: this.upload, label: 'UPLOAD' }];
      this.chart.chart.options.title.text = 'UPLOAD [Mbps]';
    }
  }

  delete(id: number): void {
    this.resultService.deleteResult(id).subscribe(
      () => {
        // this.results.filter(result => result.id = id);
        this.clearChart();
        this.results = [];
        this.notificationService.showSuccess('Result deleted!');
        this.ngOnInit();
      },
      () => {
        this.notificationService.showError('Something wrong!');
      }
    );
  }

  clearChart(): void {
    this.labels = [];
    this.ping = [];
    this.download = [];
    this.upload = [];
  }

  ngAfterViewInit(): void {}
}
