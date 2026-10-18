import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PRODUCTOS } from './core/catalogo.data';
export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'Terramía Ornamentales · Plantas por cantidad' },
  { path: 'catalogo', component: CatalogoComponent, title: 'Catálogo · Terramía Ornamentales' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto · Terramía Ornamentales' },
  {
    path: 'plantas/:id',
    component: ProductoComponent,
    title: (route) =>
      (PRODUCTOS.find((p) => p.id === route.paramMap.get('id'))?.nombre ??
        'Producto no encontrado') + ' · Terramía Ornamentales',
  },
  { path: '**', redirectTo: '' },
];
