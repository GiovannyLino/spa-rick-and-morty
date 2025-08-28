import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Para chamadas de API
import { FormsModule } from '@angular/forms'; // Para formulários (página de perfil)
import { CommonModule } from '@angular/common'; // Para diretivas como *ngFor e *ngIf

// Roteamento e Componentes
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MainLayout } from './layouts/main-layout';
import { Header } from './components/header';
import { Sidenav } from './components/sidenav';
import { Dashboard } from './pages/dashboard';
import { CharacterList } from './pages/character-list';
import { CharacterDetail } from './pages/character-detail';
import { EpisodeList } from './pages/episode-list';
import { EpisodeDetail } from './pages/episode-detail';
import { Profile } from './pages/profile';
import { SearchResults } from './pages/search-results';
import { Login } from './pages/login';

@NgModule({
  // Seus componentes, diretivas e pipes
  declarations: [
    App,
    MainLayout,
    Header,
    Sidenav,
    Dashboard,
    CharacterList,
    CharacterDetail,
    EpisodeList,
    EpisodeDetail,
    Profile,
    SearchResults,
    Login
  ],
  // Módulos que sua aplicação precisa
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // <-- Garante que o HttpClient funcione
    FormsModule,
    CommonModule
  ],
  // Serviços (geralmente não precisa mais com 'providedIn: root')
  providers: [],
  // O componente que inicia a aplicação
  bootstrap: [App],
  // Permite o uso de 'web components' como a Swiper
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }