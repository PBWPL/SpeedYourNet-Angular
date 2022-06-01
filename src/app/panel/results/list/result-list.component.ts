import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { Result } from '../../../shared/models/result.model';
import { ResultService } from '../../../shared/services/result.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, AfterViewInit {
  results: Result[] = [];
  id: number;
  displayedColumns: string[] = [
    'user_id',
    'server_id',
    'ping',
    'download',
    'upload',
    'createdAt',
    'modify',
    'delete',
  ];
  dataSource: MatTableDataSource<Result>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private resultService: ResultService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.resultService
        .getAll()
        .pipe(first())
        .subscribe((results) => {
          this.results = results;
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

  add(): void {}

  modify(result: Result): void {}

  delete(result: Result): void {
    this.resultService.deleteResult(result.id).subscribe(
      () => {
        this.notificationService.showSuccess('Result deleted!');
        this.results = this.results.filter((item) => item.id !== result.id);
      },
      (err) => this.notificationService.showError(err.error.message),
      () => this.refresh()
    );
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<Result>(this.results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
