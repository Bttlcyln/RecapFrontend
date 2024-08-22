import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
   @Input() carId: number;
  car:Car;
  carImages:CarImage[];
  currentCarImage:CarImage;
  dataLoaded=false;
  imageUrl: any;
  rentDate: Date | null = null;
  returnDate: Date | null = null;

  constructor(
    private carImageService:CarImageService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private route:Router

  ) {}

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarById(this.carId);
        this.getCarImages(this.carId);
      }
    });
  }

  getCarImages(carId: number){
    this.carImageService.getCarImages(carId).subscribe((response)=>{   
      this.carImages = response.data;
      this.dataLoaded = true; 
           
    });
  }

  getCarById(carId: number){
    this.carService.getById(carId).subscribe((response:any)=>{
      this.car = response.data;
      this.dataLoaded = true ;
    });
  }
  
  setCurrentCarImage(carImage:CarImage){
    this.currentCarImage = carImage;
    return this.currentCarImage;

  }
  setCurrentCarImagesClass(carImage:CarImage){
    if (carImage==this.currentCarImage){
      return 'list-group-item active';
    }else
    return 'list-group-item';

  }

 
  getImagePath(carImage: CarImage) {
    this.carImageService.getImagePath(carImage.imagePath).subscribe((res) => {
      this.imageUrl = res;
    })
    return this.imageUrl;
  }


  rentNow(car:Car){
    this.route.navigate(["rentals/add/" + this.carId]);
  }
}
