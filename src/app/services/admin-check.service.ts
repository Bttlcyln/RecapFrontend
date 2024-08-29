import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminCheckService {
  private roles: Array<string> = [];
  private adminCheck: boolean = false;

  constructor() { 
    this.setAdminStatus();
  }

   private setAdminStatus(): void{
    const token = localStorage.getItem("token");
    if(token){
      try{
        const decoded: any = jwt_decode(token);
        this.roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this.adminCheck= this.roles.includes("admin");
      }catch ( error){
        console.error("Token çözülmesi sırasında hata oldu",error);
      }
    }

  }
  isAdmin():boolean{
    return this.adminCheck;
  }
  decodeToken(token:string):any{
    return jwt_decode(token);
  }

}
