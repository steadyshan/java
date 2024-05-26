import { Component, OnInit } from '@angular/core';
import { LookupValues } from '../../../utils/lookup-values';
import { ListService } from '../../../../services/list.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from  'rxjs';
@Component({
  selector: 'app-compile-json-content',
  templateUrl: './compile-json-content.component.html',
  styleUrls: ['./compile-json-content.component.css']
})
export class CompileJsonContentComponent implements OnInit {

  @Input() imageFileList:string[] =[];
  @Input() listingContent:string[] =[];

  // listingContent =[""];
  @Output() jsonReady = new EventEmitter<string[]>();
  /* /Users/shantanu/Documents/GitHub/js-frameworks/Angular_lte_4/shan-cms-template/src/assets/data-and-config/data/religious/ganesh-gte-q1-2023.image.list.ts */
  /* RIGHT NOW config files are only one level deep, so dont need the 'rippling' logic for images */
  lookups: LookupValues = new LookupValues();
  canvassSizes = this.lookups.canvassSizes ;
  contentTypes = this.lookups.contentTypes ;
  evolutionSequences = this.lookups.evolutionSequences ;
  showEvolution = false ;
  duplicateImage = false ;
  get ImageFiles():string[] { return (this.imageFileList) }
  totalIterations = this.imageFileList.length ;
  currentIteration = 0 ;
  iterationArray = [""];
  imageListJSON = this.fb.group( {
    imageTab: ['Ganesh'],
    imageMenu: ['ganesh-gte-Q1-2023'],
    canvassSize: [''],
    evolutionSequenceList:['4'],
    content: [''],
    dateUploaded:[`${this.FormattedDate}`],
    iterations:[[""]],
    iterationString:[""],
    fileName:[""],
    fileDescription:[""],
    evolution: ['rgererge'],
    evolutionDate: [`${this.FormattedDate}`],
    evolutionSequence: ['2'],
    rating:['0'],
    ratingYear:['2023']
  });
  fileNameDescription = "";
  iterationsList = "";
  iterations = "";
  get FormattedDate():string {
    let today = new Date() ;
    let monthdn = today.getMonth()+1
    let monthd = monthdn < 10 ? `0${monthdn}`: `${monthdn}`;
    let dated = today.getDate() < 10 ? `0${today.getDate()}`: `${today.getDate()}`;
    return `${monthd}-${dated}-${today.getFullYear()}`;
  }
  dup() {
    this.duplicateImage = !this.duplicateImage ;
   // alert(`${this.duplicateImage}`)
  }
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
      }
 ngOnChanges() {
    this.totalIterations = this.imageFileList.length ;
 }
 get FormValues():string {
  return JSON.stringify(this.imageListJSON.value);
}
// /Volumes/Macintosh HD-1/Users/SonicUser/Public/reads/Solar Subordination Checklist.pdf
getIterationnMutipleText(textLines:string[]) {
  let fileName = `fullFileName: \`${this.ImageFiles[this.currentIteration]}\`,`;
  let fileDescription = `description: \`<ul>`
  console.log(`Total Iterarions ${this.totalIterations}`);
  textLines.forEach((textLine:string) => {
    if (textLine.trim() !== "") {
      fileDescription = `${fileDescription}<li> ${textLine} </li>`;
    }
  })
  fileDescription = `${fileDescription}</ul>\``;
  if (this.currentIteration === 0) {
    this.imageListJSON.controls["fileName"].setValue(fileName);
    this.imageListJSON.controls["fileDescription"].setValue(fileDescription);
    if (this.totalIterations > 1) {
      this.iterationArray = [];
      this.iterationsList = `iterations: [`
      this.iterationArray.push(this.iterationsList) ;

    }
  }
  if (this.totalIterations > 1) {
    /*
    iterations:[[""]],
    iterationString:[""],
    
    */
    this.iterationArray.push(`{${fileName} ${fileDescription} },`) ;
    this.iterationsList = `${this.iterationsList} {${fileName} ${fileDescription} },` ;
    this.currentIteration++ ;
    if (this.currentIteration === this.totalIterations) {
      this.iterationArray.push(`]`) ;
      this.iterationsList = `${this.iterationsList} ]` ;
      this.imageListJSON.controls["iterations"].setValue(this.iterationArray);
    
      this.imageListJSON.controls["iterationString"].setValue(this.iterationsList);
        
    }
  }
  this.updateListingContent();

 // this.iterations = `${thisIterStart} ${this.iterations} ${iterationDescriptionHTML} ${thisIterEnd}`;
 //\ this.imageListJSON.controls["iterations"].setValue(this.iterations);
}

getEvolutionMutipleText(textLines:string[]) {
  let evolutionHTML = ``;
  textLines.forEach((textLine:string) => {
    if (textLine.trim() !== "") {
      evolutionHTML === ''? 
        evolutionHTML = `<b>${textLine}<br/>`:
        evolutionHTML = `${evolutionHTML}${textLine}<br/>`
   //     console.log(`${textLine}, ${evolutionHTML}`);
    }
  });
  if (evolutionHTML !== '') {
    this.imageListJSON.controls["evolution"].setValue(`${evolutionHTML}</B>`);
  }
  this.updateListingContent();
}
changeEvolutionState() {
  this.showEvolution = !this.showEvolution ;
}
get ListingContent():string[] {
  return this.listingContent ;
}
 onSubmit() {
   this.updateListingContent() ;
   console.log(`${this.listingContent}`);
    this.jsonReady.emit(this.listingContent);
 }
 updateListingContent() {
    this.listingContent= [];
    this.listingContent.push("{") ;
    this.listingContent.push(`canvassSize:  '${this.imageListJSON.controls["canvassSize"].value}',`) ;
    this.listingContent.push(`content:  '${this.imageListJSON.controls["content"].value}',`) ;
    this.listingContent.push(`dateUploaded:  '${this.imageListJSON.controls["dateUploaded"].value}',`) ;
    if (this.duplicateImage === true )
      this.listingContent.push(`duplicate:  'true',`) ;
    if (this.showEvolution === true) {
      this.listingContent.push(`evolution:  \`${this.imageListJSON.controls["evolution"].value}\`,`) ;
      this.listingContent.push(`evolutionSequence:  ${this.imageListJSON.controls["evolutionSequenceList"].value},`) ;
      this.listingContent.push(`evolutionDate:  '${this.imageListJSON.controls["evolutionDate"].value}',`) ;
    }
    this.listingContent.push(`${this.imageListJSON.controls["fileName"].value}`);
    this.listingContent.push(`${this.imageListJSON.controls["fileDescription"].value},`);
   
    let rateVal = this.imageListJSON.controls["rating"].value? this.imageListJSON.controls["rating"].value: "";
    if(rateVal.indexOf("0") < 0) {
    // if (this.imageListJSON && this.imageListJSON.controls  &&
    //          this.imageListJSON.controls["rating"].value.indexOf("0") < 0) {
      this.listingContent.push(`rating:  ${this.imageListJSON.controls["rating"].value},`) ;
      this.listingContent.push(`ratingYear:  ${this.imageListJSON.controls["ratingYear"].value},`) ;
   
    }
    if (this.totalIterations > 1) {
      this.iterationArray.forEach( it => {
        this.listingContent.push(it) ;
      })
     // this.listingContent.push( this.imageListJSON.controls["iterationString"].value())
      /* use iteration array later
      this.listingContent.push(`iterations:[`);
      this.imageListJSON.controls["iterations"].value().array.forEach((element:any) => {
        this.listingContent.push(`${element},`);
      });
      this.listingContent.push(`],`);
     */
    }
    /*
     imageCanvassSize: ['A3'],
    imageSketchType: ['black-white'],
    dateUploaded:[`${this.FormattedDate}`],
    iterations:[""],
    fileNameDescription:[""],
    canvassSize: 'A4', content:'color-pencil',
     canvassSize: ['A3'],
    content: ['black-white'],
    
    */
     
    
    this.listingContent.push("},")
  }
}
