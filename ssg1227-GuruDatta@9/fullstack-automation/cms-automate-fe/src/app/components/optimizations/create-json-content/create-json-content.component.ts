import { Component, OnInit } from '@angular/core';
import { LookupValues } from '../../utils/lookup-values';
import { ListService } from '../../../services/list.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from  'rxjs';
@Component({
  selector: 'app-create-json-content',
  templateUrl: './create-json-content.component.html',
  styleUrls: ['./create-json-content.component.css']
})
export class CreateJsonContentComponent implements OnInit {

  @Input() imageFiles:string[] = ["A","B","C"];
  /* RIGHT NOW config files are only one level deep, so dont need the 'rippling' logic for images */
  lookups: LookupValues = new LookupValues();
  rootImageFolder = this.lookups.rootImageSourceFolder
  canvassSizes = this.lookups.canvassSizes ;
  contentTypes = this.lookups.contentTypes ;
  level1Files = ["",""] ;
  level1Select = "";
  level1WebAppSelect = "";
  get ImageFiles():string { return JSON.stringify(this.imageFiles) }
  imageListJSON = this.fb.group( {
    imageTab: ['Ganesh'],
    imageMenu: ['ganesh-gte-Q1-2023'],
    imageCanvassSize: ['A3'],
    imageSketchType: ['black-white'],
    iterations:[""],
    fileNameDescription:[""],
    evolution: ['rgererge'],
    evolutuonDate: ['06-13-2023'],
    evolutionSequence: ['3'],
  });
  fileNameDescription = "";
  iterations = "";

  showEvolution = true ;
  constructor(private listService: ListService,  private fb: FormBuilder) { }
  /* Iteratively
   1. single dimension form with dynamic text addition for file description 
  */
  /*
   public String listFileToUpdate;

    public String imageCanvassSize ;
    public String imageSketchType;
    public String[] fullFileNames = null;
    public String[] fileDescriptions = null;

    public String evolution;
    public String evolutionDate ;
    public String evolutionSequence;
    public String dateUploaded ;
    public String rating;
    public String  ratingYear;
    public String  duplicate;
  */
  ngOnInit(): void {
      this.getImageListFiles(this.rootImageFolder);
      /* eslint-disable */
      const iterationsArray  = this.imageListJSON.controls.iterations as any ; // FormArray<unknown>;
      this.imageFiles.forEach((file:string, index:number) =>{
        const imageDetail =this.fb.group( {
          filename: [file],
          fileDescription: [""]
        },)
        iterationsArray.push(imageDetail)
      })
    //  this.imageListJSON.
  }
  getImageListFiles(parent:string, level:number=1)  {
    this.listService.getFolderContent(parent)// { fileName: "tedt",description:"hefhkf"})
   .subscribe(
     (response:any)=> { 
       switch(level) {
         case 1:  this.level1Files = response ;
           break ;
       }62
      
     },
     (err:any)=>{ console.log(`ERROR ${err}`);  ; },
     () => { console.log('complete') ;   },
   )
 }
 selectImageListFile(event:any,level=2) {
  this.level1Select = event.target.value; 
 }

 get FormValues():string {
  return JSON.stringify(this.imageListJSON.value);
}
getIterationnMutipleText(textLines:string[], i:any) {
  let thisIterStart = '';
  let thisIterEnd = '';
  if (this.imageFiles.length > 1) {
    if (i === 0)
    thisIterStart = `[`;
    if (i== this.imageFiles.length -1 )
    thisIterEnd = `],`;
  }
  
  let iterationDescriptionHTML = ` fullFileName: \`${this.imageFiles[i]}\`, description: <ul>` ;
  textLines.forEach((textLine:string) => {
    if (textLine.trim() !== "") {
      iterationDescriptionHTML = `<li>${iterationDescriptionHTML} ${textLine} </li>`;
    }
  })
  if (i === 0) {
    this.fileNameDescription = iterationDescriptionHTML ;
    this.imageListJSON.controls["fileNameDescription"].setValue(iterationDescriptionHTML);
  }
  this.iterations = `${thisIterStart} ${this.iterations} ${iterationDescriptionHTML} ${thisIterEnd}`;
  this.imageListJSON.controls["iterations"].setValue(this.iterations);
}
getEvolutionMutipleText(textLines:string[]) {
  let evolutionHTML = `<b>`;
 
  this.imageListJSON.controls["evolution"].setValue(textLines.toString());
}
 onSubmit() {}
}
