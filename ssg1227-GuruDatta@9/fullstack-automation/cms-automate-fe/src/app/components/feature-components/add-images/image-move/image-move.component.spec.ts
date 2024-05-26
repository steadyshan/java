import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMoveComponent } from './image-move.component';

describe('ImageMoveComponent', () => {
  let component: ImageMoveComponent;
  let fixture: ComponentFixture<ImageMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
