import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { UserUpdate } from '../models/userUpdate';
import { PasswordUpdate } from '../models/passwordUpdate';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  apiUrl = 'https://localhost:44319/api/auth/';

  constructor(private httpClient:HttpClient) { }
  
login(loginModel:LoginModel){
return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
}

register(registerModel:RegisterModel){
return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
}
update(userUpdateModel: UserUpdate){
  let newPath = this.apiUrl + 'update';
  return this.httpClient.put<ResponseModel>(newPath, userUpdateModel);
}

getByMail(email:string): Observable<any>{
  let newPath = this.apiUrl + 'getbymail?email=' + email;
  return this.httpClient.get<any>(newPath);
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
