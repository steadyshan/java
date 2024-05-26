import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from  'rxjs';
@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.css']
})
export class ListUpdateComponent implements OnInit {

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
    /*
    subscriber.next(10);  
    subscriber.next(20);  
    subscriber.next(30);  
    setTimeout(() => {  
      subscriber.next(40);  
      subscriber.complete();  
    }, 1000);  
    */
  });  
  
  /*
  newImage = new FormGroup( {
    imageTab: new FormControl('Ganesh'),
    imageMenu: new FormControl('ganesh-gte-Q1-2023'),
    imageCanvass: new FormControl('A3'),
    evolutionStats: new FormGroup({
      evolutuonDate: new FormControl('06-13-2023'),
      evolutionSequence: new FormControl(3)
    })
  })
  */
  newImage = this.fb.group( {
    imageTab: ['Ganesh'],
    imageMenu: ['ganesh-gte-Q1-2023'],
    imageCanvass: ['A3'],
    evolutionStats: this.fb.group({
      evolutuonDate: ['06-13-2023'],
      evolutionSequence: [3]
    }),
    iterations: this.fb.array([
        this.fb.group({
          imageFileName:['wee'],
          imageFileDescription:['eee'],
       }),
       this.fb.group({
        imageFileName:['wee'],
        imageFileDescription:['eee'],
     })
    ])
  });
   
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.testObservable.subscribe({  
      next(x) { console.log('We have got value ' + x); },  
      error(err) { console.error('something wrong occurred: ' + err); },  
      complete() { console.log('Done successfully'); }  
    });  
    console.log('This value is just after subscribe');  
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
}
