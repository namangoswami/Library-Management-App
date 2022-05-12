import { TestBed } from '@angular/core/testing';
import Book from '../Common/book.interface'
import { GlobalStoreService } from './global-store.service';

describe('GlobalStoreService', () => {
  let service: GlobalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
