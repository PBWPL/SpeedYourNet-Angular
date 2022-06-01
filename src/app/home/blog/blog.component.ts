import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article.model';
import { MatDialog } from '@angular/material/dialog';
import { BlogShowDialogComponent } from './show/blog-show-dialog.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.articleService
        .getAll()
        .pipe(first())
        .subscribe((articles) => {
          this.articles = articles.filter((item) => item.published === true);
        });
    });
  }

  show(id: number): void {
    const dialogRef = this.dialog.open(BlogShowDialogComponent, {
      width: '1024px',
      data: {
        article: this.articles.find((item) => item.id === id),
        option: 'show',
      },
    });
    dialogRef.componentInstance.event.subscribe();
  }
}
