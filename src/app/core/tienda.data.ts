export const CONTACTOS = [
  { numero: '595984769000', etiqueta: '0984 769 000' },
  { numero: '595981800008', etiqueta: '0981 800 008' },
] as const;

export const consultaTienda =
  'https://wa.me/' +
  CONTACTOS[0].numero +
  '?text=' +
  encodeURIComponent('Hola, Terramía. Quisiera hacer una consulta sobre la tienda.');
export const ANUNCIOS = [
  {
    id: 'sanson-destacado',
    tipo: 'producto',
    productoId: 'sanson-de-campo',
    titulo: 'Sansón de campo',
    subtitulo: 'Para tu cerco vivo.',
    nota: 'Conocé la planta, su presentación y sus cuidados.',
    imagen: 'assets/terramia/sanson-vivero.jpg',
    alt: 'Hileras de Sansón de campo en macetas en el vivero de Terramía',
  },
  {
    id: 'tienda-pedidos',
    tipo: 'tienda',
    titulo: 'Plantas por cantidad.',
    subtitulo: 'Terramía Ornamentales.',
    nota: 'Distribución a todo el país. Pedidos y presupuesto por WhatsApp.',
    imagen: 'assets/terramia/sanson-macetas.jpg',
    alt: 'Producción de plantas en el vivero de Terramía',
  },
] as const;
