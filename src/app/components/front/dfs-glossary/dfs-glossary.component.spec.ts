import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfsGlossaryComponent } from './dfs-glossary.component';

describe('DfsGlossaryComponent', () => {
  let component: DfsGlossaryComponent;
  let fixture: ComponentFixture<DfsGlossaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfsGlossaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfsGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
