import { expect } from '@jest/globals';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../_services/authService/auth.service';
import { of, Subject } from 'rxjs';
import { AppService } from '../../_services/appService/app.service';
import { Signal } from '@angular/core';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  // router events subject so we can emit NavigationEnd
  const events$ = new Subject<any>();
  const mockRouter = {
    events: events$.asObservable(),
    navigate: jest.fn()
  } as unknown as Router;

  const mockAuthService = {
    isConnected: (jest.fn() as unknown as Signal<boolean>),
    logout: jest.fn().mockReturnValue(of({}))
  } as unknown as AuthService;

  const mockAppService = {
    hasRole: jest.fn()
  } as unknown as AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AppService, useValue: mockAppService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // ensure initial width value
    (component as any).innerWidth = 800;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // reset subject listeners
    // create a new Subject for next test by completing and recreating if needed
    // here we just ensure no pending emissions
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates auth/menu state on NavigationEnd when authenticated admin', () => {
    ((mockAuthService.isConnected) as unknown as jest.Mock).mockReturnValue(true);
    (mockAppService.hasRole as jest.Mock).mockReturnValue(true);

    events$.next(new NavigationEnd(1, '/from', '/to'));
    // subscription runs in constructor synchronously on emission
    expect(component.isAuthenticated).toBeTruthy();
    expect(component.isAdmin).toBeTruthy();
    expect(component.logMenu).toBe('logout');
    expect(component.profileOn).toBe('dashboard');
  });

  it('updates auth/menu state on NavigationEnd when not authenticated', () => {
    ((mockAuthService.isConnected) as unknown as jest.Mock).mockReturnValue(false);
    (mockAppService.hasRole as jest.Mock).mockReturnValue(false);

    events$.next(new NavigationEnd(2, '/a', '/b'));
    expect(component.isAuthenticated).toBeFalsy();
    expect(component.isAdmin).toBeFalsy();
    expect(component.logMenu).toBe('login');
    expect(component.profileOn).toBe('register');
  });

  it('toggleMenu toggles only on small screens', () => {
    component.innerWidth = 300;
    component.isMenuOpen = false;
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy();

    component.innerWidth = 800;
    component.isMenuOpen = true;
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy(); // no change because >400
  });

  it('onResize updates innerWidth and closes menu when >400', () => {
    // simulate change
    (window as any).innerWidth = 1024;
    component.isMenuOpen = true;
    component.onResize({} as any);
    expect(component.innerWidth).toBe(1024);
    expect(component.isMenuOpen).toBeFalsy();
  });

  it('loggingOut calls logout and navigates to /login', () => {
    (mockAuthService.logout as jest.Mock).mockReturnValue(of({}));
    component.loggingOut();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
