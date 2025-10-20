import { Component, inject, OnInit } from '@angular/core';
import { OfferService } from '../../_services/offerService/offer.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferTicketsCreate, OfferTicketsPublic } from '../../_interfaces/offer-tickets';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule, 
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


    private offerService: OfferService = inject(OfferService)
    private fb = inject(NonNullableFormBuilder)
    offers$!: Observable<OfferTicketsPublic[]>
    errorMessage: string = ''

    testForm = this.fb.group({
    name: ['', {validators: [Validators.required]}],
    price: [{validators: [Validators.required]}],
    tickets_quantity: [{validators: [Validators.required]}],
  })

  
  ngOnInit(): void {
       this.offers$ = this.offerService.getAll('offer').pipe(
           tap(offers => console.log(offers))
       );
  }

    onSubmitTestOffer(){
      this.errorMessage = ''
  
      const user: OfferTicketsCreate = {...this.testForm.getRawValue()}
      this.offerService.createOffer('offer',user).subscribe({
        next: (response) => {
          console.log('New Offer Created', response)
          // const role: string | null= this.tokenService.getRoleToken(response.access_token)

          // this.router.navigate(['profile'])
          
        },
        error: (err) => {
          console.error('Error', err)
          this.errorMessage = err.error.detail
        }
      })
  
    }

    onDeleteOffer(offerId: number) {
      console.log('Delete offer with ID:', offerId);
    }
    onUpdateOffer(offerId: number) {
      console.log('Update offer with ID:', offerId);
    }

}
