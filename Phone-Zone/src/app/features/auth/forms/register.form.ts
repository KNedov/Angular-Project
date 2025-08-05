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
export class RegisterFormService {
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

      username: ['', [Validators.required, Validators.minLength(5)]],

      tel: ['', [Validators.required, Validators.minLength(10)]],
      passwords: this.formBuilder.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.pattern(/^[a-zA-Z0-9]+$/),
            ],
          ],
          rePassword: ['', Validators.required],
        },
        { validators: this.passwordMatchValidator }
      ),
    });
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

  getUserNameErrorMessage(form: FormGroup): string {
    const control = this.getUserNameControl(form);
    if (control?.errors?.['required']) {
      return 'Username is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Username should be minimum 5 symbols';
    }
    return '';
  }
  getPhoneErrorMessage(form: FormGroup): string {
    const control = this.getPhoneControl(form);
    if (control?.errors?.['required']) {
      return 'Phone is required!';
    }
    if (control?.errors?.['minlength']) {
      return 'Phone should be minimum 10 characters!';
    }
    return '';
  }
  getPasswordErrorMessage(form: FormGroup): string {
    const password = this.getPasswordControl(form);
    const passwordsGroup = this.getPasswordsGroup(form);

    if (password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (password?.errors?.['pattern']) {
      return 'Password should contain only alphanumeric characters!';
    }

    if (passwordsGroup?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }
 
  getRePasswordErrorMessage(form: FormGroup): string {
    const password = this.getRePasswordControl(form);
    const passwordsGroup = this.getPasswordsGroup(form);

    if (password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (passwordsGroup?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  getFormValue(form: FormGroup): object {
    const { email, username, tel } = form.value;
    const { password, rePassword } = form.value.passwords;

    return {
      email,
      username,
      tel,
      password,
      rePassword,
    };
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

  getUserNameControl(form: FormGroup): AbstractControl<any, any> | null {
    return form.get('username');
  }
  getEmailControl(form: FormGroup): AbstractControl<any, any> | null {
    return form.get('email');
  }
  getPhoneControl(form: FormGroup): AbstractControl<any, any> | null {
    return form.get('tel');
  }
  getPasswordsGroup(form: FormGroup): FormGroup<any> {
    return form.get('passwords') as FormGroup;
  }
  getPasswordControl(form: FormGroup): AbstractControl<any, any> | null {
    return this.getPasswordsGroup(form).get('password');
  }
  getRePasswordControl(form: FormGroup): AbstractControl<any, any> | null {
    return this.getPasswordsGroup(form).get('rePassword');
  }

  isEmailError(form: FormGroup): boolean {
    const control = this.getEmailControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
  isUserNameError(form: FormGroup): boolean {
    const control = this.getUserNameControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
  isPhoneError(form: FormGroup): boolean {
    const control = this.getPhoneControl(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }
 
  isPasswordsError(form: FormGroup): boolean {
    const control = this.getPasswordsGroup(form);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }

  private passwordMatchValidator(
    passwordsControl: AbstractControl
  ): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
