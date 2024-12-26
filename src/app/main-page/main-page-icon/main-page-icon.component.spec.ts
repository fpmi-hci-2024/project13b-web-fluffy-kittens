import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageIconComponent } from './main-page-icon.component';

describe('MainPageIconComponent', () => {
  let component: MainPageIconComponent;
  let fixture: ComponentFixture<MainPageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
