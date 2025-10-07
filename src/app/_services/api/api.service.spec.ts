import { expect } from '@jest/globals';

import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EventJO } from '../../_interfaces/event';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [
        ApiService, 
        provideHttpClient(),  
        provideHttpClientTesting()]
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getItems', () => {
    it('should return a list of events', () => {
      let eventJo: EventJO[] | undefined
      apiService.getAllItems('item').subscribe((response) => {
      eventJo = response
    })
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/item/')
    req.flush([{id: '1', name: 'test'}])
    expect(eventJo).toEqual([{id: '1', name: 'test'}])
    expect(req.request.method).toEqual('GET')
    })

  })

  
});
