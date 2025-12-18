import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PlantaDetalleComponent } from './pages/planta-detalle/planta-detalle.component';

export const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'plantas/:id', component: PlantaDetalleComponent },
  { path: '**', redirectTo: '' }
];
