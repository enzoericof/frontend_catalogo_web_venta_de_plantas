import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ANUNCIOS } from '../../core/tienda.data';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  readonly anuncios = ANUNCIOS;
}
