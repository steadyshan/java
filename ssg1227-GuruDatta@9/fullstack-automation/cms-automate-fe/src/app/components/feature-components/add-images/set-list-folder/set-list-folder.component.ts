import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { LookupValues } from '../../../utils/lookup-values';
import { ListService } from '../../../../services/list.service';

@Component({
  selector: 'app-set-list-folder',
  templateUrl: './set-list-folder.component.html',
  styleUrls: ['./set-list-folder.component.css']
})
export class SetListFolderComponent implements OnInit {

  
  @Output() configFileFound = new EventEmitter<string[]>();
  lookups: LookupValues = new LookupValues();
  rootConfigFolder = this.lookups.rootConfigFolder ;
  configFileFolder = this.rootConfigFolder ;
  currentParentFolder =  this.rootConfigFolder;
  keys = this.lookups.keys;
  key = '';
  level1Files = ["",""] ;
  level1Select = "";
  level1WebAppSelect = "";
  level2Files = ["",""] ;
  level2Select = "";
  level3Files = ["",""] ;
  level3Select = "";
  level4Files = ["",""] ;
  level4Select = "";
  imageFileName="ee"
  imageFiles:string[]=[] ;
  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getImageFolders(this.rootConfigFolder, 1) ;
  }

  getImageFolders(parent:string, level:number)  {
    this.listService.getFolderContent(parent)// { fileName: "tedt",description:"hefhkf"})
   .subscribe(
     (response:any)=> { 
       switch(level) {
         case 1:  this.level1Files = response ;
           break ;
         case 2:  this.level2Files = response ;
           break ;
         case 3:  this.level3Files = response ;
           break ;
           case 4:  this.level4Files = response ;
             break ;
       }
      
     },
     (err:any)=>{ console.log(`ERROR ${err}`);  ; },
     () => { console.log('complete') ;   },
   )
 } 

 getImageSubFolder(event:any, level:number){
  switch(level) {
    case 1:  this.level1Select =  event.target.value;
            this.currentParentFolder = `${this.rootConfigFolder}/${event.target.value}`;
       break ;
    case 2:  this.level2Select =  event.target.value;
      this.currentParentFolder = `${this.rootConfigFolder}/${this.level1Select}/${event.target.value}`;
      break ;
    case 3:  this.level3Select =  event.target.value;
    alert(this.level3Select);
      this.currentParentFolder = `${this.rootConfigFolder}/${this.level1Select}/${this.level2Select}/${event.target.value}`;
      break ;
      case 4:   
      alert(event.target.value);
        this.currentParentFolder = `${this.rootConfigFolder}/${this.level1Select}/${this.level2Select}/${this.level3Select}/${event.target.value}`;
        break ;
  }
  this.currentParentFolder = this.currentParentFolder.replace(`//`,`/`).replace(`//`,'/').replace('(file)','');
  this.getImageFolders(this.currentParentFolder, level) ;
}
  verifyConfigLocation() {
    this.configFileFolder = this.currentParentFolder;
    let configFileFolderAndKeys = [ this.configFileFolder, this.key ]
    this.configFileFound.emit(configFileFolderAndKeys);
  }
 }
