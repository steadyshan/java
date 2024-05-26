import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reactive-test',
  templateUrl: './reactive-test.component.html',
  styleUrls: ['./reactive-test.component.css']
})
export class ReactiveTestComponent implements OnInit {
  subject = new FormControl('Personal Details');
  personalDetails = new FormGroup(
    { firstName: new FormControl(''),
      lastName: new FormControl(''),

  }
  )
  interval = new FormControl(0);
  // replace by observable
  timerA = -1 ;
  constructor() {  }

  ngOnInit(): void {
  }
  startTimer() {

  }
   intervalObserver = new Observable((observer) => {

  })
  startUpdate() {
   this.subject.setValue(`${new Date().toLocaleDateString()} ${Math.random() * 100} `) ;
   return ;
  }
  stopUpdate() {
    window.clearInterval(this.timerA);
  }
  get PersonalDetails():string {
    return JSON.stringify(this.personalDetails.value);
  }
  onSubmit() {
    this.subject.setValue('aa') ; // ( `${new Date().toLocaleDateString()} ${Math.random() * 100} `   );
  }
}
/*
// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable((observer) => {
  let watchId: number;

  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
      observer.next(position);
    }, (error: GeolocationPositionError) => {
      observer.error(error);
    });
  } else {
    observer.error('Geolocation not available');
  }

  // When the consumer unsubscribes, clean up data ready for next subscription.
  return {
    unsubscribe() {
      navigator.geolocation.clearWatch(watchId);
    }
  };
});

// Call subscribe() to start listening for updates.
const locationsSubscription = locations.subscribe({
  next(position) {
    console.log('Current Position: ', position);
  },
  error(msg) {
    console.log('Error Getting Location: ', msg);
  }
});

// Stop listening for location after 10 seconds
setTimeout(() => {
  locationsSubscription.unsubscribe();
}, 10000);
*/