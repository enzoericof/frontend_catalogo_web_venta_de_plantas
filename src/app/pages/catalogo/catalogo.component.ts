import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PlantaService } from '../../core/planta.service';
import { Router } from '@angular/router';




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

constructor(
  private plantaService: PlantaService,
  private route: ActivatedRoute,
  private router: Router
) {}


  ngOnInit(): void {

    // 1️⃣ Escuchar categoría desde la URL
    this.route.queryParamMap.subscribe(params => {
      this.categoriaSeleccionada = params.get('categoria') ?? 'ALL';
      this.filtrar();
    });

    // 2️⃣ Cargar todas las plantas
    this.plantaService.listar().subscribe({
      next: data => {
        this.plantas = data;
        this.filtrar();
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  // ================= FILTROS =================

seleccionarCategoria(valor: string): void {
  this.router.navigate([], {
    queryParams: {
      categoria: valor === 'ALL' ? null : valor
    },
    queryParamsHandling: 'merge'
  });
}


  private filtrar(): void {
    if (this.categoriaSeleccionada === 'ALL') {
      this.plantasFiltradas = [...this.plantas];
    } else {
      this.plantasFiltradas = this.plantas.filter(
        p => p.categoria === this.categoriaSeleccionada
      );
    }
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
