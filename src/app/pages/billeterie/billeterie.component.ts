import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EventJO } from '../../_interfaces/event';
import { EventjoService } from '../../_services/eventJOService/eventjo.service';
import { OfferService } from '../../_services/offerService/offer.service';
import { OfferTicketsCreate, OfferTicketsPublic,  } from '../../_interfaces/offer-tickets';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-billeterie',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: './billeterie.component.html',
  styleUrl: './billeterie.component.scss'
})
export class BilleterieComponent implements OnInit {

    private eventJOService: EventjoService = inject(EventjoService)
    private offerService: OfferService = inject(OfferService)


  
    events$!: Observable<EventJO[]>
    offers$!: Observable<OfferTicketsPublic[]>
  
      ngOnInit(): void {
          this.events$ = this.eventJOService.getAll('event').pipe(
              tap(events => console.log(events))
          );
          this.offers$ = this.offerService.getAll('offer').pipe(
              tap(offers => console.log(offers))
          );
      }


}
