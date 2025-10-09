import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../_services/authService/auth.service';
import { TitleCasePipe } from '@angular/common';
import { AppService } from '../../_services/appService/app.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    TitleCasePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    router = inject(Router)
    authService = inject(AuthService)
    appService = inject(AppService)
    innerWidth: number = 0;
    isMenuOpen:boolean = false;
    logMenu: string = "login"
    isAuthenticated: boolean | null = null;
    isAdmin: boolean | null = null;
    profileOn: string = "register"

    constructor(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.toggleMenu()
        this.isAuthenticated = this.authService.isConnected() ? true:false
        this.isAdmin = this.appService.hasRole('admin')
        this.logMenu = this.authService.isConnected() ? "logout":"login"
        if(this.isAuthenticated) {
          this.profileOn = this.isAdmin ? "dash":"profile"
        } else {
          this.profileOn = "register"
        }


      }
    })
  }


  ngOnInit() {
    this.innerWidth = window.innerWidth;

  }

  toggleMenu(): void{
    if(this.innerWidth > 400){
      return
    }
    this.isMenuOpen = !this.isMenuOpen

  }

  loggingOut(){
    
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response)
        this.router.navigate(['/login'])
      }
    });
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.innerWidth = window.innerWidth;
        if(this.innerWidth > 400){
          this.isMenuOpen = false
    }
  }
}
