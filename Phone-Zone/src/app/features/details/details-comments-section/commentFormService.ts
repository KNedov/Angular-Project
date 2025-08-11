import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TextCommentFormService {
  constructor(private formBuilder: FormBuilder) {}

  createForm() {
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }
  getTextControl(form: FormGroup): AbstractControl | null {
    return form.get('text');
  }
  getTextErrorMessage(form: FormGroup): string {
    const control = this.getTextControl(form);
    if (control?.errors?.['required']) {
      return 'Text is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'text should be minimum 3 characters!';
    }
    return '';
  }
  isTextError(form: FormGroup): boolean {
    const control = this.getTextControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }

  markFormTouched(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((nestedKey) => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAsTouched();
        });
      } else {
        control?.markAsTouched();
      }
    });
  }
}
