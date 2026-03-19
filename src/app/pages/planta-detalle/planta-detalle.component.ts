import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlantaService } from '../../core/planta.service';
import { PlantaDetalle } from '../../core/planta-detalle.model';

@Component({
  selector: 'app-planta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planta-detalle.component.html',
  styleUrls: ['./planta-detalle.component.css']
})
export class PlantaDetalleComponent implements OnInit {

  planta!: PlantaDetalle;

  imagenActiva = '';
  indiceImagen = 0;

  cargando = true;
  categoriaOrigen: string | null = null;
  categoriaOrigenLabel: string | null = null;

  private readonly categoriasLabelMap: Record<string, string> = {
    'Cactus y Suculentas': 'Cactus',
    'Decoración': 'Decoración',
    'Florales': 'Florales',
    'Macetas': 'Macetas',
    'Plantas para exterior': 'Exterior',
    'Plantas para interior': 'Interior'
  };

  constructor(
    private route: ActivatedRoute,
    private plantaService: PlantaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriaOrigen = this.route.snapshot.queryParamMap.get('categoria');
    this.categoriaOrigenLabel = this.categoriaOrigen
      ? this.categoriasLabelMap[this.categoriaOrigen] ?? this.categoriaOrigen
      : null;

    this.plantaService.obtenerPorId(id).subscribe({
      next: data => {
        this.planta = data;

        if (this.planta.imagenes.length > 0) {
          this.indiceImagen = 0;
          this.imagenActiva = '/' + this.planta.imagenes[0];
        }

        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  cambiarImagen(img: string): void {
    this.indiceImagen = this.planta.imagenes.indexOf(img);
    this.imagenActiva = '/' + img;
  }

  imagenAnterior(): void {
    this.indiceImagen =
      (this.indiceImagen - 1 + this.planta.imagenes.length) %
      this.planta.imagenes.length;

    this.imagenActiva = '/' + this.planta.imagenes[this.indiceImagen];
  }

  imagenSiguiente(): void {
    this.indiceImagen =
      (this.indiceImagen + 1) % this.planta.imagenes.length;

    this.imagenActiva = '/' + this.planta.imagenes[this.indiceImagen];
  }

  trackByIndex(index: number): number {
    return index;
  }
}

