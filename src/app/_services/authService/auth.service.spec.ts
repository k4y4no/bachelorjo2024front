import { expect } from '@jest/globals';

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ApiAuthResponse, UserPublic } from '../../_interfaces/user';
import { environment } from '../../../environments/environment';



describe('AuthService', () => {
  let service: AuthService;
  const mockHttp = { post: jest.fn(), get: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: mockHttp }
      ]
    });
    service = TestBed.inject(AuthService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('login() should set currentUser and return response on success', done => {
    const mockUser: UserPublic = {
      id: 1,
      name: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      phone: '0600000001',
      roles: ['admin']
    };
    const mockResp: ApiAuthResponse = { message: 'Connexion réussie', user: mockUser };
    const credentials = { email: 'john.doe@example.com', password: 'pwd' };

    mockHttp.post.mockReturnValue(of(mockResp));

    service.login(credentials).subscribe(resp => {
      expect(resp).toEqual(mockResp);
      expect(mockHttp.post).toHaveBeenCalledWith(environment.authUrl, credentials, { withCredentials: true });
      expect(service.currentUser()).toEqual(mockUser);
      done();
    });
  });

  
  it('checkAuth() should emit true when backend returns 200', done => {
    mockHttp.get.mockReturnValue(of({}));
    service.checkAuth().subscribe(value => {
      expect(value).toBe(true);
      // vérifie que la requête envoie bien withCredentials
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringMatching(/\/check$/), { withCredentials: true });
      done();
    });
  });

  it('checkAuth() should emit false on 401/erreur', done => {
    const err = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    mockHttp.get.mockReturnValue(throwError(() => err));
    service.checkAuth().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
});
