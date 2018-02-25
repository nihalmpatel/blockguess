import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtokensComponent } from './sendtokens.component';

describe('SendtokensComponent', () => {
  let component: SendtokensComponent;
  let fixture: ComponentFixture<SendtokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendtokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
