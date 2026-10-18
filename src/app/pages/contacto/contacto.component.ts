import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACTOS, consultaTienda } from '../../core/tienda.data';
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  readonly contactos = CONTACTOS;
  readonly consulta = consultaTienda;
}
