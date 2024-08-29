import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { AdminCheckService } from 'src/app/services/admin-check.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color |null ;
  filterText ="";
  colorLoaded: boolean = false;
  selectedColor: Color | null = null;
  adminCheck: boolean = false;


  updateDialogVisible = false;
  deleteDialogVisible = false;

  selectedColorId: number;


  constructor(
    private colorService: ColorService,
    private adminService: AdminCheckService,
    private toastr : ToastrService,
  ) {}

  ngOnInit(): void {
    this.getColors(); 
    this.adminCheck=this.adminService.isAdmin();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.colorLoaded = true;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  setCurrentAllColor() {
    this.currentColor = null;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }


  deleteDialogVisibleControl(id?: any){
    if(id){
      this.selectedColorId = id;
    }
    this.deleteDialogVisible =!this.deleteDialogVisible;
  }

  updateDialogVisibleControl(id?: any){
    if(id){
      this.selectedColorId = id;
    }
    this.updateDialogVisible =!this.updateDialogVisible;
  }

  delete(){
      this.colorService.delete(this.selectedColorId).subscribe((response) => {
        if(response.success){
            this.toastr.info(response.message);
            this.deleteDialogVisible = !this.deleteDialogVisible;
            this.getColors();
        } else {
          this.toastr.error(response.message);
        }
      })
  }

  getAllBrandClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

}
