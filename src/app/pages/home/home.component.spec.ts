import { of } from 'rxjs';
import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../../_services/api/api.service';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const apiServiceMock = {
    getAllItems: jest.fn(() => of([]))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title', () => {
      const fixture = TestBed.createComponent(HomeComponent);
      fixture.detectChanges();
      const compiled: HTMLElement = fixture.nativeElement;
      expect(compiled.querySelector('p')?.textContent).toContain('home works!');
  });
});
