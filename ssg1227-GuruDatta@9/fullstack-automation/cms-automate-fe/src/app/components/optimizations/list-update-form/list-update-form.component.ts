import { LookupValues } from './lookup-values-todelete';
import { ListService } from '../../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from  'rxjs';
interface FileUpload {
  fullFileName?:string;
  fileName?:string;
  evolution?:string;
  evolutionSequence?:string;
  evolutionDate?:string;
  rating:1;
  description:string;
  categories?:string ;
  title?:string;
  iterations?:FileUpload[];
}
@Component({
  selector: 'app-list-update-form',
  templateUrl: './list-update-form.component.html',
  styleUrls: ['./list-update-form.component.css']
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
export class ListUpdateFormComponent implements OnInit {
  listsResp:any ;
  isStarted:boolean=false ;
  timerVar:any ;
  startIndex=0; endIndex= 0;
  dataGetter:any  = null ;
  headers:any ;
  headerStr:string = "";
  imageFolderPrefix=`/Users/shantanu/Documents/GitHub/js-frameworks/Angular_lte_4/shan-cms-template/src/assets/all-images/`;
  religious=true ;
  imageUpdates = [
    // religion/shree-ganesh-gte-q1-2023/Ganesh-1-March1723.jpeg
    // religion/shirdi-sai-q2-q3-2023/Baba-Milpitas-050423-1.jpeg
  ]
  imageUploads = [1,2];
  lookups: LookupValues = new LookupValues();
  
  imageTabs = this.lookups.imageTabs ;
  canvassSizes = this.lookups.canvassSizes ;
  contentTypes = this.lookups.contentTypes;
  selectedImageMenu ?= [
    "ganesh", "ganesh-gte-Q2-2021", "ganesh-gte-Q3-2022", "ganesh-gte-Q1-2023"
  ]
  evolutionSequence = [
    "1", "2", "3", "4"
  ]
  observableOut = '';
  testObservable = new Observable(subscriber => {  
    this.imageTabs.forEach((tab:any) => {
      setTimeout(() => {
        this.observableOut = `${this.observableOut}, ${tab.name} cat, menus:`;
        tab.menus.forEach((mm:any) => {
          this.observableOut = `${this.observableOut} => ${mm}`;
        },
        subscriber.next(this.observableOut)) ;
      }, 3000)
    })
   
  });  
  maxIters = 5 ;
  
 
  newImageSet = this.fb.group( {
    sourceFolderFile1: ['/Users/shantanu/Downloads'],
    destinationFolderFile1: ['/Users/shantanu/Documents/GitHub/js-frameworks/Angular_lte_4/shan-cms-template/src/assets/all-images/religion/shree-ganesh-gte-q1-2023/'],
    destinationURL1: ['assets/all-images/religion/shree-ganesh-gte-q1-2023/'],
    imageTab1: ['Ganesh'],
    imageMenu1: ['ganesh-gte-Q1-2023'],
    imageCanvass1: ['A4'],
    imageCanvassContent1: ['black-white'],
    fullFileName1:[''],
    description1:[''],
    evolution1: ['ddd'],
    evolutionDate1: [this.FormattedDate],
    evolutionSequence1: [this.lookups.currentEvolutionSequence],
    dateUploaded:[this.FormattedDate],
    rating1:["1"],
    ratingYear1:["2023"],
    iteration1FullFileName1:[''],
    iteration1description1:[''],
    iteration2FullFileName1:[''],
    iteration2description1:[''],
    iteration3FullFileName1:[''],
    iteration3description1:[''],
   // iterations1:null,
    duplicate1:['false'],
    /*
    imageTab2: ['Ganesh'],
    imageMenu2: ['ganesh-gte-Q1-2023'],
    imageCanvass2: ['A3'],
    */
  });
  constructor(private listService: ListService, private fb: FormBuilder, ) { 

  }

  ngOnInit(): void {
  }
  get FormattedDate():string {
    let today = new Date() ;
    let monthdn = today.getMonth()+1
    let monthd = monthdn < 10 ? `0${monthdn}`: `${monthdn}`;
    let dated = today.getDate() < 10 ? `0${today.getDate()}`: `${today.getDate()}`;
    return `${monthd}-${dated}-${today.getFullYear()}`;
  }
  get FormValues():string {
    return JSON.stringify(this.newImageSet.value);
  }
  get Iterations() {
    return this.newImageSet.get('iterations') as FormArray ;
  }
  // in screen events
  getNewMenu(index=1) {
    
    let newArray = this.imageTabs.find(a => a.name === this.newImageSet.controls[`imageTab${index}`].value)?.menus;
    if(newArray && newArray.length > 0) {
      this.selectedImageMenu = [];
      this.selectedImageMenu = newArray.join().split(',')
      this.newImageSet.controls[`imageMenu${index}`].setValue(this.selectedImageMenu[0]);
    }

  }
  addListing() {
    let imageDetail = {
     listFileToUpdate: "listFileToUpdate",
    imageCanvassSize:"imageCanvassSize",
    imageSketchType:"imageSketchType",
    fullFileNames : ["a","b","c"],
    fileDescriptions: ["1","2","3"],

    evolution:"evolution",
    evolutionDate :"evolutionDate",
    evolutionSequence:"evolutionSequence",
    dateUploaded:"dateUploaded",
    rating:"2",
    ratingYear:"2222",
    iteration1FullFileName1:"",
    iteration1description1:"",
    iteration2FullFileName1:"",
    iteration2description1:"",
    iteration3FullFileName1:"",
    iteration3description1:"",
  }
  alert('aa');
    /*
    /processImage
    */
    this.listService.addListing(imageDetail)
    .subscribe(
      (response:any)=> { 
        console.log(`${JSON.stringify(response)}`) ;
      },
      (err:any)=>console.log(`ERROR ${err}`),
      () => console.log('complete'),
    )
  }
  onSubmit() {
   /* this.listService.getPostList()
    .subscribe(
      (response:any)=> { 
        console.log('success') ;
      },
      (err:any)=>console.log(`ERROR ${err}`),
      () => console.log('complete'),
    )
    */
    
    this.listService.moveImageFile( this.newImageSet.value)// { fileName: "tedt",description:"hefhkf"})
    .subscribe(
      (response:any)=> { 
        console.log('success') ;
      },
      (err:any)=>console.log(`ERROR ${err}`),
      () => console.log('complete'),
    )
  }
  /*
  startStopToggle(){
    if (this.isStarted === false) {
      let me = this;
      this.dataGetter(
        (subscriber:any) => {
          subscriber.next();
        }
      );
      this.dataGetter.subscribe({  
        next(x:any) { console.log('We have got value ' + x); },  
        error(err:any) { console.error('something wrong occurred: ' + err); },  
        complete() { console.log('Done successfully'); }  
      });  
    } else {
      this.listsResp = [];
      this.isStarted = false ;
    }
  }  
  */
}
