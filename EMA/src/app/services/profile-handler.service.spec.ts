import { TestBed } from '@angular/core/testing';

import { ProfileHandlerService } from './profile-handler.service';

describe('ProfileHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileHandlerService = TestBed.get(ProfileHandlerService);
    expect(service).toBeTruthy();
  });
});
