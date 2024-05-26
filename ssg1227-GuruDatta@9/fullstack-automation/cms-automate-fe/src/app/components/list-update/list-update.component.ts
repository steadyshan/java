import { LookupValues } from '../utils/lookup-values';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from  'rxjs';

@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.css']
})

/*
  {  
        fullFileName: `assets/all-images/religion/dattavatar/SwamiDatta-photoready-8x10-proto1.png`, 
        evolution: `<b> The first of my sketches to be viewed at a physical public place<br/>
                    What better settings than a Swami Samartha event in a temple!!?</b><br/>`,
        evolutionSequence: 2, evolutionDate: `11-13-222`,
     
        description: 
        `<ul>
            <li>The previous sketch has been printed on photo paper twice</li>
            <li>And this is a candidate for an 8x10 frame (11/17)</li>
             </ul>`,
            dateUploaded: '11-17-2022',
            iterations:[  {
                fullFileName: `assets/all-images/religion/dattavatar/SwamiDatta-photoready-8x10-proto1.png`, 
        description: 
        `<ul>
            <li>The previous sketch has been printed on photo paper twice</li>
            <li>And this is a candidate for an 8x10 frame (11/17)</li>
            <li>Special mention. Nov 13 2022 Swami's physical presence was established at Sunnyvale Hindu Temple...</li>
            <li>..  The 8x10 photo frame shown (with another having Swami's portrait) was donated to the ceremony</li>
             </ul>`,} ,{
                fullFileName: `assets/all-images/religion/dattavatar/SwamiDatta-photoframe-12x18.jpeg`, 
                description: `<ul>
                            <li>12x18 photo frame on my table </li> </ul>`} ,{
                fullFileName: `assets/all-images/religion/dattavatar/SwamiDatta-photoframe-2-8x10.jpeg`, 
                description: `<ul> <li>Special mention. Nov 13 2022 Swami's physical presence was established at Sunnyvale Hindu Temple...</li>
                <li>..  The 8x10 photo frame shown (with another having Swami's portrait) was donated to the ceremony</li> </ul>`}
            ],
            rating:1 ,
},
*/
export class ListUpdateComponent implements OnInit {
  listsResp:any ;
  isStarted:boolean=false ;
  timerVar:any ;
  startIndex=0; endIndex= 0;
  dataGetter:any  = null ;
  headers:any ;
  headerStr:string = "";
  religious=true ;
  imageUploads = [1,2];
  lookups: LookupValues = new LookupValues();
  
  imageTabs = this.lookups.imageTabs ;
  canvassSizes = this.lookups.canvassSizes ;
  contentTypes = this.lookups.contentTypes;
  rootImageSourceFolder = this.lookups.rootImageSourceFolder ;
  rootImageDestinationFolder = this.lookups.rootImageDestinationFolder ;
  currentParentFolder = this.lookups.rootImageDestinationFolder ;
  rootConfigFolder = this.lookups.rootConfigFolder ;
  level1Files = ["",""] ;
  level1Select = "";
  level2Files = ["",""] ;
  level2Select = "";
  level3Files = ["",""] ;
  level3Select = "";
  selectedImageMenu ?= [
    "ganesh", "ganesh-gte-Q2-2021", "ganesh-gte-Q3-2022", "ganesh-gte-Q1-2023"
  ]
  evolutionSequence = [
    "1", "2", "3", "4"
  ]
  
  constructor(private listService: ListService, private fb: FormBuilder, ) { 

  }
  passImageFolders(imageFolders:string[]) {
    console.log(`${JSON.stringify(imageFolders)}`);
  }
  ngOnInit(): void {
   this.getFolders(this.rootImageDestinationFolder, 1) ;
  }
  getSubFolder(event:any, level:number){
    switch(level) {
      case 1:  this.level1Select =  event.target.value;
              this.currentParentFolder = `${this.rootImageDestinationFolder}/${event.target.value}`
        break ;
      case 2:  this.level2Select =  event.target.value;
        this.currentParentFolder = `${this.rootImageDestinationFolder}/${this.level1Select}/${event.target.value}`;
        break ;
      case 3:  this.level3Select =  event.target.value;
        this.currentParentFolder = `${this.rootImageDestinationFolder}/${this.level1Select}/${this.level2Select}/${event.target.value}`;
        break ;
    }
     this.getFolders(this.currentParentFolder, level) ;
  }
  get FormattedDate():string {
    let today = new Date() ;
    let monthdn = today.getMonth()+1
    let monthd = monthdn < 10 ? `0${monthdn}`: `${monthdn}`;
    let dated = today.getDate() < 10 ? `0${today.getDate()}`: `${today.getDate()}`;
    return `${monthd}-${dated}-${today.getFullYear()}`;
  }
  
  // in screen events
   getFolders(parent:string, level:number)  {
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
        }
       
      },
      (err:any)=>{ console.log(`ERROR ${err}`);  ; },
      () => { console.log('complete') ;   },
    )
  }
 
}
