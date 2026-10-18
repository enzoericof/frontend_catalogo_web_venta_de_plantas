import { CONTACTOS } from '../../core/tienda.data';
import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCatalogo, calcularPlantas } from '../../core/catalogo.data';
@Component({
  selector: 'app-cerco',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cerco.component.html',
  styleUrl: './cerco.component.css',
})
export class CercoComponent {
  readonly producto = input.required<ProductoCatalogo>();
  readonly metros = signal<number | null>(10);
  readonly separacion = signal(25);
  readonly cantidad = computed(() => calcularPlantas(this.metros() ?? 0, this.separacion()));
  readonly presupuesto = computed(
    () =>
      'https://wa.me/' +
      CONTACTOS[0].numero +
      '?text=' +
      encodeURIComponent(
        `Hola, Terramía. Quisiera un presupuesto de ${this.producto().nombre} para un cerco de ${this.metros()} metros. El cálculo orientativo es de ${this.cantidad()} plantas a ${this.separacion()} cm de separación. ¿Me ayudan a confirmar la cantidad y coordinar la entrega?`,
      ),
  );
  actualizarMetros(event: Event): void {
    const valor = (event.target as HTMLInputElement).valueAsNumber;
    this.metros.set(Number.isFinite(valor) && valor > 0 && valor <= 10000 ? valor : null);
  }
}
