export const CONTACTOS = [
  { numero: '595984769000', etiqueta: '0984 769 000' },
  { numero: '595981800008', etiqueta: '0981 800 008' },
] as const;

export const consultaTienda =
  'https://wa.me/' +
  CONTACTOS[0].numero +
  '?text=' +
  encodeURIComponent('Hola, Terramía. Quisiera hacer una consulta sobre la tienda.');

// Cada fotografía puede tener una composición específica para móvil y escritorio.
export const FOTOS_HERO = [
  {
    escritorio: 'assets/terramia/cerco-horizontal.jpg',
    movil: 'assets/terramia/cerco-vertical.jpg',
    alt: 'Cerco vivo de Sansón de campo junto a un jardín arbolado',
    etiqueta: 'Cerco vivo',
  },
  {
    escritorio: 'assets/terramia/cerco-jardin.jpg',
    movil: 'assets/terramia/sanson-cerco-formado.jpg',
    alt: 'Cerco vivo de Sansón de campo delimitando un jardín',
    etiqueta: 'Cerco formado',
  },
] as const;

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
