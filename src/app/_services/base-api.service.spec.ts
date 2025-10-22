import { expect } from '@jest/globals';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, provideHttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';

interface Item { id: number; name: string; }

@Injectable()
class TestApiService extends BaseApiService<Item> {
  constructor() {
    super('http://api.example.com');
  }
}

describe('BaseApiService', () => {
  let service: TestApiService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TestApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TestApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getAll() should GET the correct url and return an array', done => {
    const mock: Item[] = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];

    service.getAll('items').subscribe(resp => {
      expect(resp).toEqual(mock);
      done();
    });

    const req = httpTestingController.expectOne('http://api.example.com/items/');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create() should POST to the correct url with body and default options', done => {
    const body = { name: 'new' };
    const mockResp: Item = { id: 10, name: 'new' };

    service.create<Item, typeof body>('items', body).subscribe(resp => {
      expect(resp).toEqual(mockResp);
      done();
    });

    const req = httpTestingController.expectOne('http://api.example.com/items/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    // withCredentials undefined when not provided
    expect(req.request.withCredentials).toBeUndefined();
    req.flush(mockResp);
  });

  it('create() should forward headers, params and withCredentials when provided', done => {
    const body = { name: 'secure' };
    const headers = new HttpHeaders({ 'X-Test': '1' });
    const params = new HttpParams().set('q', '42');

    service.create<Item, typeof body>('secure', body, {
      headers,
      params,
      withCredentials: true
    }).subscribe(resp => {
      expect(resp).toEqual({ id: 5, name: 'secure' });
      done();
    });

    const req = httpTestingController.expectOne(r => r.url === 'http://api.example.com/secure/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    expect(req.request.headers.get('X-Test')).toBe('1');
    expect(req.request.params.get('q')).toBe('42');
    expect(req.request.withCredentials).toBeTruthy();
    req.flush({ id: 5, name: 'secure' });
  });
});