import { TestBed } from '@angular/core/testing';
import { NetworkStatusService } from './network-status.service';
import { Observable } from 'rxjs';

describe('NetworkStatusService', () => {
  let service: NetworkStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of boolean', () => {
    const networkStatus$ = service.checkNetworkStatus();
    expect(networkStatus$).toBeDefined();
    expect(networkStatus$ instanceof Observable).toBe(true);
    expect(typeof networkStatus$.subscribe).toBe('function');
  });
});
