import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api/api.service';
import { Observable, tap } from 'rxjs';
import { EventJO } from '../../_interfaces/event';
import { AsyncPipe } from '@angular/common';
import { EventjoService } from '../../_services/eventJOService/eventjo.service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private eventJOService: EventjoService = inject(EventjoService)

  events$!: Observable<EventJO[]>

    ngOnInit(): void {
        this.events$ = this.eventJOService.getAll('event').pipe(
    tap(events => console.log(events))
  );
    }

}
