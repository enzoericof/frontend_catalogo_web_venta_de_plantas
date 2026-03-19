import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantaService } from '../../core/planta.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  plantas: any[] = [];
  plantasFiltradas: any[] = [];
  renderKey = 0;
  cargando = true;
  mostrarGrid = true;

  categorias = [
    { label: 'Todas', value: 'ALL' },
    { label: 'Cactus', value: 'Cactus y Suculentas' },
    { label: 'Decoraci\u00f3n', value: 'Decoraci\u00f3n' },
    { label: 'Florales', value: 'Florales' },
    { label: 'Macetas', value: 'Macetas' },
    { label: 'Exterior', value: 'Plantas para exterior' },
    { label: 'Interior', value: 'Plantas para interior' }
  ];

  categoriaSeleccionada = 'ALL';

  constructor(
    private plantaService: PlantaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.categoriaSeleccionada = params.get('categoria') ?? 'ALL';
      this.filtrar();
    });

    this.plantaService.listar().subscribe({
      next: data => {
        this.plantas = data;
        this.filtrar();
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  seleccionarCategoria(valor: string): void {
    this.router.navigate([], {
      queryParams: {
        categoria: valor === 'ALL' ? null : valor
      },
      queryParamsHandling: 'merge'
    });
  }

  private filtrar(): void {
    this.mostrarGrid = false;

    if (this.categoriaSeleccionada === 'ALL') {
      this.plantasFiltradas = [...this.plantas];
    } else {
      this.plantasFiltradas = this.plantas.filter(
        p => p.categoria === this.categoriaSeleccionada
      );
    }

    setTimeout(() => {
      this.mostrarGrid = true;
    });
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

  trackByPlanta(index: number, planta: any): number {
    return planta.id;
  }
}
