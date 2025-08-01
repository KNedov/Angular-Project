import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormService } from '../forms/register.form';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private registerFormService = inject(RegisterFormService);
  form: FormGroup = this.registerFormService.createForm();

    get emailIsValid(): boolean {
    return this.registerFormService.isEmailError(this.form);
  }

  get usernameIsValid(): boolean {
    return this.registerFormService.isUserNameError(this.form);
  }

  get passwordsIsValid(): boolean {
    return this.registerFormService.isPasswordsError(this.form);
  }

  get phoneIsValid(): boolean {
    return this.registerFormService.isPhoneError(this.form);
  }
  get formIsValid(): boolean {
    return this.registerFormService.isFormValid(this.form);
  }

  get emailErrorMessage():string {
    return this.registerFormService.getEmailErrorMessage(this.form);
  }

  get usernameErrorMessage():string {
    return this.registerFormService.getUserNameErrorMessage(this.form);
  }

  get phoneErrorMessage():string {
    return this.registerFormService.getPhoneErrorMessage(this.form);
  }

  get passwordErrorMessage():string {
    return this.registerFormService.getPasswordErrorMessage(this.form);
  }
  get rePasswordErrorMessage():string {
    return this.registerFormService.getRePasswordErrorMessage(this.form);
  }
 
  onSubmit() {
     if (this.form.valid) {
  
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
    } 
  }
}
