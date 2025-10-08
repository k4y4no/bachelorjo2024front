import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCreate } from '../../_interfaces/user';
import { UserService } from '../../_services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService)
  private router = inject(Router)

  registerForm = this.fb.group({
    name: ['', Validators.required],
    firstname: ['', Validators.required],
    phone: ['', {validators: [Validators.required, Validators.pattern('^(\\+33|0)[1-9](\\d{2}){4}$')]}],
    email: ['', {validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]}],
    password: ['', {validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]}],
  });

  onSubmit(): void {
        const newUser: UserCreate = {...this.registerForm.getRawValue()}
        this.userService.createUser('user', newUser).subscribe({
          next: (response) => {
            console.log('User created', response)
            this.router.navigate(['home'])
          },
          error: (err) => {
            console.error('Error', err)
          }
        })
  }

}
