import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginRegisterFormService } from '../forms/login-register.form';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private loginFormService= inject(LoginRegisterFormService)
  form:FormGroup=this.loginFormService.createForm()

 get emailErrorMessage():string{return this.loginFormService.getEmailErrorMessage(this.form)}
 get passwordErrorMessage():string{return this.loginFormService.getLoginPasswordErrorMessage(this.form)}
 get emailIsValid():boolean{return this.loginFormService.isEmailError(this.form)}
 get passwordIsValid():boolean{return this.loginFormService.isPasswordError(this.form)}
 get isFormValid():boolean{return this.loginFormService.isFormValid(this.form)}

}
