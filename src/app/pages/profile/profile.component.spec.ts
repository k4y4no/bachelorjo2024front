import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../../_services/authService/auth.service';
import { UserPublic } from '../../_interfaces/user';

describe('ProfileComponent (Jest)', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

  const mockUser: UserPublic = {
    id: 1,
    name: 'Doe',
    firstname: 'John',
    email: 'john.doe@example.com',
    phone: '0600000001',
    roles: ['admin']
  };

  const mockAuthService = {
    currentUser: jest.fn()
  } as unknown as AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit sets user when authService.currentUser returns a user', () => {
    (mockAuthService.currentUser as unknown as jest.Mock).mockReturnValue(mockUser);

    fixture.detectChanges(); // triggers ngOnInit
    expect(component.user).toEqual(mockUser);
  });

  it('ngOnInit leaves user null when authService.currentUser returns null', () => {
    (mockAuthService.currentUser as unknown as jest.Mock).mockReturnValue(null);

    fixture.detectChanges();
    expect(component.user).toBeNull();
  });
});
