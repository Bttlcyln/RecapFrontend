import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44319/api/';

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getall";

    return this.httpClient.get<ListResponseModel<Rental>>(newPath)

  }
  // addRental(rental: Rental):Observable<ResponseModel>{
  //   let newPath = this.apiUrl + "add";
  //   return this.httpClient.post<ResponseModel>(newPath,rental);

  // }
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental)
  }
}
