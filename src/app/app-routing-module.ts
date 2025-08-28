import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Os caminhos devem apontar para a pasta 'pages'
import { CharacterList } from './pages/character-list';
import { CharacterDetail } from './pages/character-detail';
import { EpisodeList } from './pages/episode-list';
import { EpisodeDetail } from './pages/episode-detail';
import { Profile } from './pages/profile';
import { Dashboard } from './pages/dashboard';
import { SearchResults } from './pages/search-results';
import { Login } from './pages/login';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'characters/:id', component: CharacterDetail },
  { path: 'episodes', component: EpisodeList },
  { path: 'episodes/:id', component: EpisodeDetail },
  { path: 'profile', component: Profile },
  { path: 'dashboard', component: Dashboard },
  { path: 'search', component: SearchResults },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'characters' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }