import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  user: User;
  users: User[] = [];
  id: number;
  displayedColumns: string[] = [
    'role',
    'email',
    'active',
    'last_login',
    'createdAt',
    'updatedAt',
    'modify',
    'delete',
  ];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService
        .getAll()
        .pipe(first())
        .subscribe((users) => {
          this.users = users;
          this.refresh();
        });
      this.user = this.authService.userValue;
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

  modify(user: User): void {}

  delete(user: User): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        this.notificationService.showSuccess('User deleted!');
        this.users = this.users.filter((item) => item.id !== user.id);
      },
      (err) => this.notificationService.showError(err.error.message),
      () => this.refresh()
    );
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
