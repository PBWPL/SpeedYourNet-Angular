import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialInfoComponent } from './partial-info.component';

describe('PartialInfoComponent', () => {
  let component: PartialInfoComponent;
  let fixture: ComponentFixture<PartialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartialInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
