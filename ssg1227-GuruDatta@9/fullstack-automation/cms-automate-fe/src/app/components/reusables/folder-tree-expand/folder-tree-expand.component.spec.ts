import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderTreeExpandComponent } from './folder-tree-expand.component';

describe('FolderTreeExpandComponent', () => {
  let component: FolderTreeExpandComponent;
  let fixture: ComponentFixture<FolderTreeExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderTreeExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTreeExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
