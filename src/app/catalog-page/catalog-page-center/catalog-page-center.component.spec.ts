import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPageCenterComponent } from './catalog-page-center.component';

describe('CatalogPageCenterComponent', () => {
  let component: CatalogPageCenterComponent;
  let fixture: ComponentFixture<CatalogPageCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogPageCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogPageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
