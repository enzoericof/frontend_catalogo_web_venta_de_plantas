import { CommonModule } from '@angular/common';
import { PlantaService } from '../../core/planta.service';
import { Component, OnInit, HostListener } from '@angular/core';




@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit {

  plantas: any[] = [];
  plantasFiltradas: any[] = [];

  categorias = [
    { label: 'Todas', value: 'ALL' },
    { label: 'Cactus', value: 'Cactus y Suculentas' },
    { label: 'Decoración', value: 'Decoración' },
    { label: 'Florales', value: 'Florales' },
    { label: 'Macetas', value: 'Macetas' },
    { label: 'Exterior', value: 'Plantas para exterior' },
    { label: 'Interior', value: 'Plantas para interior' }
  ];

  categoriaSeleccionada = 'ALL';
  cargando = true;

  // ===== MODAL =====
  plantaSeleccionada: any = null;
  imagenActiva: string | null = null;

  constructor(private plantaService: PlantaService) {}

  ngOnInit(): void {
    this.plantaService.listar().subscribe({
      next: data => {
        this.plantas = data;
        this.plantasFiltradas = data;
        this.cargando = false;
      },
      error: err => console.error('Error cargando plantas', err)
    });
  }

  seleccionarCategoria(valor: string) {
    this.categoriaSeleccionada = valor;

    this.plantasFiltradas =
      valor === 'ALL'
        ? this.plantas
        : this.plantas.filter(p => p.categoria === valor);
  }

  ordenar(valor: string) {
    const copia = [...this.plantasFiltradas];

    if (valor === 'precio-asc') {
      this.plantasFiltradas = copia.sort((a, b) => a.precio - b.precio);
    }

    if (valor === 'precio-desc') {
      this.plantasFiltradas = copia.sort((a, b) => b.precio - a.precio);
    }
  }

  verDetalle(planta: any) {
    this.plantaSeleccionada = planta;
    this.imagenActiva =
      planta.imagenes?.length
        ? planta.imagenes[0]
        : planta.imagenPrincipal;
  }

  
  cerrarDetalle() {
    this.plantaSeleccionada = null;
    this.imagenActiva = null;
  }

  seleccionarImagen(url: string) {
    this.imagenActiva = url;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.plantaSeleccionada) {
      this.cerrarDetalle();
    }
  }
}


