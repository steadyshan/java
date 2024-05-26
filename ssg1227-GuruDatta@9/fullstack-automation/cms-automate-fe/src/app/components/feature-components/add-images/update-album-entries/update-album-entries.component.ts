import { Component, OnInit } from '@angular/core';
import { LookupValues } from '../../../utils/lookup-values';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-album-entries',
  templateUrl: './update-album-entries.component.html',
  styleUrls: ['./update-album-entries.component.css']
})
export class UpdateAlbumEntriesComponent implements OnInit {
  // listingContent =[""];
  @Output() albumEntriesAdd = new EventEmitter<string[]>();

  @Input() albumEntriesContent:string[] =[];
  constructor() { }

  ngOnInit(): void {
  }
  submitAlbumEntries(){
    this.albumEntriesAdd.emit(this.albumEntriesContent);
  }
}
