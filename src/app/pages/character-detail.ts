import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.html',
  styleUrls: ['./character-detail.css'],
  standalone: false
})
export class CharacterDetail implements OnInit {
  character: any = null;
  episodes: any[] = []; // Array para guardar os episódios
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');

    if (characterId) {
      this.apiService.getCharacterById(+characterId).subscribe({
        next: (response: any) => {
          this.character = response;
          // Se o personagem apareceu em algum episódio, busca os detalhes
          if (this.character.episode && this.character.episode.length > 0) {
            this.fetchEpisodes();
          } else {
            this.isLoading = false;
          }
        },
        error: (error: any) => {
          console.error('Erro ao buscar detalhes do personagem:', error);
          this.isLoading = false;
        }
      });
    }
  }

  fetchEpisodes(): void {
    // Extrai os IDs dos episódios das URLs
    const episodeIds = this.character.episode.map((url: string) => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });

    this.apiService.getMultipleEpisodes(episodeIds).subscribe({
      next: (episodesData: any) => {
        // Se a API retornar um único objeto, coloque-o em um array
        this.episodes = Array.isArray(episodesData) ? episodesData : [episodesData];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar episódios:', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}