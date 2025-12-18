import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantaService } from '../../core/planta.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  // ================= DATA =================

  plantas: any[] = [];
  plantasFiltradas: any[] = [];

  cargando = true;

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

  // ================= INIT =================

  constructor(private plantaService: PlantaService) {}

  ngOnInit(): void {
    this.plantaService.listar().subscribe({
      next: data => {
        this.plantas = data;
        this.plantasFiltradas = [...data];
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando plantas', err);
        this.cargando = false;
      }
    });
  }

  // ================= FILTROS =================

  seleccionarCategoria(valor: string): void {
    this.categoriaSeleccionada = valor;

    // 🔑 Forzamos recreación del DOM para animación fluida
    this.plantasFiltradas = [];

    setTimeout(() => {
      if (valor === 'ALL') {
        this.plantasFiltradas = [...this.plantas];
      } else {
        this.plantasFiltradas = this.plantas.filter(
          p => p.categoria === valor
        );
      }
    }, 0);
  }

  ordenar(valor: string): void {
    const copia = [...this.plantasFiltradas];

    if (valor === 'precio-asc') {
      copia.sort((a, b) => a.precio - b.precio);
    }

    if (valor === 'precio-desc') {
      copia.sort((a, b) => b.precio - a.precio);
    }

    this.plantasFiltradas = copia;
  }

  // ================= OPTIMIZACIÓN =================

  trackByPlanta(index: number, planta: any): number {
    return planta.id;
  }

}

