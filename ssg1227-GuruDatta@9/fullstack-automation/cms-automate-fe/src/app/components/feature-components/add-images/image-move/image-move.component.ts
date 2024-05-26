import { Component, OnInit } from '@angular/core';
import { LookupValues } from '../../../utils/lookup-values';
import { ListService } from '../../../../services/list.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-image-move',
  templateUrl: './image-move.component.html',
  styleUrls: ['./image-move.component.css']
})
export class ImageMoveComponent implements OnInit {
  mockdata = true; 
  @Output() imageVersionsDone = new EventEmitter<string[]>();
  /// 
   currentFile =  '/Users/shantanu/Downloads/TaraporewallaJune282023.jpeg';
  lookups: LookupValues = new LookupValues();
  destinationStart = this.lookups.rootImageDestinationFolder ;
  rootImageSourceFolder = this.lookups.rootImageSourceFolder ;
  rootImageDestinationFolder = this.lookups.rootImageDestinationFolder ;
  currentParentFolder = this.lookups.rootImageDestinationFolder ;
  webAppRelativeFolderRoot = this.WebAppRoot;
  currentWebAppParentFolder =  this.WebAppRoot;
  level1Files = ["",""] ;
  level1Select = "";
  level1WebAppSelect = "";
  level2Files = ["",""] ;
  level2Select = "";
  level3Files = ["",""] ;
  level3Select = "";
  level4Files = ["",""] ;
  level4Select = "";
  level5Files = ["",""] ;
  level5Select = "";
  imageFileName="ee"
  destImageFileName="ff"
  imageFiles:string[]=[] ;
  useImageRoot = true ;
  imgR() {
    this.useImageRoot = !this.useImageRoot ;
  }
  constructor(private listService: ListService) { }
  get WebAppRoot() : string 
  {
    ;
    return this.currentParentFolder.substring(this.currentParentFolder.indexOf('asset') ) ;
  }
  ngOnInit(): void {
    this.getImageFolders(this.rootImageDestinationFolder, 1) ;
  }
  getImageSubFolder(event:any, level:number){
    switch(level) {
      case 1:  this.level1Select =  event.target.value;
              this.currentParentFolder = `${this.rootImageDestinationFolder}/${event.target.value}`;
              this.currentWebAppParentFolder  = `${this.webAppRelativeFolderRoot}${event.target.value}`
        break ;
      case 2:  this.level2Select =  event.target.value;
        this.currentParentFolder = `${this.rootImageDestinationFolder}/${this.level1Select}/${event.target.value}`;
        this.currentWebAppParentFolder  = `${this.webAppRelativeFolderRoot}${this.level1Select}${event.target.value}`;
        break ;
      case 3:  this.level3Select =  event.target.value;
        this.currentParentFolder = `${this.rootImageDestinationFolder}/${this.level1Select}/${this.level2Select}/${event.target.value}`;
        this.currentWebAppParentFolder  = `${this.webAppRelativeFolderRoot}${this.level1Select}${this.level2Select}/${event.target.value}`;
        break ;
        case 4:  this.level4Select =  event.target.value;
        this.currentParentFolder = `${this.rootImageDestinationFolder}/${this.level1Select}/${this.level2Select}/${this.level3Select}/${event.target.value}`;
        this.currentWebAppParentFolder  = `${this.webAppRelativeFolderRoot}${this.level1Select}${this.level2Select}/${this.level3Select}/${event.target.value}`;
        break ;
 
    }
     this.getImageFolders(this.currentParentFolder, level) ;
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
    moveFile() {
         console.log(`${this.rootImageSourceFolder} ${this.currentParentFolder}`) ;
        let moveDetail = {
          sourceFolder: this.rootImageSourceFolder,
          destinationFolder:this.currentParentFolder,
          sourceFileName:this.imageFileName.trim(),   
          destFileName:
            this.destImageFileName.trim() !== '' && this.destImageFileName.trim() !== this.imageFileName? 
            this.destImageFileName.trim():this.imageFileName.trim() ,   
        }
     /*
      moveDetail = {
        sourceFolder: "/Users/shantanu/Downloads/Sketch-transit/", //this.currentParentFolder,
        destinationFolder: "/Users/shantanu/Documents/GitHub/ssg1227-GuruDatta@9/cms-code/art-is-worship/src/assets/gallery-files/images/religion/aumkar-shree-ganesh/gte-q1-2024/",//  //
        sourceFileName:"GuruInBayAreaWithGanesh0510242.jpeg",// this.imageFileName,   
        destFileName:"GuruInBayArea051024.jpeg",//  
      }
      */
   //   this.listService.moveImageFile( moveDetail)// { fileName: "tedt",description:"hefhkf"})
        let fileToPush = '';
        this.listService.moveImageFile( moveDetail)// { fileName: "tedt",description:"hefhkf"})
        .subscribe(
          (response:any)=> { 
            console.log('success') ;
            let assetInd = this.currentParentFolder.indexOf('asset') ;
            fileToPush = this.useImageRoot === true ? "${this.imageRoot}" + this.imageFileName :
           `${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`
            this.imageFiles.push(fileToPush);
        //    this.imageFiles.push(`${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`);
            
          },
          (err:any)=> { 
            let assetInd = this.currentParentFolder.indexOf('asset') ;
            
            fileToPush = this.useImageRoot === true ? "${this.imageRoot}" + this.imageFileName :
           `${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`
            this.imageFiles.push(fileToPush);
        // this.imageFiles.push(`${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`);
            console.log(`ERROR ${err}`)
          },
          () => {
            console.log('complete');
            let assetInd = this.currentParentFolder.indexOf('asset') ;
            
            fileToPush = this.useImageRoot === true ? "${this.imageRoot}" + this.imageFileName :
           `${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`
            this.imageFiles.push(fileToPush);
        // this.imageFiles.push(`${this.currentParentFolder.substring(assetInd).replace(`//`,`/`)}/${this.imageFileName}`);
            
          }
        )
    }
    moveFileComplete() {
      console.log(`${this.currentParentFolder} ${JSON.stringify(this.imageFiles)}`);
      this.imageVersionsDone.emit(this.imageFiles);
    }
    moveFileReverse() {
      let moveDetail = {
        sourceFolder: this.currentParentFolder,
        destinationFolder:this.rootImageSourceFolder,
        sourceFileName:this.imageFileName,   
        destFileName:this.imageFileName,   
      }
       /*
      moveDetail = {
        destinationFolder: "/Users/shantanu/Downloads/Sketch-transit/", //this.currentParentFolder,
        sourceFolder: "/Users/shantanu/Documents/GitHub/ssg1227-GuruDatta@9/cms-code/art-is-worship/src/assets/gallery-files/images/religion/aumkar-shree-ganesh/gte-q1-2024/",// `/Users/shantanu/Documents/GitHub/ssg1227-GuruDatta@9/images/religion/aumkar-shree-ganesh/gte-q1-2024/`,//  //
        destFileName:"GuruInBayAreaWithGanesh0510242.jpeg",// this.imageFileName,   
        sourceFileName:"GuruInBayArea051024.jpeg",//  
      }
     
      moveDetail = {
        sourceFolder: `/Users/shantanu/Documents/test2/`, //this.currentParentFolder,
        destinationFolder: `/Users/shantanu/Documents/test1/`, //
        sourceFileName:'NrusimhaSaraswatiJan152021.png',// this.imageFileName,   
        destFileName:'EDunsigned4NarasimhaSaraswatiJan152021.png',//  
      }
      */
     // this.listService.moveImageFile( moveDetail)// { fileName: "tedt",description:"hefhkf"})
      this.listService.moveImageFile( moveDetail).subscribe(
        (response:any)=> { 
          console.log('success') ;
        },
        (err:any)=>console.log(`ERROR ${err}`),
        () => console.log('complete'),
      )
    }
}
