import { TestBed } from '@angular/core/testing';

import { FirestoreCRUDService } from './firestore-crud.service';

describe('FirestoreCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestoreCRUDService = TestBed.get(FirestoreCRUDService);
    expect(service).toBeTruthy();
  });
});
