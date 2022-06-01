import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../shared/services/article.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticleModifyDialogComponent } from '../modify/article-modify-dialog.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit, AfterViewInit {
  articles: Article[] = [];
  id: number;
  displayedColumns: string[] = [
    'user_id',
    'title',
    'published',
    'createdAt',
    'updatedAt',
    'modify',
    'delete',
  ];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.articleService
        .getAll()
        .pipe(first())
        .subscribe((articles) => {
          this.articles = articles;
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
    const dialogRef = this.dialog.open(ArticleModifyDialogComponent, {
      width: '1024px',
      data: {
        option: 'add',
      },
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      result.data.user_id = this.authService.userValue.id;
      this.articleService.createArticle(result.data).subscribe(
        (res) => {
          this.notificationService.showSuccess('Article added!');
          this.articles.push(res);
        },
        (err) => console.log(err),
        () => this.refresh()
      );
    });
  }

  modify(article: Article): void {
    const dialogRef = this.dialog.open(ArticleModifyDialogComponent, {
      width: '1024px',
      data: {
        article,
        option: 'modify',
      },
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.articleService
        .updateArticle(result.data.id, result.data.article)
        .subscribe(
          (res) => {
            this.notificationService.showSuccess('Article updated!');
            const index = this.articles.indexOf(article);
            this.articles[index] = res;
          },
          (err) => this.notificationService.showError(err.error.message),
          () => this.refresh()
        );
    });
  }

  delete(article: Article): void {
    this.articleService.deleteArticle(article.id).subscribe(
      () => {
        this.notificationService.showSuccess('Article deleted!');
        this.articles = this.articles.filter((item) => item.id !== article.id);
      },
      (err) => this.notificationService.showError(err.error.message),
      () => this.refresh()
    );
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<Article>(this.articles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
