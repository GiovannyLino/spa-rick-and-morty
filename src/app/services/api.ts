import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de personagens.
   * @param page O número da página a ser buscada.
   * @param name Um termo para filtrar personagens pelo nome.
   * @returns Um Observable com a resposta da API.
   */
  getCharacters(page: number = 1, name: string = ''): Observable<any> {
    return this.http.get(`${this.API_URL}/character?page=${page}&name=${name}`);
  }

  /**
   * Busca um personagem específico pelo seu ID.
   * @param id O ID do personagem.
   */
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/character/${id}`);
  }

  /**
   * Busca uma lista paginada de episódios.
   * @param page O número da página a ser buscada.
   * @param name Um termo para filtrar episódios pelo nome.
   */
  getEpisodes(page: number = 1, name: string = ''): Observable<any> {
    return this.http.get(`${this.API_URL}/episode?page=${page}&name=${name}`);
  }

  /**
   * Busca um episódio específico pelo seu ID.
   * @param id O ID do episódio.
   */
  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/episode/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<any> {
    return this.http.get(`${this.API_URL}/episode/${ids.join(',')}`);
  }

  getMultipleCharacters(ids: number[]): Observable<any> {
    return this.http.get(`${this.API_URL}/character/${ids.join(',')}`);
  }
}