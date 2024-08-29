import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {

  @Input() colorId?: number;

  colorUpdateForm: FormGroup = new FormGroup({});
  color: Color | null = null;
  colorName: string | null = null;
 
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.colorId){
      this.getColorById(this.colorId);
    } else {
      this.activatedRoute.params.subscribe((params) => {
        if(params['brandId']){
          this.colorId = params['brandId'];
          this.getColorById(params['brandId']);
        }
      });
    }

    this.createColorUpdateForm();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorId, Validators.required],
      colorName: ['', Validators.required],
    });
  }
 
  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }

  getColorById(colorId: number) {
    this.colorService.getColorbyId(colorId).subscribe((response) => {
      this.color = response.data;
      this.colorId = this.color.colorId;
      this.colorName = this.color.colorName;

      this.colorUpdateForm.setValue(response.data);
    });
  }
}
