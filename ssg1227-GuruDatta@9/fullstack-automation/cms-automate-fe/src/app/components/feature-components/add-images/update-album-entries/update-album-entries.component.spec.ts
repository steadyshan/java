import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlbumEntriesComponent } from './update-album-entries.component';

describe('UpdateAlbumEntriesComponent', () => {
  let component: UpdateAlbumEntriesComponent;
  let fixture: ComponentFixture<UpdateAlbumEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAlbumEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAlbumEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
