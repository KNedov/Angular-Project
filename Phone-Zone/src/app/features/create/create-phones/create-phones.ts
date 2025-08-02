import { Component, inject } from '@angular/core';
import { CreatePhoneService } from '../createPhone.form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  PhoneService } from '../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-phones',
  imports: [ReactiveFormsModule],
  templateUrl: './create-phones.html',
  styleUrl: './create-phones.css'
})
export class CreatePhones {
private createPhoneFormService= inject(CreatePhoneService)
private router= inject(Router)
private phoneService= inject(PhoneService)
  createForm:FormGroup = this.createPhoneFormService.createForm();
  
  isFormValid():boolean{
    return this.createPhoneFormService.isFormValid(this.createForm);
  }

  get phoneNameErrorMessage():string{
    return this.createPhoneFormService.getPhoneNameErrorMessage(this.createForm)
  }
  get displaySizeErrorMessage():string{
    return this.createPhoneFormService.getDisplaySizeErrorMessage(this.createForm)
  }
  get colorErrorMessage():string{
    return this.createPhoneFormService.getColorErrorMessage(this.createForm)
  }
  get cpuErrorMessage():string{
    return this.createPhoneFormService.getCpuErrorMessage(this.createForm)
  }
  get ramErrorMessage():string{
    return this.createPhoneFormService.getRamErrorMessage(this.createForm)
  }
  get storageErrorMessage():string{
    return this.createPhoneFormService.getStorageErrorMessage(this.createForm)
  }
  get priceErrorMessage():string{
    return this.createPhoneFormService.getPriceErrorMessage(this.createForm)
  }
  get imageUrlErrorMessage():string{
    return this.createPhoneFormService.getImageErrorMessage(this.createForm)
  }
 

  get phoneNameIsValid():boolean{
    return this.createPhoneFormService.isPhoneNameError(this.createForm)
  }
  get displaySizeIsValid():boolean{
    return this.createPhoneFormService.isDisplaySizeError(this.createForm)
  }
  get colorIsValid():boolean{
    return this.createPhoneFormService.isColorError(this.createForm)
  }
  get cpuIsValid():boolean{
    return this.createPhoneFormService.isCpuError(this.createForm)
  }
  get ramIsValid():boolean{
    return this.createPhoneFormService.isRamError(this.createForm)
  }
  get storageIsValid():boolean{
    return this.createPhoneFormService.isStorageError(this.createForm)
  }
  get priceIsValid():boolean{
    return this.createPhoneFormService.isPriceError(this.createForm)
  }
  get imageUrlIsValid():boolean{
    return this.createPhoneFormService.isImageUrlError(this.createForm)
  }
  onSubmit(){
    if (this.createForm.valid){
      const formValue = this.createForm.value;
      this.phoneService.createPhone(formValue).subscribe({
        next:()=>{
          this.router.navigate(['home'])
        }
      })
    }
  }

   onCancel(){}
   private markFormGroupTouched(): void {
    Object.keys(this.createForm.controls).forEach(key => {
      const control = this.createForm.get(key);
      control?.markAsTouched();
    })
  }


}
