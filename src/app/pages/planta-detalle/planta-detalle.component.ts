import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantaService } from '../../core/planta.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-planta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planta-detalle.component.html',
  styleUrls: ['./planta-detalle.component.css']
})



export class PlantaDetalleComponent implements OnInit {

  planta: any = null;
  cargando = true;
categoriaOrigen: string | null = null;

constructor(
  private route: ActivatedRoute,
  private plantaService: PlantaService,
  private router: Router
) {}
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  // 🔑 ESTA LÍNEA ES LA CLAVE
  this.categoriaOrigen =
    this.route.snapshot.queryParamMap.get('categoria');

  this.plantaService.obtenerPorId(id).subscribe({
    next: data => {
      this.planta = data;
      this.cargando = false;
    },
    error: () => this.cargando = false
  });
}


volver() {
  this.router.navigate(['/'], {
    queryParams: this.categoriaOrigen
      ? { categoria: this.categoriaOrigen }
      : {}
  });
}

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
