import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPageCenterComponent } from './contacts-page-center.component';

describe('ContactsPageCenterComponent', () => {
  let component: ContactsPageCenterComponent;
  let fixture: ComponentFixture<ContactsPageCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsPageCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsPageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
