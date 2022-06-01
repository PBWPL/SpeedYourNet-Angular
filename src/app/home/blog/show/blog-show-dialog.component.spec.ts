import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogShowDialogComponent } from './blog-show-dialog.component';

describe('BlogShowDialogComponent', () => {
  let component: BlogShowDialogComponent;
  let fixture: ComponentFixture<BlogShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogShowDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
