import { TestBed, inject } from '@angular/core/testing';

import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProxyService]
    });
  });

  it('should ...', inject([ProxyService], (service: ProxyService) => {
    expect(service).toBeTruthy();
  }));
});
