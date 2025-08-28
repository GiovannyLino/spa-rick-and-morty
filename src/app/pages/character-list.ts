import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { HeaderService } from '../services/service';

// CORREÇÃO 2: Garantir que o decorador @Component exista
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css'],
  standalone: false
})
export class CharacterList implements OnInit {
  characters: any[] = [];
  currentPage = 1;
  totalPages = 0;
  isLoading = false;
  searchTerm = '';

  constructor(
    private apiService: ApiService, 
    private router: Router,   
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Personagens');
    this.loadCharacters();
  }

  loadCharacters(): void {
    if (this.isLoading || (this.currentPage > this.totalPages && this.totalPages !== 0)) {
      return;
    }

    this.isLoading = true;
    this.apiService.getCharacters(this.currentPage, this.searchTerm).subscribe({
      // CORREÇÃO 3: Adicionada a tipagem explícita
      next: (response: any) => {
        this.characters = [...this.characters, ...response.results];
        this.totalPages = response.info.pages;
        this.currentPage++;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar personagens:', error);
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      this.loadCharacters();
    }
  }

  viewDetails(characterId: number): void {
    this.router.navigate(['/characters', characterId]);
  }
}