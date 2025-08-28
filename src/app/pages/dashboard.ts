import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { HeaderService } from '../services/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class Dashboard implements OnInit {

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // Garante que o efeito só aconteça quando o carrossel está visível
    if (this._swiperContainer && this._swiperContainer.nativeElement) {
      const cards = this._swiperContainer.nativeElement.querySelectorAll('.card');
      cards.forEach((card: HTMLElement) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
      });
    }
  }
  // Usamos um setter para o ViewChild. Ele será chamado assim que o elemento aparecer na tela.
  @ViewChild('swiperContainer') set swiperContainer(elementRef: ElementRef) {
    if (elementRef) {
      this._swiperContainer = elementRef;
      this.initializeSwiper(); // Tenta inicializar assim que o elemento HTML estiver pronto
    }
  }
  private _swiperContainer!: ElementRef;
  private swiperInitialized = false; // Flag para garantir que inicializamos apenas uma vez

  featuredCharacters: any[] = [];
  isLoading = true;

  constructor(
    private headerService: HeaderService,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef // Detector de mudanças para garantir a atualização da view
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Menu Principal');
    this.loadFeaturedCharacters();
  }

  loadFeaturedCharacters(): void {
    this.apiService.getCharacters(1).subscribe({
      next: (response: any) => {
        this.featuredCharacters = response.results;
        this.isLoading = false;
        // Força o Angular a atualizar a tela AGORA com os novos dados
        this.cdr.detectChanges(); 
        this.initializeSwiper(); // Tenta inicializar assim que os dados chegarem
      },
      error: (err: any) => {
        console.error("Erro ao carregar personagens para o dashboard", err);
        this.isLoading = false;
      }
    });
  }

  initializeSwiper(): void {
    // A mágica acontece aqui: só inicializa se o HTML estiver pronto, 
    // se os dados tiverem chegado E se ainda não foi inicializado.
    if (!this._swiperContainer || this.featuredCharacters.length === 0 || this.swiperInitialized) {
      return;
    }

    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: true,
      pagination: { clickable: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }
    };

    Object.assign(this._swiperContainer.nativeElement, swiperParams);
    this._swiperContainer.nativeElement.initialize();
    this.swiperInitialized = true; // Marca como inicializado para não repetir
  }
  
  viewCharacter(characterId: number): void {
    this.router.navigate(['/characters', characterId]);
  }
}