import { ListService } from '../../services/list.service';
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
  selector: 'app-list-update-learn',
  templateUrl: './list-update-learn.component.html',
  styleUrls: ['./list-update-learn.component.css']
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
export class ListUpdateLearnComponent implements OnInit {
  listsResp:any ;
  isStarted:boolean=false ;
  timerVar:any ;
  startIndex=0; endIndex= 0;
  dataGetter:any  = null ;
  headers:any ;
  headerStr:string = "";
  imageFolderPrefix=` /Users/shantanu/Documents/GitHub/ssg1227-GuruDatta@9/cms-code/art-is-worship/src/assets/gallery-files/images`
  imageUpdates = [
    // religion/shree-ganesh-gte-q1-2023/Ganesh-1-March1723.jpeg
    // religion/shirdi-sai-q2-q3-2023/Baba-Milpitas-050423-1.jpeg
  ]
  imageTabs = [
    { name: "Ganesh", menus:  ["ganesh", "ganesh-gte-Q2-2021", "ganesh-gte-Q3-2022", "ganesh-gte-Q1-2023"]},
    {name: "Gods Goddesses", menus:  ["mahadev", "mahadev and family", "devi", "laxmi-narayan-vishnu-avatars-hanuman", "devi"]},
    {name: 
    "Gurus and Mystics", menus:  ["all-dattavatars", "swami-samartha", "ganesh-gte-Q3-2022", "ganesh-gte-Q1-2023"]},
    {name: 
    "Shirdi Sai", menus:  ["sai-Q3-2020", "sai-Q2-2021", "Sai Satcharit", "ganesh-gte-Q1-2023"]},
    {name: 
    "Mumbai Meri Jaan", menus:  ["ganesh", "ganesh-gte-Q2-2021", "ganesh-gte-Q3-2022", "ganesh-gte-Q1-2023"]},
    
  ]
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
  
 
  newImage = this.fb.group( {
    imageTab: ['Ganesh'],
    imageMenu: ['ganesh-gte-Q1-2023'],
    imageCanvass: ['A3'],
    evolutionStats: this.fb.group({
      evolutuonDate: ['06-13-2023'],
      evolutionSequence: [3]
    }),
    /*
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
    */
    iterations: this.fb.array([
        this.fb.group({
          imageTab:['wee'],
          fullFileName:['wee'],
          evolution:['eee'],
       }),
       this.fb.group({
        imageFileName:['wee'],
        imageFileDescription:['eee'],
     })
    ])
  });
   
  constructor(private listService: ListService, private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.dataGetter = this.listService.getPostList();
  
    /*
    this.testObservable.subscribe({  
      next(x) { console.log('We have got value ' + x); },  
      error(err) { console.error('something wrong occurred: ' + err); },  
      complete() { console.log('Done successfully'); }  
    });  
    console.log('This value is just after subscribe');  
    */
  }
  get Iterations() {
    return this.newImage.get('iterations') as FormArray ;
  }
  // in screen events
  getNewMenu() {
    
    let newArray = this.imageTabs.find(a => a.name === this.newImage.controls["imageTab"].value)?.menus;
    if(newArray && newArray.length > 0) {
      this.selectedImageMenu = [];
      this.selectedImageMenu = newArray.join().split(',')
      this.newImage.controls["imageMenu"].setValue(this.selectedImageMenu[0]);
    }

  }
  startStopToggle(specialEnd = -1 ){
    if (this.isStarted === false || specialEnd > -1) {
      let me = this;
      this.dataGetter.subscribe(
        (response:any)=> { 
          this.endIndex = this.startIndex + 10 ;
          if (this.endIndex >= response.length) {
            this.endIndex = response.length-2 ;
          }
          specialEnd === -1 ?
          me.listsResp = response.slice(this.startIndex,this.endIndex+1):
          me.listsResp = response.slice(response.length - 3,response.length - 1);
          console.log(`@@@@@@ ${JSON.stringify(me.listsResp)}`);
          this.startIndex = this.endIndex === response.length-1? 0: this.endIndex ;
          const keys = response.headers.keys();
          this.headers = keys.map((key:any) => `${key}: ${response.headers.get(key)}`);
          this.headerStr = JSON.stringify(this.headers);
        } ,
        (err:any) => console.log(err),
        ()=> console.log('complete'));
      //  .error( (obj:any) => console.log(obj));
       this.isStarted = true ;
    } else {
     
      this.listsResp = [];
      this.isStarted = false ;
    }
  }  
  newTitle="";
  addList() {
    console.log('#######New Rec');
    const newTitle = { title: `NEW ${Date.now().toLocaleString()}`};
    this.listService.addPostList(newTitle)
    .subscribe(
      (response:any)=> { 
        console.log('success') ;
        this.startStopToggle(0);
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
