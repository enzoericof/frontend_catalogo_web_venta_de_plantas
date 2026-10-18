import { CONTACTOS, ANUNCIOS, consultaTienda } from '../src/app/core/tienda.data.ts';
import assert from 'node:assert/strict';
import { calcularPlantas, PRODUCTOS } from '../src/app/core/catalogo.data.ts';
assert.equal(calcularPlantas(10, 25), 41);
assert.equal(calcularPlantas(20, 30), 68);
assert.equal(calcularPlantas(10, 20), 51);
assert.equal(calcularPlantas(0.1, 30), 2);
for (const value of [0, -5, NaN, Infinity]) assert.equal(calcularPlantas(value, 25), 0);
for (const value of [0, -5, NaN, Infinity]) assert.equal(calcularPlantas(10, value), 0);
assert.equal(new Set(PRODUCTOS.map((p) => p.id)).size, PRODUCTOS.length);
for (const p of PRODUCTOS) {
  assert.ok(p.fotos.length > 0);
  assert.ok(p.separacionCm.minima > 0 && p.separacionCm.maxima >= p.separacionCm.minima);
  for (const foto of p.fotos) assert.ok(foto.descripcion.trim());
}
for (const contacto of CONTACTOS) assert.match(contacto.numero, /^595\d{9}$/);
console.log('Cálculos, datos del catálogo y contactos: OK');

for (const anuncio of ANUNCIOS) {
  if (anuncio.tipo === 'producto') assert.ok(PRODUCTOS.some((p) => p.id === anuncio.productoId));
}
assert.ok(!decodeURIComponent(consultaTienda).includes('Sansón'));
