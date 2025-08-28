import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly storageKey = 'rickMortySearchHistory';
  private readonly maxHistorySize = 5; // Máximo de 5 itens no histórico

  // BehaviorSubject para notificar os componentes sobre mudanças no histórico
  private historySubject = new BehaviorSubject<string[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor() {
    this.loadHistoryFromStorage();
  }

  private loadHistoryFromStorage(): void {
    const savedHistory = localStorage.getItem(this.storageKey);
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    this.historySubject.next(history);
  }

  addTerm(term: string): void {
    const cleanedTerm = term.trim().toLowerCase();
    if (!cleanedTerm) return;

    let currentHistory = this.historySubject.getValue();
    // Remove o termo se ele já existir para colocá-lo no topo
    currentHistory = currentHistory.filter(item => item.toLowerCase() !== cleanedTerm);

    // Adiciona o novo termo no início
    currentHistory.unshift(cleanedTerm);

    // Limita o tamanho do histórico
    const newHistory = currentHistory.slice(0, this.maxHistorySize);

    // Salva no localStorage e notifica os inscritos
    localStorage.setItem(this.storageKey, JSON.stringify(newHistory));
    this.historySubject.next(newHistory);
  }

  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
    this.historySubject.next([]);
  }
}