import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private plantaService: PlantaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriaOrigen = this.route.snapshot.queryParamMap.get('categoria');

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

