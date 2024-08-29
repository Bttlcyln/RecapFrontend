import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdate } from '../models/userUpdate';
import { ResponseModel } from '../models/responseModel';
import { PasswordUpdate } from '../models/passwordUpdate';

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
  update(userUpdateModel: UserUpdate){
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, userUpdateModel);
  }
  
 
  
  passwordUpdate(passwordUpdateModel: PasswordUpdate){
    let newPath = this.apiUrl + 'updatepassword';
    return this.httpClient.put<ResponseModel>(newPath, passwordUpdateModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    } 
  }
  
}
