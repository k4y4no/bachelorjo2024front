import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { EventJO } from '../../_interfaces/event';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventjoService  extends BaseApiService<EventJO> {
  constructor() {
    super(environment.apiUrl);
  }
  // Tu peux ajouter ici des méthodes spécifiques à EventJO si besoin
}