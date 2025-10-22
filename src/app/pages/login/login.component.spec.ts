import { expect } from '@jest/globals';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../../_services/appService/app.service';
import { AuthService } from '../../_services/authService/auth.service';

describe('LoginComponent (Jest)', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
    isConnected: jest.fn()
  } as unknown as AuthService;

  const mockAppService = {
    hasRole: jest.fn()
  } as unknown as AppService;

  const mockRouter = {
    navigate: jest.fn()
  } as unknown as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: AppService, useValue: mockAppService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    jest.clearAllMocks();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate to dashboard when user is admin', () => {
    // prepare form
    component.loginUserForm.setValue({ email: 'john.doe@example.com', password: 'pwd' });
    // mocks
    (mockAuthService.login as jest.Mock).mockReturnValue(of({}));
    (mockAuthService.isConnected as unknown as jest.Mock).mockReturnValue(true);
    (mockAppService.hasRole as jest.Mock).mockReturnValue(true);

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'john.doe@example.com', password: 'pwd' });
    expect(component.connectionMarker).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should navigate to profile when user is authenticated but not admin', () => {
    component.loginUserForm.setValue({ email: 'jane@example.com', password: 'pwd2' });
    (mockAuthService.login as jest.Mock).mockReturnValue(of({}));
    (mockAuthService.isConnected as unknown as jest.Mock).mockReturnValue(true);
    (mockAppService.hasRole as jest.Mock).mockReturnValue(false);

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'jane@example.com', password: 'pwd2' });
    expect(component.connectionMarker).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should set errorMessage when login fails', () => {
    component.loginUserForm.setValue({ email: 'bad@example.com', password: 'wrong' });
    const err = { error: { detail: 'Bad credentials' } };
    (mockAuthService.login as jest.Mock).mockReturnValue(throwError(() => err));
    (mockAuthService.isConnected as unknown as jest.Mock).mockReturnValue(false);

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Bad credentials');
    expect(component.connectionMarker).toBeFalsy();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
