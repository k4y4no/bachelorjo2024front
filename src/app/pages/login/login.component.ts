import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../_interfaces/user';
import { AuthService } from '../../_services/authService/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)
  // private tokenService = inject(TokenService)

  loginUserForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]}],
    password: ['', {validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]}],
  })

  onSubmit(){

            const user: UserLogin = {...this.loginUserForm.getRawValue()}
            this.authService.login(user).subscribe({
              next: (response) => {
                console.log('Token', response)
                // const role: string | null= this.tokenService.getRoleToken(response.access_token)
                // if(this.authService.isAdmin(role)){
                //   this.router.navigate(['dash'])
                //   return
                // }
                // this.router.navigate(['profile'])
                
              },
              error: (err) => {
                console.error('Error', err)
              }
            })

  }
}