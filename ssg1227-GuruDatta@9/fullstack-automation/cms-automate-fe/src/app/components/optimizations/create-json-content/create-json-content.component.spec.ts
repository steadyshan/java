import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJsonContentComponent } from './create-json-content.component';

describe('CreateJsonContentComponent', () => {
  let component: CreateJsonContentComponent;
  let fixture: ComponentFixture<CreateJsonContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJsonContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJsonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
