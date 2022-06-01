import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModifyDialogComponent } from './article-modify-dialog.component';

describe('ArticleModifyDialogComponent', () => {
  let component: ArticleModifyDialogComponent;
  let fixture: ComponentFixture<ArticleModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleModifyDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
