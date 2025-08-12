import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormService } from '../forms/register.form';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private registerFormService = inject(RegisterFormService);
  form: FormGroup = this.registerFormService.createForm();
  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit() {
    if (this.form.valid) {
      const { username, email, tel } = this.form.value;
      const { password, rePassword } = this.form.value.passwords;

      this.authService
        .register(username, email, tel, password, rePassword)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: () => {
            this.registerFormService.markFormGroupTouched(this.form);
          },
        });
    }
  }

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

  get emailErrorMessage(): string {
    return this.registerFormService.getEmailErrorMessage(this.form);
  }

  get usernameErrorMessage(): string {
    return this.registerFormService.getUserNameErrorMessage(this.form);
  }

  get phoneErrorMessage(): string {
    return this.registerFormService.getPhoneErrorMessage(this.form);
  }

  get passwordErrorMessage(): string {
    return this.registerFormService.getPasswordErrorMessage(this.form);
  }
  get rePasswordErrorMessage(): string {
    return this.registerFormService.getRePasswordErrorMessage(this.form);
  }
}
