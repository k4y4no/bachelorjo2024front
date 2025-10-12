import { Component, inject, OnInit } from '@angular/core';
import { UserPublic } from '../../_interfaces/user';
import { AuthService } from '../../_services/authService/auth.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from '../../_services/offerService/offer.service';
import { OfferTicketsCreate } from '../../_interfaces/offer-tickets';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  user: UserPublic | null = null;


  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }



}
