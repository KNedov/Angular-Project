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
export class LoginFormService {
  constructor(private formBuilder: FormBuilder) {}

  createForm() {
    return this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/
          ),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
      ],
    });
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  getPasswordErrorMessage(form: FormGroup): string {
    const password = this.getPasswordControl(form);

    if (password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (password?.errors?.['pattern']) {
      return 'Password should contain only alphanumeric characters!';
    }

    return '';
  }

  getEmailErrorMessage(form: FormGroup): string {
    const control = this.getEmailControl(form);
    if (control?.errors?.['required']) {
      return 'Email is required!';
    }
    if (control?.errors?.['pattern']) {
      return 'Emails should be a valid Gmail address';
    }
    return '';
  }
  isEmailError(form: FormGroup): boolean {
    const control = this.getEmailControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
  isPasswordError(form: FormGroup): boolean {
    const control = this.getPasswordControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }

  getEmailControl(form: FormGroup): AbstractControl | null {
    return form.get('email');
  }
  getPasswordControl(form: FormGroup): AbstractControl | null {
    return form.get('password');
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
