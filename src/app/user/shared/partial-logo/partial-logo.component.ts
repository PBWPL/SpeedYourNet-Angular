import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-partial-logo',
  templateUrl: './partial-logo.component.html',
  styleUrls: ['./partial-logo.component.scss'],
})
export class PartialLogoComponent {
  @Input() title: string;

  constructor() {}
}
