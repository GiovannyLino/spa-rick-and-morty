import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // BehaviorSubject guarda o último valor emitido para novos inscritos.
  public pageTitle = new BehaviorSubject<string>('');

  constructor() { }

  // Método que os componentes de página (CharacterList, etc.) usarão para definir o título
  setTitle(title: string): void {
    this.pageTitle.next(title);
  }
}