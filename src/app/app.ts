import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CONTACTOS } from './core/tienda.data';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  constructor() {
    inject(ViewportScroller).setOffset([0, 100]);
  }
  readonly contactos = CONTACTOS;
}
