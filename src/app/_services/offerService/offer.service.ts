import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseApiService } from '../base-api.service';
import { OfferTicketsCreate, OfferTicketsPublic } from '../../_interfaces/offer-tickets';
import { UserCreate, UserPublic } from '../../_interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService  extends BaseApiService<OfferTicketsPublic> {
  constructor() {
    super(environment.apiUrl);
  }

    createOffer(urlAttribute: string, newOffer: OfferTicketsCreate): Observable<OfferTicketsPublic> {
      return this.create<OfferTicketsPublic, OfferTicketsCreate>(urlAttribute, newOffer, { withCredentials: true });
    }
}
