import { DOCUMENT, Location } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('aboutSlider') aboutSlider?: ElementRef<HTMLDivElement>;

  plantas: any[] = [];
  plantasFiltradas: any[] = [];
  renderKey = 0;
  cargando = true;
  mostrarGrid = true;
  ordenSeleccionado = 'nombre-asc';
  quienesSomosSlides = [
    {
      tone: 'terracotta-deep',
      eyebrow: 'Curaduría',
      title: 'Selección pensada con criterio',
      text: 'Elegimos plantas, macetas y detalles que se complementan entre sí para que cada rincón se sienta armónico.'
    },
    {
      tone: 'terracotta',
      eyebrow: 'Acompañamiento',
      title: 'Atención cercana y simple',
      text: 'Te orientamos por WhatsApp para disponibilidad, combinaciones y recomendaciones según tu espacio.'
    },
    {
      tone: 'olive',
      eyebrow: 'Logística',
      title: 'Retiros y entregas coordinadas',
      text: 'Organizamos cada pedido de forma directa para que recibas tus productos con claridad y sin vueltas.'
    },
    {
      tone: 'moss',
      eyebrow: 'Estilo',
      title: 'Verde con calidez natural',
      text: 'Buscamos una presentación serena, con tonos tierra y oliva, para que la experiencia se sienta cuidada.'
    }
  ];

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
    @Inject(DOCUMENT) private document: Document,
    private location: Location,
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
    this.categoriaSeleccionada = valor;
    this.filtrar();

    const fragmentoActual =
      this.route.snapshot.fragment ??
      this.document.defaultView?.location.hash.replace('#', '') ??
      null;

    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: {
        categoria: valor === 'ALL' ? null : valor
      },
      queryParamsHandling: 'merge',
      fragment: fragmentoActual || undefined
    });

    this.location.replaceState(this.router.serializeUrl(urlTree));
  }

  private filtrar(): void {
    if (this.categoriaSeleccionada === 'ALL') {
      this.plantasFiltradas = [...this.plantas];
    } else {
      this.plantasFiltradas = this.plantas.filter(
        p => p.categoria === this.categoriaSeleccionada
      );
    }

    this.aplicarOrden();
    this.mostrarGrid = true;
  }

  ordenar(valor: string): void {
    this.ordenSeleccionado = valor;
    this.aplicarOrden();
  }

  private aplicarOrden(): void {
    const copia = [...this.plantasFiltradas];

    if (this.ordenSeleccionado === 'nombre-asc') {
      copia.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    }

    if (this.ordenSeleccionado === 'nombre-desc') {
      copia.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'));
    }

    this.plantasFiltradas = copia;
  }

  scrollToTop(event?: Event): void {
    event?.preventDefault();
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollAboutSlider(direction: 'prev' | 'next'): void {
    const slider = this.aboutSlider?.nativeElement;

    if (!slider) {
      return;
    }

    const distance = Math.round(slider.clientWidth * 0.78);
    const left = direction === 'next' ? distance : -distance;

    slider.scrollBy({ left, behavior: 'smooth' });
  }

  trackByPlanta(index: number, planta: any): number {
    return planta.id;
  }
}
