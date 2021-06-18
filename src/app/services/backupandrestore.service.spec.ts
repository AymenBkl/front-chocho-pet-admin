import { TestBed } from '@angular/core/testing';

import { BackupandrestoreService } from './backupandrestore.service';

describe('BackupandrestoreService', () => {
  let service: BackupandrestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackupandrestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
