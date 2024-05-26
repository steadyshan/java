import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileJsonContentComponent } from './compile-json-content.component';

describe('CompileJsonContentComponent', () => {
  let component: CompileJsonContentComponent;
  let fixture: ComponentFixture<CompileJsonContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompileJsonContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompileJsonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
