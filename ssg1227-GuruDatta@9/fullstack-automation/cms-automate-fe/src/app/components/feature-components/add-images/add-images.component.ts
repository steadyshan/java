import { LookupValues } from './../../utils/lookup-values';
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../services/list.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  imageList:string[] = [] ;
  imagesMoved = true ;
  jsonListingFile =""
  jsonListing:string[] = [] ;
  lookupValues = new LookupValues();
  constructor(private listService: ListService, ) { }

  ngOnInit(): void {
  }

  passImageFolders(imageFolders:string[]) {
    this.imageList = imageFolders ;
    this.imagesMoved = true ;
    console.log(`passImageFolders ${JSON.stringify(imageFolders)}`);
  }
  jsonFileToUpdate(configFileFolderAndKeys:string[]) {
    this.jsonListingFile = configFileFolderAndKeys[0] ;
  }
  jsonToUpdate(jsonStrings:string[]) {
    console.log(`${jsonStrings}`);
    this.jsonListing = jsonStrings ;
 
  }
  // Getters, Styling etc
  componentDivStyle = {padding: '3px', background: 'aliceblue', margin:'3px', border: '3px inset blue'};
  get ComponentDivStyle()  :any {
    return  this.componentDivStyle ;
  }
  displayToggle(id:any, show = true )  {
    let m = document.getElementById(id) ;
   if (m) {
      show == true ? m.style.display = 'block':m.style.display = 'none';
   }
  }
  showComponent(whichDiv:any)  {
   
  }
  reset() {
    this.imageList = [];
    this.imagesMoved = true;
    this.jsonListing = [] ;
    this.jsonListingFile = '';
    
  }
  isPostDataReady() {
    return this.jsonListing.length === 0 || this.jsonListingFile === '';
  }
  postJSONUpdate() {
    console.log(`POSTJSONUPDATE: ${JSON.stringify(this.jsonListing)} ${this.jsonListingFile}`) ;
    this.listService.updateListFile(this.jsonListing, this.jsonListingFile)
     .subscribe(
      (response:any)=> { 
        console.log('success') ;
        this.imageList = [""];
      },
      (err:any)=> { 
         console.log(`ERROR ${err}`)
      },
      () => {
        if (confirm("Data Submitted; clear it?")) this.reset() ;
        console.log('complete');      
      }
    )
  }

  albumEntryTextList=[this.lookupValues.albumsInsertTextFile,"","","",""];
  addAlbumEntry(textLines:string[]) {
    this.listService.addAlbumEntry(textLines)
     .subscribe(
      (response:any)=> { 
        console.log('success') ;
        this.imageList = [""];
      },
      (err:any)=> { 
         console.log(`ERROR ${err}`)
      },
      () => {
        if (confirm("Data Submitted; clear it?")) this.reset() ;
        console.log('complete');      
      }
    )
  }
}
