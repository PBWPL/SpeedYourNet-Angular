import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerModifyDialogComponent } from './server-modify-dialog.component';

describe('ServerModifyDialogComponent', () => {
  let component: ServerModifyDialogComponent;
  let fixture: ComponentFixture<ServerModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServerModifyDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
