import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleterieComponent } from './billeterie.component';
import { firstValueFrom, of } from 'rxjs';
import { EventjoService } from '../../_services/eventJOService/eventjo.service';
import { OfferService } from '../../_services/offerService/offer.service';
import { OfferTicketsPublic } from '../../_interfaces/offer-tickets';
import { EventJO } from '../../_interfaces/event';

describe('BilleterieComponent (Jest)', () => {
  let fixture: ComponentFixture<BilleterieComponent>;
  let component: BilleterieComponent;

  const mockEvents: EventJO[] = [
    { id: 1, name: 'Event 1', date: '2024-07-01' } as unknown as EventJO
  ];
  const mockOffers: OfferTicketsPublic[] = [
    { id: 1, name: 'Offer 1', price: 10 } as unknown as OfferTicketsPublic
  ];

  const mockEventService = {
    getAll: jest.fn().mockReturnValue(of(mockEvents))
  } as unknown as EventjoService;

  const mockOfferService = {
    getAll: jest.fn().mockReturnValue(of(mockOffers))
  } as unknown as OfferService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilleterieComponent],
      providers: [
        { provide: EventjoService, useValue: mockEventService },
        { provide: OfferService, useValue: mockOfferService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BilleterieComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call services.getAll and expose observables', async () => {
    // trigger lifecycle
    fixture.detectChanges();

    expect(mockEventService.getAll).toHaveBeenCalledWith('event');
    expect(mockOfferService.getAll).toHaveBeenCalledWith('offer');

    // verify observables emit expected values
    const events = await firstValueFrom(component.events$);
    const offers = await firstValueFrom(component.offers$);

    expect(events).toEqual(mockEvents);
    expect(offers).toEqual(mockOffers);
  });
});
