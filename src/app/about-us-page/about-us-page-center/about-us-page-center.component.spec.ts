import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsPageCenterComponent } from './about-us-page-center.component';

describe('AboutUsPageCenterComponent', () => {
  let component: AboutUsPageCenterComponent;
  let fixture: ComponentFixture<AboutUsPageCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUsPageCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsPageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
