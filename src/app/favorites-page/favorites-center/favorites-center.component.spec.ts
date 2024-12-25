import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCenterComponent } from './favorites-center.component';

describe('FavoritesCenterComponent', () => {
  let component: FavoritesCenterComponent;
  let fixture: ComponentFixture<FavoritesCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
