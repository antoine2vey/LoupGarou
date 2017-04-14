import { TestBed, inject } from '@angular/core/testing';

import { WolveChatService } from './wolve-chat.service';

describe('WolveChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WolveChatService]
    });
  });

  it('should ...', inject([WolveChatService], (service: WolveChatService) => {
    expect(service).toBeTruthy();
  }));
});
