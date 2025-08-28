import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Adicione Router
import { ApiService } from '../services/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.html',
  styleUrls: ['./episode-detail.css'],
  standalone: false
})
export class EpisodeDetail implements OnInit {
  episode: any = null;
  characters: any[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private router: Router // Injete o Router
  ) { }

  ngOnInit(): void {
    const episodeId = this.route.snapshot.paramMap.get('id');

    if (episodeId) {
      this.apiService.getEpisodeById(+episodeId).subscribe({
        next: (response: any) => {
          this.episode = response;
          if (this.episode.characters && this.episode.characters.length > 0) {
            this.fetchCharacters();
          } else {
            this.isLoading = false;
          }
        },
        error: (err: any) => {
          console.error('Erro ao buscar episódio', err);
          this.isLoading = false;
        }
      });
    }
  }

  fetchCharacters(): void {
    const characterIds = this.episode.characters.map((url: string) => url.split('/').pop());

    this.apiService.getMultipleCharacters(characterIds).subscribe({
      next: (charData: any) => {
        this.characters = Array.isArray(charData) ? charData : [charData];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar personagens do episódio', err);
        this.isLoading = false;
      }
    });
  }

  // Navega para a página de detalhes do personagem
  viewCharacter(characterId: number): void {
    this.router.navigate(['/characters', characterId]);
  }

  goBack(): void {
    this.location.back();
  }
}