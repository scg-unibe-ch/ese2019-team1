import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupProviderPage } from './signup-provider.page';

describe('SignupProviderPage', () => {
  let component: SignupProviderPage;
  let fixture: ComponentFixture<SignupProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
