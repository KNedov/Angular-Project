import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginFormService } from '../forms/login.form';
import { AuthService } from '../../../core/services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private loginFormService= inject(LoginFormService)
  private authService= inject(AuthService)
  private router= inject(Router)
  private userSubscription!:Subscription
  form:FormGroup=this.loginFormService.createForm()

 get emailErrorMessage():string{return this.loginFormService.getEmailErrorMessage(this.form)}
 get passwordErrorMessage():string{return this.loginFormService.getPasswordErrorMessage(this.form)}
 get emailIsValid():boolean{return this.loginFormService.isEmailError(this.form)}
 get passwordIsValid():boolean{return this.loginFormService.isPasswordError(this.form)}
 get isFormValid():boolean{return this.loginFormService.isFormValid(this.form)}


 onSubmit() {  
     if (this.form.valid) {
      const { email, password } = this.form.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Login failed', err);

          this.markFormGroupTouched();     
        }
      });
    }
  }

    private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    })
  }


}
