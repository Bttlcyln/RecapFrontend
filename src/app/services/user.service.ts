import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44319/api/users/';
  constructor(private httpClient:HttpClient) { }



  getByMail(email:string): Observable<any>{
    let newPath = this.apiUrl + 'getbymail?email=' + email;
    return this.httpClient.get<any>(newPath);
  }
}
