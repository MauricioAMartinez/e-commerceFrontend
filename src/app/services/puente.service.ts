import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuenteService {
  @Output() disparadorPuente: EventEmitter<any> = new EventEmitter();
  @Output() disparadorCart: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
