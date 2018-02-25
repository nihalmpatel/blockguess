import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytokensComponent } from './buytokens.component';

describe('BuytokensComponent', () => {
  let component: BuytokensComponent;
  let fixture: ComponentFixture<BuytokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuytokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
