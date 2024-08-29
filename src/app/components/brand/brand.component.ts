import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { AdminCheckService } from 'src/app/services/admin-check.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  
  brands: Brand[] = [];
  currentBrand: Brand |null;
  filterText ="";
  brandLoaded:boolean = false;
  selectedBrand: Brand | null = null;
  adminCheck: boolean = false;

  updateDialogVisible = false;
  deleteDialogVisible = false;

  selectedBrandId: number;


  constructor(
    private brandService: BrandService,
    private adminService: AdminCheckService,
    private toastr: ToastrService
    

  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.adminCheck = this.adminService.isAdmin();
    
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  setCurrentAllBrand() {
    this.currentBrand = null;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }


  deleteDialogVisibleControl(id?: any){
    if(id){
      this.selectedBrandId = id;
    }
    this.deleteDialogVisible =!this.deleteDialogVisible;
  }

  updateDialogVisibleControl(id?: any){
    if(id){
      this.selectedBrandId = id;
    }
    this.updateDialogVisible =!this.updateDialogVisible;
  }

  delete(){
      this.brandService.delete(this.selectedBrandId).subscribe((res) => {
        if(res.success){
            this.toastr.info(res.message);
            this.deleteDialogVisible = !this.deleteDialogVisible;
            this.getBrands();
        } else {
          this.toastr.error(res.message);
        }
      })
  }


  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
