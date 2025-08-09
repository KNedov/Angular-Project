import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreatePhoneService {
  constructor(private formBuilder: FormBuilder) {}

  createForm() {
    return this.formBuilder.group({
      phoneName: ['', [Validators.required, Validators.minLength(2)]],
      displaySize: ['', [Validators.required, Validators.minLength(1)]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      cpu: ['', [Validators.required, Validators.minLength(2)]],
      ram: ['', [Validators.required, Validators.minLength(1)]],
      storage: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required,  Validators.pattern(/^[0-9]+$/),]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    });
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }



  getPhoneNameErrorMessage(form: FormGroup): string {
    const control = this.getPhoneNameControl(form);
    if (control?.errors?.['required']) {
      return 'PhoneName is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Phone name should be minimum 2 characters!';
    }
    return '';
  }
  getDisplaySizeErrorMessage(form: FormGroup): string {
    const control = this.getDisplaySizeControl(form);
    if (control?.errors?.['required']) {
      return 'Display Size is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Display Size should be minimum 1 characters!';
    }
    return '';
  }
    getColorErrorMessage(form: FormGroup): string {
    const control = this.getColorControl(form);
    if (control?.errors?.['required']) {
      return 'Color is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Color Size should be minimum 3 characters!';
    }
    return '';
  }
    getCpuErrorMessage(form: FormGroup): string {
    const control = this.getCpuControl(form);
    if (control?.errors?.['required']) {
      return 'Display Size is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Display Size should be minimum 2 characters!';
    }
    return '';
  }
    getRamErrorMessage(form: FormGroup): string {
    const control = this.getRamControl(form);
    if (control?.errors?.['required']) {
      return 'Ram Size is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Ram Size should be minimum 1 characters!';
    }
    return '';
  }
    getStorageErrorMessage(form: FormGroup): string {
    const control = this.getStorageControl(form);
    if (control?.errors?.['required']) {
      return 'Storage Size is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Storage Size should be minimum 2 characters!';
    }
    return '';
  }
    getPriceErrorMessage(form: FormGroup): string {
    const control = this.getPriceControl(form);
    if (control?.errors?.['required']) {
      return 'Price is required!';
    }
    if (control?.errors?.['pattern']) {
      return 'Price should be number!';
    }
    return '';
  }
   getImageErrorMessage(form: FormGroup): string {
    const control = this.getImageUrlControl(form);
    if (control?.errors?.['required']) {
      return 'Image Url is required!';
    }
    if (control?.errors?.['pattern']) {
      return 'Image URL must be a valid link starting with http:// or https:// and ending with .png, .jpg, .jpeg, .gif, or .webp';
    }
    return '';
  }


  
  isPhoneNameError(form: FormGroup): boolean {
    const control = this.getPhoneNameControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
  isDisplaySizeError(form: FormGroup): boolean {
    const control = this.getDisplaySizeControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isColorError(form: FormGroup): boolean {
    const control = this.getColorControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isCpuError(form: FormGroup): boolean {
    const control = this.getCpuControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isRamError(form: FormGroup): boolean {
    const control = this.getRamControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isStorageError(form: FormGroup): boolean {
    const control = this.getStorageControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isPriceError(form: FormGroup): boolean {
    const control = this.getPriceControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
   isImageUrlError(form: FormGroup): boolean {
    const control = this.getImageUrlControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }

  getPhoneNameControl(form: FormGroup): AbstractControl | null {
    return form.get('phoneName');
  }
  getDisplaySizeControl(form: FormGroup): AbstractControl | null {
    return form.get('displaySize');
  }
  getColorControl(form:FormGroup):AbstractControl|null{
    return form.get('color')
  }
  getCpuControl(form:FormGroup):AbstractControl|null{
    return form.get('cpu')
  }
  getRamControl(form:FormGroup):AbstractControl|null{
    return form.get('ram')
  }
  getStorageControl(form:FormGroup):AbstractControl|null{
    return form.get('storage')
  }
  getPriceControl(form:FormGroup):AbstractControl|null{
    return form.get('price')
  }
  getImageUrlControl(form:FormGroup):AbstractControl|null{
    return form.get('image')
  }

   markFormGroupTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((nestedKey) => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAllAsTouched();
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

}
