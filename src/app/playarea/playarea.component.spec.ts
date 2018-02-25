import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayareaComponent } from './playarea.component';

describe('PlayareaComponent', () => {
  let component: PlayareaComponent;
  let fixture: ComponentFixture<PlayareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
