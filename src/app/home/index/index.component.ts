import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpEventType } from '@angular/common/http';
import { UploadDataService } from './services/upload-data.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ResultService } from '../../shared/services/result.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { ServerService } from '../../shared/services/server.service';
import { Server } from '../../shared/models/server.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  user: User;
  servers: Server[];
  serverSelected = 0;

  pending = false;
  finished = false;

  // info
  info: object;

  // ping
  ping = 0;

  fileSizes: number[] = [
    128, 256, 512, 1024, 2048, 3072, 4096, 5120, 6144, 7168, 8192, 9216, 10240,
  ];

  // download
  downloadLimit = 2;
  download = 0;
  downloadAvg = 0;
  downloadResults: number[] = [];

  // upload
  uploadLimit = 2;
  upload = 0;
  uploadAvg = 0;
  uploadResults: number[] = [];

  // test
  newBytes: number;
  oldBytes: number;
  startTime: number;
  currentTime: number;
  prevTime: number;
  speed: number;
  percentDone: number;
  duration: number;

  constructor(
    private api: ApiService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private resultService: ResultService,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.serverService.getAll().subscribe((res) => {
        this.servers = res.filter((server) => server.active === true);
        this.api.apiUrlServer = res[0].ip;
      });
      this.getIpInfo();
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  changeServer(index: number): void {
    this.serverSelected = index;
    this.api.apiUrlServer = this.servers[index].ip;
  }

  getIpInfo(): void {
    this.api.ip().subscribe(
      (res) => {
        if (res['country_flag'].includes('/.svg')) {
          res['country_flag'] = '/assets/logo.svg';
        }
        this.info = res;
      },
      (err) => console.log(err)
    );
  }

  pingTest(): any {
    const startTime = performance.now();
    this.api.ping().subscribe(
      () => {
        this.ping = Number((performance.now() - startTime).toFixed());
        this.downloadTest();
      },
      (err) => {
        console.log(err);
        this.clearResults();
      }
    );
  }

  startTest(): void {
    this.pending = true;
    this.pingTest();
  }

  clearResults(): void {
    this.ping = 0;
    this.download = 0;
    this.downloadAvg = 0;
    this.downloadResults = [];
    this.upload = 0;
    this.uploadAvg = 0;
    this.uploadResults = [];
    this.pending = false;
    this.finished = false;
  }

  saveResults(): void {
    if (this.user && this.user.token) {
      const data = {
        user_id: this.user.id,
        server_id: this.servers[this.serverSelected].id,
        ping: this.ping,
        download: this.downloadAvg,
        upload: this.uploadAvg,
      };
      this.resultService.createResult(data).subscribe(() => {
        this.notificationService.showSuccess('Result saved!');
      });
    } else {
      this.notificationService.showInfo(
        'To access the test history, please log in.'
      );
    }
    this.clearResults();
  }

  updateUI(val = 0): void {
    Array.from(document.getElementById('gauge').children).forEach(
      (path: HTMLElement, index) => {
        val > 35 * index
          ? (path.style.display = '')
          : (path.style.display = 'none');
      }
    );
  }

  downloadTest(repeat = 0, cycle = 1): any {
    const fileSize =
      repeat !== this.fileSizes.length
        ? this.fileSizes[repeat]
        : this.fileSizes[repeat - 1];

    // console.log(`repeat: ${repeat} | cycle: ${cycle}`);
    this.api.download(fileSize).subscribe(
      (event) => {
        if (event.type === HttpEventType.Sent) {
          this.startTime = performance.now();
          this.prevTime = this.startTime / 1000; // ms -> s
          this.newBytes = 0;
          this.oldBytes = this.newBytes;
        } else if (event.type === HttpEventType.DownloadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
          this.currentTime = performance.now() / 1000; // ms -> s
          this.newBytes = event.loaded * 8; // bytes -> bit
          this.speed =
            (this.newBytes - this.oldBytes) /
            (this.currentTime - this.prevTime) /
            1000; // bps -> Kbps
          // console.log(`newBytes: ${this.newBytes} oldBytes: ${this.oldBytes} sum: ${this.newBytes - this.oldBytes}`);
          // console.log(`[${percentDone}%] ${speed / 1000} Mbps`);
          this.download = Number((this.speed / 1000).toFixed(2));
          if (this.download !== 0) {
            this.updateUI(this.download);
          }

          this.prevTime = this.currentTime;
          this.oldBytes = this.newBytes;

          if (this.percentDone === 100) {
            const duration = (performance.now() - this.startTime) / 1000; // ms -> s
            if (cycle === 1) {
              this.duration = duration;
            }
            this.speed = Number(
              ((event.total * 8) / duration / 1000000).toFixed(2)
            ); // bps -> Kbps -> Mbps
          }
        } else if (event.type === HttpEventType.Response) {
          if (this.duration < 1) {
            if (repeat !== this.fileSizes.length) {
              if (repeat === this.fileSizes.length - 1) {
                this.downloadResults.push(this.speed); // Mbps
              }
              this.downloadTest(++repeat);
            } else {
              this.downloadResults.push(this.speed); // Mbps
              this.download = 0;
              if (cycle < this.downloadLimit) {
                this.downloadTest(repeat, ++cycle);
              } else {
                this.downloadAvg = this.avg(this.downloadResults);
                this.uploadTest();
              }
            }
          } else {
            this.downloadResults.push(this.speed); // Mbps
            this.download = 0;
            if (cycle <= this.downloadLimit) {
              this.downloadTest(repeat, ++cycle);
            } else {
              this.downloadAvg = this.avg(this.downloadResults);
              this.uploadTest();
            }
          }
        }
      },
      (err) => console.log(err)
    );
  }

  uploadTest(repeat = 0, cycle = 1): any {
    const fileSize =
      repeat !== this.fileSizes.length
        ? this.fileSizes[repeat]
        : this.fileSizes[repeat - 1];

    const blob = new UploadDataService(fileSize).blob;
    // console.log(`size: ${(blob.size / 1000)} Kb`);

    // console.log(`repeat: ${repeat} | cycle: ${cycle}`);
    this.api.upload(blob).subscribe(
      (event) => {
        if (event.type === HttpEventType.Sent) {
          this.startTime = performance.now();
          this.prevTime = this.startTime / 1000; // ms -> s
          this.newBytes = 0;
          this.oldBytes = this.newBytes;
        } else if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
          this.currentTime = performance.now() / 1000; // ms -> s
          this.newBytes = event.loaded * 8; // bytes -> bit
          this.speed =
            (this.newBytes - this.oldBytes) /
            (this.currentTime - this.prevTime) /
            1000; // bps -> Kbps
          // console.log(`[${percentDone}%] ${(speed / 1000)} Mbps`);
          this.upload = Number((this.speed / 1000).toFixed(2));
          if (this.upload !== 0) {
            this.updateUI(this.upload);
          }

          this.prevTime = this.currentTime;
          this.oldBytes = this.newBytes;

          if (this.percentDone === 100) {
            const duration = (performance.now() - this.startTime) / 1000; // ms -> s
            if (cycle === 1) {
              this.duration = duration;
            }
            this.speed = Number(
              ((event.total * 8) / duration / 1000000).toFixed(2)
            ); // bps -> Kbps -> Mbps
          }
        } else if (event.type === HttpEventType.Response) {
          if (this.duration < 1) {
            if (repeat !== this.fileSizes.length) {
              if (repeat === this.fileSizes.length - 1) {
                this.uploadResults.push(this.speed); // Mbps
              }
              this.uploadTest(++repeat);
            } else {
              this.uploadResults.push(this.speed); // Mbps
              this.upload = 0;
              if (cycle < this.uploadLimit) {
                this.uploadTest(repeat, ++cycle);
              } else {
                this.uploadAvg = this.avg(this.uploadResults);
                this.updateUI();
                this.finished = true;
              }
            }
          } else {
            this.uploadResults.push(this.speed); // Mbps
            this.upload = 0;
            if (cycle <= this.uploadLimit) {
              this.uploadTest(repeat, ++cycle);
            } else {
              this.uploadAvg = this.avg(this.uploadResults);
              this.updateUI();
              this.finished = true;
            }
          }
        }
      },
      (err) => console.log(err)
    );
  }

  sum = (arr: Array<number>): number =>
    arr.length != null
      ? Number(arr.reduce((a, b) => a + b, 0).toFixed(2))
      : null;
  avg = (arr: Array<number>): number =>
    Number((this.sum(arr) / arr.length).toFixed(2));

  // distance(lat1, lon1, lat2, lon2): number {
  //   const p = Math.PI / 180;
  //   const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
  //     (1 - Math.cos((lon2 - lon1) * p)) / 2;
  //   return 2 * 6371 * Math.asin(Math.sqrt(a));
  // }
}
