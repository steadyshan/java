import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core'
import { FormArray, FormBuilder,FormControl,FormGroup} from "@angular/forms";
import { ListService } from  '../../../services/list.service';
@Component({
  selector: 'app-folder-tree-expand',
  templateUrl: './folder-tree-expand.component.html',
  styleUrls: ['./folder-tree-expand.component.css']
})
export class FolderTreeExpandComponent implements OnInit {
  @Input() rootFolder = '';
  @Input() depth = 4 ;
  @Output() finalDestination = new EventEmitter<string>();
  
  destinationFile = "";
  folderLists = [
    [""],
  ];
  Folder(i:number) {
    return this.folderLists[i]
  }
  constructor(private formBuilder: FormBuilder, private listService: ListService) { 
  }
  public folderTreeForm:FormGroup = this.formBuilder.group({
    folderLines: this.formBuilder.array([]),
    fileName: [""]
  });
  
  ngOnInit(): void {
    this.formInit() ;
  }
  formInit() {
    for (let i = 1 ; i <= this.depth; i++){
     this.FolderSelects.push(new FormControl(`sub${i}`));
     let emptyArr = [ `select${i}`];
     if(i === 1) {
        this.folderLists[i-1] = emptyArr;
        this.getImageFolders(this.rootFolder, this.folderLists[i-1],0 )
     }  else 
       this.folderLists.push(emptyArr);
    }
    //  this.form = 
  }
  get FolderSelects():FormArray  {
    return this.folderTreeForm.controls["folderLines"] as FormArray;
  }
  getSub(i:any) {
    return `sub${i}`
  }
  getImageFolders(parent:any, folderList:any=null, i:number=0)  {
    if (folderList === null) {
      return ;
    }
    this.listService.getFolderContent(parent)// { fileName: "tedt",description:"hefhkf"})
   .subscribe(
     (response:any)=> { 
       if (response && Array.isArray(response)) {
         response.forEach(st => folderList.push(st));
       }
      /*
       switch(level) {
         case 1:  this.level1Files = response ;
           break ;
         case 2:  this.level2Files = response ;
           break ;
         case 3:  this.level3Files = response ;
           break ;
       }
      */
     },
     (err:any)=>{ console.log(`ERROR ${err}`);  ; },
     () => { console.log('complete') ;   },
   )
 } 
  
  sendFinalDestinationFile() {
    this.finalDestination.emit(this.destinationFile);
  }

}
