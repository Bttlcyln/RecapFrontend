import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44319/';

  constructor(private httpClient: HttpClient) {}

  getCarImages(carId:number): Observable<ListResponseModel<CarImage>>{
    let newPath =this.apiUrl + "api/carImage/getimagebycarid?carId=" + carId ;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  
  getImagePath(carImage: string):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"Uploads/Images/"+carImage;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }



}
