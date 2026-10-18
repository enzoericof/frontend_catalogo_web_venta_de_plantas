import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AppComponent } from './app';
import { routes } from './app.routes';
import { PRODUCTOS } from './core/catalogo.data';

describe('Recorrido de la tienda y fichas de producto', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });
  async function abrir(url: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }
  it('presenta anuncios en inicio y dirige a una ficha sin mostrar la calculadora', async () => {
    const root = await abrir('/');
    expect(root.querySelector('h1')?.textContent).toContain('Sansón de campo');
    expect(root.querySelector('app-cerco')).toBeNull();
    expect(root.querySelector('a[href="/plantas/sanson-de-campo"]')).not.toBeNull();
  });
  it('muestra una tarjeta por producto en el catálogo', async () => {
    const root = await abrir('/catalogo');
    expect(root.querySelectorAll('.product-card').length).toBe(PRODUCTOS.length);
    expect(root.querySelector('.product-card')?.getAttribute('href')).toBe(
      '/plantas/sanson-de-campo',
    );
  });
  it('reúne los cuidados y la calculadora en la ficha de la especie', async () => {
    const root = await abrir('/plantas/sanson-de-campo');
    expect(root.querySelector('app-cerco')).not.toBeNull();
    expect(root.querySelectorAll('.notes-list details').length).toBe(PRODUCTOS[0].cuidados.length);
    expect(root.querySelector('.hero-actions .text-link')?.getAttribute('href')).toBe(
      '/plantas/sanson-de-campo#plantacion',
    );
    expect(root.querySelector('.hero-actions .button')?.getAttribute('href')).toContain(
      'Sans%C3%B3n',
    );
  });
  it('prepara una consulta general desde Contacto', async () => {
    const root = await abrir('/contacto');
    const href = root.querySelector('.contact > .button')?.getAttribute('href') ?? '';
    expect(decodeURIComponent(href)).toContain('consulta sobre la tienda');
    expect(decodeURIComponent(href)).not.toContain('Sansón');
    expect(root.querySelector('app-cerco')).toBeNull();
  });
  it('no muestra otra especie si la URL de producto no existe', async () => {
    const root = await abrir('/plantas/no-existe');
    expect(root.querySelector('h1')?.textContent).toContain('No encontramos');
    expect(root.querySelector('app-cerco')).toBeNull();
  });
});
