import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPageCenterComponent } from './basket-page-center.component';

describe('BasketPageCenterComponent', () => {
  let component: BasketPageCenterComponent;
  let fixture: ComponentFixture<BasketPageCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketPageCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketPageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
