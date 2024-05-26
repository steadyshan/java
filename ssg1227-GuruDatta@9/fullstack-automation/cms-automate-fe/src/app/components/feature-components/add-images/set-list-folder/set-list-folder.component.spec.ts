import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetListFolderComponent } from './set-list-folder.component';

describe('SetListFolderComponent', () => {
  let component: SetListFolderComponent;
  let fixture: ComponentFixture<SetListFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetListFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
