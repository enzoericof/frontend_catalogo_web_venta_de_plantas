import { CONTACTOS } from '../../core/tienda.data';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CercoComponent } from '../../components/cerco/cerco.component';
import { PRODUCTOS } from '../../core/catalogo.data';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, CercoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent {
  @ViewChild('visor') visor?: ElementRef<HTMLDialogElement>;
  private readonly parametros = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });
  readonly producto = computed(() => PRODUCTOS.find((p) => p.id === this.parametros().get('id')));
  readonly fotoActiva = signal(0);
  readonly foto = computed(
    () => this.producto()?.fotos[this.fotoActiva()] ?? PRODUCTOS[0].fotos[0],
  );
  readonly consulta = computed(
    () =>
      'https://wa.me/' +
      CONTACTOS[0].numero +
      '?text=' +
      encodeURIComponent(
        'Hola, Terramía. Quisiera consultar precio y disponibilidad de ' +
          this.producto()?.nombre +
          '.',
      ),
  );
  constructor() {
    effect(() => {
      this.producto();
      this.fotoActiva.set(0);
    });
  }
  abrirFoto(): void {
    this.visor?.nativeElement.showModal();
  }
  cerrarFoto(): void {
    this.visor?.nativeElement.close();
  }
  cerrarFondo(event: MouseEvent): void {
    if (event.target === this.visor?.nativeElement) this.cerrarFoto();
  }
}
