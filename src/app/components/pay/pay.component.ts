import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentStorageService } from 'src/app/services/payment-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  payAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private paymentStorageService: PaymentStorageService
  ) {}

  ngOnInit(): void {
    this.createPayAddForm();
    
  }

  createPayAddForm() {
    this.payAddForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  onUseSavedCardChanged(event: any) {
    if (event.target.checked) {
      const savedCardInfo = this.paymentStorageService.getCardInfo();
      if (savedCardInfo) {
        this.payAddForm.patchValue(savedCardInfo);
        this.toastrService.info('Kayıtlı kart bilgileri yüklendi.', 'Bilgi');
      } else {
        this.toastrService.warning('Kayıtlı kart bilgisi bulunamadı.', 'Uyarı');
      }
    } else {
      this.payAddForm.reset();
    }
  }

  add() {
    if (this.payAddForm.valid) {
      let pay: Payment = Object.assign({}, this.payAddForm.value);
      this.paymentService.addPayments(pay).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');

          if(confirm("Kart bilgilerini kaydetmek istiyor musun?")){
            this.paymentStorageService.saveCardInfo(pay);
            this.toastrService.success("Kart Bilgileri kaydedildi.","Başarılı");
          }
          this.homePage();
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.console.error && responseError.error.message) {
            this.toastrService.error(
              responseError.error.message,
              'Doğrulama hatası'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Boş alanları doldurunuz', 'Hata');
    }
  }

  homePage() {
    this.router.navigateByUrl('');
  }
}
