import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  webServiceURL = `http://localhost:8080/api`
  imageroot = "/Users/shantanu/Documents/GitHub/js-frameworks/Angular_lte_4/shan-cms-template/src/assets/all-images/";
  constructor(private http: HttpClient) { }
  
  getFolderContent(parentFolder:string) {
    return this.http.post<any>(`${this.webServiceURL}/listing`,parentFolder)
    .pipe(catchError(this.handleError));
  }
  moveImageFile(moveDetail:any):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.webServiceURL}/move`,moveDetail)
    .pipe(catchError(this.handleError));
  }
  moveImageFileTest(moveDetail:any):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.webServiceURL}/move-test`,moveDetail)
    .pipe(catchError(this.handleError));
  }
  moveImageFileTestReverse(moveDetail:any):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.webServiceURL}/move-test-reverse`,moveDetail)
    .pipe(catchError(this.handleError));
  }
   addAlbumEntry(nameAndEntries:string[]):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.webServiceURL}/append`,nameAndEntries)
    .pipe(catchError(this.handleError));
 
  }
  updateListFile(stringsToAddParan:string[], fileToUpdateParam:string):Observable<HttpResponse<any>> {

    let newImageList = {
      stringsToAdd:stringsToAddParan ,
      fileToUpdate: fileToUpdateParam
    }
    /*
    let newImageListTest = {
      fileToUpdate: `/Users/shantanu/Documents/GitHub/js-frameworks/Angular_lte_4/shan-cms-template-next/src/assets/data-and-config/data/ganesh-gte-q1-2023.image.list.ts`, 
      stringsToAdd: [
        "{",
        "fullFileName: `assets/all-images/religion/shree-ganesh-gte-q1-2023/Ganesh-final-GudiPadwa-March22-2023.jpeg`,",
        "description: `Ganapati - Gudi Padwa 02/22/2023. <br/>",
                     "final version - photo edited",
                     "<p>A first of sorts - I have begun drawing flowers and chanced upon a theme of surrounding the main sketch with these</p>",
                      "<p> probably do others e.g. use dolphins around a sailing ship sketch`,",
                     "dateUploaded: '06-15-2023',",
                     "canvassSize: 'A4', content:'color-pencil',",
                     "rating: 1,",
                     "ratingYear:2023,",
                     
            "},"
      ],
    }
    */
    console.log(`Calling service with ${newImageList}`)
    return this.http.post<any>(`${this.webServiceURL}/update-list`,newImageList)
    .pipe(catchError(this.handleError));
  }
  private handleError(error:HttpErrorResponse ){
    return throwError(() => { new Error(error.message); console.log(error.message) }) ;
  }
}
