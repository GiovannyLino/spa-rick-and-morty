import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { HeaderService } from '../services/service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.html',
  styleUrls: ['./episode-list.css'],
  standalone: false
})
export class EpisodeList implements OnInit {
  episodes: any[] = [];
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
    this.headerService.setTitle('Episódios');
    this.loadEpisodes();
  }

  loadEpisodes(): void {
    if (this.isLoading || (this.currentPage > this.totalPages && this.totalPages !== 0)) {
      return;
    }

    this.isLoading = true;
    this.apiService.getEpisodes(this.currentPage, this.searchTerm).subscribe({
      next: (response: any) => {
        this.episodes = [...this.episodes, ...response.results];
        this.totalPages = response.info.pages;
        this.currentPage++;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar episódios:', error);
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      this.loadEpisodes();
    }
  }

  viewDetails(episodeId: number): void {
    this.router.navigate(['/episodes', episodeId]);
  }

  // Função auxiliar para extrair a temporada do código 'S01E01'
  getSeasonFromCode(episodeCode: string): string {
    if (!episodeCode) return '';
    return episodeCode.substring(1, 3); // Extrai os caracteres na posição 1 e 2 ('01')
  }
}