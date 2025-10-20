import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin, UserPublic } from '../../_interfaces/user';
import { AuthService } from '../../_services/authService/auth.service';
import { interval } from 'rxjs';
import { AppService } from '../../_services/appService/app.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)
  private appService = inject(AppService)
  errorMessage: string = ''
  connectionMarker: boolean = false

ngOnInit() {

}
  // private tokenService = inject(TokenService)

  loginUserForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]}],
    password: ['', {validators: [Validators.required]}],
  })

  get user(): UserPublic | null {
    return this.authService.currentUser();
  }

  logout(){
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response)
      }
    })
  }

  onSubmit(){
    this.errorMessage = ''

    const user: UserLogin = {...this.loginUserForm.getRawValue()}
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('Token', response)
        this.connectionMarker = true
        // const role: string | null= this.tokenService.getRoleToken(response.access_token)
        if(this.authService.isConnected() !== null){
          const routeLog = this.appService.hasRole('admin') ? 'dashboard':'profile'
          this.router.navigate([routeLog])
          return
        }
        // this.router.navigate(['profile'])
        
      },
      error: (err) => {
        console.error('Error', err)
        this.errorMessage = err.error.detail
      }
    })

  }
}