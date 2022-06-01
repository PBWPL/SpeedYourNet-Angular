import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../../shared/models/article.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-modify-dialog',
  templateUrl: './article-modify-dialog.component.html',
  styleUrls: ['./article-modify-dialog.component.scss'],
})
export class ArticleModifyDialogComponent implements OnInit {
  @ViewChild('ckeditor') ckeditor: any;
  article: Article;
  articleForm: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();

  config: {
    allowedContent: false;
    extraPlugins: 'divarea';
    forcePasteAsPlainText: true;
  };

  urlPattern =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()\*+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;

  constructor(
    public dialogRef: MatDialogRef<ArticleModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.option === 'add') {
      this.article = new Article();
      this.articleForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        image: [
          environment.apiUrl + '/assets/images/blog-600x400.png',
          [Validators.required, Validators.pattern(this.urlPattern)],
        ],
        published: [false, []],
        content: ['', [Validators.required]],
      });
    } else {
      this.article = this.data.article;
      this.articleForm = this.formBuilder.group({
        title: [this.article.title, [Validators.required]],
        image: [this.article.image, [Validators.pattern(this.urlPattern)]],
        published: [this.article.published, []],
        content: [this.article.content, [Validators.required]],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.option === 'add') {
      this.event.emit({ data: this.articleForm.value });
    } else {
      this.event.emit({
        data: {
          id: this.data.article.id,
          article: this.articleForm.value,
        },
      });
    }
    this.dialogRef.close();
  }
}
