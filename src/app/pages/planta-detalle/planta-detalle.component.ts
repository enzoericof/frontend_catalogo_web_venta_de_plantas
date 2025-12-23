import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantaService } from '../../core/planta.service';
import { ImagenPlanta, PlantaDetalle } from '../../core/planta-detalle.model';

@Component({
  selector: 'app-planta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planta-detalle.component.html',
  styleUrls: ['./planta-detalle.component.css']
})
export class PlantaDetalleComponent implements OnInit {

  planta!: PlantaDetalle;

  imagenActiva: string | null = null;
  indiceImagen = 0;

  cargando = true;
  categoriaOrigen: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private plantaService: PlantaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.categoriaOrigen =
      this.route.snapshot.queryParamMap.get('categoria');

    this.plantaService.obtenerPorId(id).subscribe({
      next: data => {
        this.planta = data;

        if (this.planta.imagenes?.length) {
          this.indiceImagen = 0;
          this.imagenActiva = '/' + this.planta.imagenes[0].url;
        }

        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando planta', err);
        this.cargando = false;
      }
    });
  }

  /* ================= IMÁGENES ================= */

  cambiarImagen(url: string): void {
    this.imagenActiva = '/' + url;
    this.indiceImagen = this.planta.imagenes.findIndex(i => i.url === url);
  }

  imagenAnterior(): void {
    if (!this.planta?.imagenes?.length) return;

    this.indiceImagen =
      (this.indiceImagen - 1 + this.planta.imagenes.length) %
      this.planta.imagenes.length;

    this.imagenActiva =
      '/' + this.planta.imagenes[this.indiceImagen].url;
  }

  imagenSiguiente(): void {
    if (!this.planta?.imagenes?.length) return;

    this.indiceImagen =
      (this.indiceImagen + 1) % this.planta.imagenes.length;

    this.imagenActiva =
      '/' + this.planta.imagenes[this.indiceImagen].url;
  }

  /* ================= TRACK BY (CLAVE) ================= */

  trackByUrl(index: number, img: ImagenPlanta): string {
    return img.url;
  }

  /* ================= NAVEGACIÓN ================= */

  volver(): void {
    this.router.navigate(['/'], {
      queryParams: this.categoriaOrigen
        ? { categoria: this.categoriaOrigen }
        : {}
    });
  }

  /* ================= CATEGORÍAS ================= */

  categorias = [
    { label: 'Cactus', value: 'Cactus y Suculentas' },
    { label: 'Decoración', value: 'Decoración' },
    { label: 'Florales', value: 'Florales' },
    { label: 'Macetas', value: 'Macetas' },
    { label: 'Exterior', value: 'Plantas para exterior' },
    { label: 'Interior', value: 'Plantas para interior' }
  ];

  getCategoriaLabel(value: string | null): string | null {
    if (!value || value === 'ALL') return null;
    return this.categorias.find(c => c.value === value)?.label ?? value;
  }
}
