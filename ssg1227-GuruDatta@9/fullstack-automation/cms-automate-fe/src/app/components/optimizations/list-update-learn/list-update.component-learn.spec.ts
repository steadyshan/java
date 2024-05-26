import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpdateLearnComponent } from './list-update-learn.component';

describe('ListUpdateComponent', () => {
  let component: ListUpdateLearnComponent;
  let fixture: ComponentFixture<ListUpdateLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUpdateLearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUpdateLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
