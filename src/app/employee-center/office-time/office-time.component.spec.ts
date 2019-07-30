import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTimeComponent } from './office-time.component';

describe('OfficeTimeComponent', () => {
  let component: OfficeTimeComponent;
  let fixture: ComponentFixture<OfficeTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
