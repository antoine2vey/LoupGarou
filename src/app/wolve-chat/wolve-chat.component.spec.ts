import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WolveChatComponent } from './wolve-chat.component';

describe('WolveChatComponent', () => {
  let component: WolveChatComponent;
  let fixture: ComponentFixture<WolveChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WolveChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WolveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
