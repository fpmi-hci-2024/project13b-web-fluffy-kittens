import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageCenterComponent } from './main-page-center.component';

describe('MainPageCenterComponent', () => {
  let component: MainPageCenterComponent;
  let fixture: ComponentFixture<MainPageCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
