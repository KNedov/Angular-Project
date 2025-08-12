import { Component, inject, OnInit } from '@angular/core';
import { PhoneFormService } from '../phoneForm';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneService } from '../../../core/services';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-phones',
  imports: [ReactiveFormsModule],
  templateUrl: './create-phones.html',
  styleUrl: './create-phones.css',
})
export class CreatePhones implements OnInit {
  phoneFormService = inject(PhoneFormService);
  private router = inject(Router);
  private phoneService = inject(PhoneService);
  private location = inject(Location);
  createForm: FormGroup = this.phoneFormService.createForm();

  onSubmit() {
    if (this.createForm.valid) {
      const formValue = this.createForm.value;
      this.phoneService.createPhone(formValue).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log('Create Product failed', err);
          this.phoneFormService.markFormGroupTouched(this.createForm);
        },
      });
    }
  }
  ngOnInit() {
    this.phoneFormService;
  }

  onCancel() {
    this.location.back();
  }

  get phoneNameErrorMessage(): string {
    return this.phoneFormService.getPhoneNameErrorMessage(this.createForm);
  }
  get displaySizeErrorMessage(): string {
    return this.phoneFormService.getDisplaySizeErrorMessage(this.createForm);
  }
  get colorErrorMessage(): string {
    return this.phoneFormService.getColorErrorMessage(this.createForm);
  }
  get cpuErrorMessage(): string {
    return this.phoneFormService.getCpuErrorMessage(this.createForm);
  }
  get ramErrorMessage(): string {
    return this.phoneFormService.getRamErrorMessage(this.createForm);
  }
  get storageErrorMessage(): string {
    return this.phoneFormService.getStorageErrorMessage(this.createForm);
  }
  get priceErrorMessage(): string {
    return this.phoneFormService.getPriceErrorMessage(this.createForm);
  }
  get imageUrlErrorMessage(): string {
    return this.phoneFormService.getImageErrorMessage(this.createForm);
  }

  get phoneNameIsValid(): boolean {
    return this.phoneFormService.isPhoneNameError(this.createForm);
  }
  get displaySizeIsValid(): boolean {
    return this.phoneFormService.isDisplaySizeError(this.createForm);
  }
  get colorIsValid(): boolean {
    return this.phoneFormService.isColorError(this.createForm);
  }
  get cpuIsValid(): boolean {
    return this.phoneFormService.isCpuError(this.createForm);
  }
  get ramIsValid(): boolean {
    return this.phoneFormService.isRamError(this.createForm);
  }
  get storageIsValid(): boolean {
    return this.phoneFormService.isStorageError(this.createForm);
  }
  get priceIsValid(): boolean {
    return this.phoneFormService.isPriceError(this.createForm);
  }
  get imageUrlIsValid(): boolean {
    return this.phoneFormService.isImageUrlError(this.createForm);
  }
}
