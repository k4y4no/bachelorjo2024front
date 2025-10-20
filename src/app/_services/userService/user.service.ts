import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { UserCreate, UserPublic } from '../../_interfaces/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<UserPublic> {
  constructor() {
    super(environment.apiUrl);
  }
  
  createUser(urlAttribute: string, newUser: UserCreate): Observable<UserPublic> {
    return this.create<UserPublic, UserCreate>(urlAttribute, newUser);
  }

}
