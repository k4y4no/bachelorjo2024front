import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../_services/userService/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent (Jest)', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;

  const mockUserService = {
    createUser: jest.fn()
  } as unknown as UserService;

  const mockRouter = {
    navigate: jest.fn()
  } as unknown as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    jest.clearAllMocks();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit should call createUser and navigate to home on success', () => {
    // valid form values that match validators
    component.registerForm.setValue({
      name: 'Doe',
      firstname: 'John',
      phone: '0600000001',
      email: 'john.doe@example.com',
      password: 'Aa1@abcd'
    });

    const createdResp = { id: 1 };
    (mockUserService.createUser as jest.Mock).mockReturnValue(of(createdResp));

    component.onSubmit();

    expect(mockUserService.createUser).toHaveBeenCalledWith('user', {
      name: 'Doe',
      firstname: 'John',
      phone: '0600000001',
      email: 'john.doe@example.com',
      password: 'Aa1@abcd'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('onSubmit should not navigate when createUser errors', () => {
    component.registerForm.setValue({
      name: 'Doe',
      firstname: 'John',
      phone: '0600000001',
      email: 'john.doe@example.com',
      password: 'Aa1@abcd'
    });

    (mockUserService.createUser as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));

    component.onSubmit();

    expect(mockUserService.createUser).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
