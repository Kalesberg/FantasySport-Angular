import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedVideosComponent } from './getting-started-videos.component';

describe('GettingStartedVideosComponent', () => {
  let component: GettingStartedVideosComponent;
  let fixture: ComponentFixture<GettingStartedVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingStartedVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
