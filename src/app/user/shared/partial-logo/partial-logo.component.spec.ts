import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialLogoComponent } from './partial-logo.component';

describe('PartialLogoComponent', () => {
  let component: PartialLogoComponent;
  let fixture: ComponentFixture<PartialLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartialLogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
