import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupproviderPage } from './signupprovider.page';

describe('SignupproviderPage', () => {
  let component: SignupproviderPage;
  let fixture: ComponentFixture<SignupproviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupproviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupproviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
