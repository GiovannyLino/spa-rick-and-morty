import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api';
import { HeaderService } from '../services/service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css'],
  standalone: false
})
export class SearchResults implements OnInit {

  searchQuery = '';
  characterResults: any[] = [];
  episodeResults: any[] = [];
  isLoading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('q');
      if (query) {
        this.searchQuery = query;
        this.headerService.setTitle(`Busca: "${query}"`);
        this.performSearch(query);
      }
    });
  }

  performSearch(query: string): void {
    this.isLoading = true;
    this.error = false;
    this.characterResults = [];
    this.episodeResults = [];

    // forkJoin para buscar personagens e episódios em paralelo
    forkJoin({
      characters: this.apiService.getCharacters(1, query),
      episodes: this.apiService.getEpisodes(1, query)
    }).subscribe({
      next: (results) => {
        this.characterResults = results.characters.results || [];
        this.episodeResults = results.episodes.results || [];
        this.isLoading = false;
      },
      error: (err) => {
        // A API retorna 404 se não encontrar nada, o que o forkJoin trata como erro.
        console.warn('Nenhum resultado encontrado para a busca:', err);
        this.error = true;
        this.isLoading = false;
      }
    });
  }

  // Métodos para navegar para os detalhes
  viewCharacter(id: number): void { this.router.navigate(['/characters', id]); }
  viewEpisode(id: number): void { this.router.navigate(['/episodes', id]); }
}