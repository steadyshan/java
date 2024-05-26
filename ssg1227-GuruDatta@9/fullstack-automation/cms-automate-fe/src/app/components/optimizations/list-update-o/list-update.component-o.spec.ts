import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpdateOComponent } from './list-update-o.component';

describe('ListUpdateOComponent', () => {
  let component: ListUpdateOComponent;
  let fixture: ComponentFixture<ListUpdateOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUpdateOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUpdateOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
