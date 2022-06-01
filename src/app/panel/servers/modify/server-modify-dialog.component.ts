import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from '../../../shared/models/server.model';

@Component({
  selector: 'app-server-modify-dialog',
  templateUrl: './server-modify-dialog.component.html',
  styleUrls: ['./server-modify-dialog.component.scss'],
})
export class ServerModifyDialogComponent implements OnInit {
  server: Server;
  serverForm: FormGroup;
  ipOrHostPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ServerModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.option === 'add') {
      this.server = new Server();
      this.serverForm = this.formBuilder.group({
        ip: [
          '',
          [Validators.required, Validators.pattern(this.ipOrHostPattern)],
        ],
        active: [false, []],
      });
    } else {
      this.server = this.data.server;
      this.serverForm = this.formBuilder.group({
        ip: [
          this.server.ip,
          [Validators.required, Validators.pattern(this.ipOrHostPattern)],
        ],
        continent: [this.server.continent, [Validators.required]],
        country: [this.server.country, [Validators.required]],
        longitude: [this.server.longitude, [Validators.required]],
        latitude: [this.server.latitude, [Validators.required]],
        active: [this.server.active, []],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.option === 'add') {
      this.event.emit({ data: this.serverForm.value });
    } else {
      this.event.emit({
        data: {
          id: this.data.server.id,
          article: this.serverForm.value,
        },
      });
    }
    this.dialogRef.close();
  }
}
