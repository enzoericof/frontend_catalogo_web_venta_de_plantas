import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTOS } from '../../core/catalogo.data';
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  readonly productos = PRODUCTOS;
}
