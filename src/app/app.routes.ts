import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {  path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'profile', component: ProfileComponent,
        canActivate: [authGuard]},
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard]
    },
];
