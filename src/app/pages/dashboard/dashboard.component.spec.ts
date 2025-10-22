import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { OfferTicketsCreate, OfferTicketsPublic } from '../../_interfaces/offer-tickets';
import { OfferService } from '../../_services/offerService/offer.service';
import { firstValueFrom, of, throwError } from 'rxjs';

describe('DashboardComponent (Jest)', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  const mockOffers: OfferTicketsPublic[] = [
    { id: 1, name: 'Offer 1', price: 10 } as unknown as OfferTicketsPublic
  ];

  const mockOfferService = {
    getAll: jest.fn().mockReturnValue(of(mockOffers)),
    createOffer: jest.fn().mockReturnValue(of({}))
  } as unknown as OfferService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: OfferService, useValue: mockOfferService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit sets offers$ from OfferService.getAll', async () => {
    // trigger ngOnInit
    fixture.detectChanges();

    expect(mockOfferService.getAll).toHaveBeenCalledWith('offer');

    const offers = await firstValueFrom(component.offers$);
    expect(offers).toEqual(mockOffers);
  });

  it('onSubmitTestOffer calls createOffer with form value when form is valid', () => {
    // set valid values (cast to OfferTicketsCreate)
    component.testForm.setValue({
      name: 'New Offer',
      price: 123,
      tickets_quantity: 5
    } as any);

    // ensure mock returns success
    (mockOfferService.createOffer as jest.Mock).mockReturnValue(of({ id: 99 }));

    component.onSubmitTestOffer();

    expect(mockOfferService.createOffer).toHaveBeenCalledTimes(1);
    const expectedPayload: OfferTicketsCreate = {
      name: 'New Offer',
      price: 123,
      tickets_quantity: 5
    } as unknown as OfferTicketsCreate;
    expect((mockOfferService.createOffer as jest.Mock).mock.calls[0][0]).toBe('offer');
    expect((mockOfferService.createOffer as jest.Mock).mock.calls[0][1]).toEqual(expectedPayload);
    // no error message on success
    expect(component.errorMessage).toBe('');
  });

  it('onSubmitTestOffer sets errorMessage when createOffer errors', () => {
    component.testForm.setValue({
      name: 'Bad Offer',
      price: 1,
      tickets_quantity: 1
    } as any);

    const err = { error: { detail: 'Failed to create' } };
    (mockOfferService.createOffer as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmitTestOffer();

    expect(mockOfferService.createOffer).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Failed to create');
  });
});