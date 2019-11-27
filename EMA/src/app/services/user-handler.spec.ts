import { TestBed } from '@angular/core/testing';

import { UserHandler } from './user-handler';

describe('FirestoreCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserHandler = TestBed.get(UserHandler);
    expect(service).toBeTruthy();
  });
});
