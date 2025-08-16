import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth';
import { HomeComponent } from './home/home'; 
import { authGuard } from './guards/auth-guard'; 

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  
  // Replace the old login/signup with a single 'auth' route
  { path: 'auth', component: AuthComponent }, 

  // Update the redirects to point to the new auth route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' } // Redirect any other path to the auth page
];