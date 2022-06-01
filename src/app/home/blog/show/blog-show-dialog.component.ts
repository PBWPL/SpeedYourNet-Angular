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

@Component({
  selector: 'app-blog-show-dialog',
  templateUrl: './blog-show-dialog.component.html',
  styleUrls: ['./blog-show-dialog.component.scss'],
})
export class BlogShowDialogComponent implements OnInit {
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  article: Article;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<BlogShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    document.getElementById('content').innerHTML = this.data.article.content;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
