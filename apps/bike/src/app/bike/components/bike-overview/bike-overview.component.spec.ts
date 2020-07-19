import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeOverviewComponent } from './bike-overview.component';

describe('BikeOverviewComponent', () => {
  let component: BikeOverviewComponent;
  let fixture: ComponentFixture<BikeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
