import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Server } from '../../../shared/models/server.model';
import { ServerService } from '../../../shared/services/server.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { ServerModifyDialogComponent } from '../modify/server-modify-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss'],
})
export class ServerListComponent implements OnInit, AfterViewInit {
  servers: Server[] = [];
  id: number;
  displayedColumns: string[] = [
    'ip',
    'continent',
    'country',
    'active',
    'createdAt',
    'updatedAt',
    'modify',
    'delete',
  ];
  dataSource: MatTableDataSource<Server>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private serverService: ServerService,
    public dialog: MatDialog,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.serverService
        .getAll()
        .pipe(first())
        .subscribe((servers) => {
          this.servers = servers;
          this.refresh();
        });
    });
  }

  ngAfterViewInit(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(): void {
    const dialogRef = this.dialog.open(ServerModifyDialogComponent, {
      width: '1024px',
      data: {
        option: 'add',
      },
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.serverService.createServer(result.data).subscribe(
        (res) => {
          this.notificationService.showSuccess('Server added!');
          this.servers.push(res);
        },
        (err) => console.log(err),
        () => this.refresh()
      );
    });
  }

  modify(server: Server): void {
    const dialogRef = this.dialog.open(ServerModifyDialogComponent, {
      width: '1024px',
      data: {
        server,
        option: 'modify',
      },
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.serverService
        .updateServer(result.data.id, result.data.article)
        .subscribe(
          (res) => {
            this.notificationService.showSuccess('Server updated!');
            const index = this.servers.indexOf(server);
            this.servers[index] = res;
          },
          (err) => this.notificationService.showError(err.error.message),
          () => this.refresh()
        );
    });
  }

  delete(server: Server): void {
    this.serverService.deleteServer(server.id).subscribe(
      () => {
        this.notificationService.showSuccess('Server deleted!');
        this.servers = this.servers.filter((item) => item.id !== server.id);
      },
      (err) => this.notificationService.showError(err.error.message),
      () => this.refresh()
    );
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<Server>(this.servers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
