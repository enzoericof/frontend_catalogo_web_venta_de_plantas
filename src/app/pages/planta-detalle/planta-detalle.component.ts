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

  constructor(
    private route: ActivatedRoute,
    private plantaService: PlantaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.plantaService.obtenerPorId(id).subscribe({
      next: data => {
        this.planta = data;
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando planta', err);
        this.cargando = false;
      }
    });
  }

  volver() {
  this.location.back();
  }
}
