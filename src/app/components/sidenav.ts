import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({ 
   selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}