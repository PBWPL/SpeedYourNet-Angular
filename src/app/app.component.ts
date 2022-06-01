import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Speed Your Net';

  constructor() {}

  // updateNetworkStatusUI(): void {
  //   const body = (document.querySelector('body') as any);
  //   (navigator.onLine) ? body.style = '' : body.style = 'filter: grayscale(1)';
  // }

  ngOnInit(): void {
    // this.updateNetworkStatusUI();
  }
}
