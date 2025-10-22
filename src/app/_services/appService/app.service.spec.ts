import { expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { AuthService } from '../authService/auth.service';
import { Signal } from '@angular/core';
import { UserPublic } from '../../_interfaces/user';

describe('AppService', () => {
  let service: AppService;

  // mock AuthService.currentUser is a Signal<UserPublic | null>
  const mockAuthService = {
    currentUser: (jest.fn() as unknown as Signal<UserPublic | null>)
  } as unknown as AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    service = TestBed.inject(AppService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user from authservice via user getter', () => {
    const user: UserPublic = {
      id: 1,
      name: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      phone: '0600000001',
      roles: ['admin']
    };

    // set signal return value
    ((mockAuthService.currentUser) as unknown as jest.Mock).mockReturnValue(user);

    expect(service.user).toBe(user);
  });

  it('userRole() should return roles array when user present', () => {
    const user: UserPublic = {
      id: 2,
      name: 'Smith',
      firstname: 'Anna',
      email: 'anna.smith@example.com',
      phone: '0600000002',
      roles: ['user', 'editor']
    };

    ((mockAuthService.currentUser) as unknown as jest.Mock).mockReturnValue(user);

    expect(service.userRole()).toEqual(['user', 'editor']);
  });

  it('hasRole() should return true when role exists and false otherwise', () => {
    const user: UserPublic = {
      id: 3,
      name: 'X',
      firstname: 'Y',
      email: 'y.x@example.com',
      phone: '0600000003',
      roles: ['manager']
    };

    ((mockAuthService.currentUser) as unknown as jest.Mock).mockReturnValue(user);

    expect(service.hasRole('manager')).toBeTruthy();
    expect(service.hasRole('admin')).toBeFalsy();
  });

  it('userRole() returns empty array and hasRole() false when user is null', () => {
    ((mockAuthService.currentUser) as unknown as jest.Mock).mockReturnValue(null);

    expect(service.user).toBeNull();
    expect(service.userRole()).toEqual([]);
    expect(service.hasRole('anything')).toBeFalsy();
  });

  it('userRole() returns empty array when user.roles is empty', () => {
    const user: UserPublic = {
      id: 4,
      name: 'Empty',
      firstname: 'Roles',
      email: 'empty.roles@example.com',
      phone: '0600000004',
      roles: []
    };
    ((mockAuthService.currentUser) as unknown as jest.Mock).mockReturnValue(user);

    expect(service.userRole()).toEqual([]);
    expect(service.hasRole('admin')).toBeFalsy();
  });
});
