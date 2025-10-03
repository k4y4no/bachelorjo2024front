import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api/api.service';
import { Observable, tap } from 'rxjs';
import { EventJO } from '../../_interfaces/event';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private apiService: ApiService = inject(ApiService)

  events$!: Observable<EventJO[]>

    ngOnInit(): void {
        this.events$ = this.apiService.getAllItems('event').pipe(
    tap(events => console.log(events))
  );
    }

}
