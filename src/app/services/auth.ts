import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para que os componentes possam reagir ao estado de login
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  isAuthenticated$!: Observable<boolean>;

  constructor(private router: Router) { }

  // Verifica no localStorage se o usuário já está logado
  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  // Método para verificar o estado de login (usado pelo Route Guard)
  isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }

  // Lógica de login mockada
  login(email: string, password: string): Observable<boolean> {
    // Simula uma verificação de usuário e senha
    if (email === 'user@test.com' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      this.loggedIn.next(true);
      return of(true); // Retorna um Observable de sucesso
    }
    return of(false); // Retorna um Observable de falha
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}