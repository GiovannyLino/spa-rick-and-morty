import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // 1. Importe NavigationEnd
import { filter } from 'rxjs/operators'; // 2. Importe o operador 'filter'
import { HeaderService } from '../services/service';
import { SearchHistoryService } from '../services/search-history';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: false
})
export class Header implements OnInit {
  pageTitle$: Observable<string>;
  searchHistory$: Observable<string[]>;
  isHistoryVisible = false;
  
  // NOVO: Variável para controlar a visibilidade da busca
  showSearchBar = true;

  constructor(
    private headerService: HeaderService,
    private searchHistoryService: SearchHistoryService,
    private router: Router
  ) {
    this.pageTitle$ = this.headerService.pageTitle.asObservable();
    this.searchHistory$ = this.searchHistoryService.history$;
  }

  ngOnInit(): void {
    // NOVO: Lógica que "ouve" as mudanças de rota
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verifica se a URL atual começa com '/profile'
      if (event.urlAfterRedirects.startsWith('/profile')) {
        this.showSearchBar = false; // Esconde a barra de busca
      } else {
        this.showSearchBar = true; // Mostra em todas as outras páginas
      }
    });
  }

  // ... (seus outros métodos onSearch, onHistoryItemClick, etc. continuam aqui)
  onSearch(query: string): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      this.searchHistoryService.addTerm(trimmedQuery);
      this.isHistoryVisible = false;
      this.router.navigate(['/search'], { queryParams: { q: trimmedQuery } });
    }
  }

  onHistoryItemClick(term: string): void {
    const input = document.getElementById('global-search') as HTMLInputElement;
    if (input) input.value = term;
    this.onSearch(term);
  }

  clearSearchHistory(): void {
    this.searchHistoryService.clearHistory();
  }
}