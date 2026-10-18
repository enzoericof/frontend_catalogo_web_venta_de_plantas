export interface ProductoCatalogo {
  id: string;
  nombre: string;
  nombreBotanico: string;
  descripcion: string;
  subtitulo: string;
  ubicacion: string;
  contexto: {
    titulo: string;
    descripcion: string;
    fotos: { archivo: string; descripcion: string; titulo: string; pie: string }[];
  };
  produccion: string;
  presentacion: string;
  separacionCm: { minima: number; maxima: number };
  fotos: { archivo: string; descripcion: string; encuadre: string; etiqueta: string }[];
  cuidados: { titulo: string; texto: string }[];
  permiteCalcularCerco: boolean;
}
// Información del diseño DAHW-PAe_QI de Terramía, páginas 2–5.
// Para ampliar el catálogo, agregar productos aquí.
export const PRODUCTOS: readonly ProductoCatalogo[] = [
  {
    id: 'sanson-de-campo',
    nombre: 'Sansón de campo',
    nombreBotanico: 'Mimosa caesalpiniifolia',
    descripcion:
      'Una planta para formar cercos vivos, barreras vegetales y delimitaciones naturales.',
    subtitulo: 'Para tu cerco vivo.',
    ubicacion: 'A pleno sol',
    contexto: {
      titulo: 'Del vivero al cerco.',
      descripcion:
        'Se entrega en maceta. Con la plantación y la poda de formación, se desarrolla como barrera vegetal.',
      fotos: [
        {
          archivo: 'assets/terramia/sanson-vivero.jpg',
          descripcion: 'Sansón de campo en macetas, dispuesto en hileras en el vivero',
          titulo: 'En maceta.',
          pie: 'Tierra y mantillo de monte.',
        },
        {
          archivo: 'assets/terramia/sanson-cerco.jpg',
          descripcion: 'Un cerco de Sansón de campo delimitando un jardín',
          titulo: 'Como cerco vivo.',
          pie: 'Para delimitar tu terreno.',
        },
      ],
    },
    produccion: 'Septiembre a abril',
    presentacion: 'En maceta, con mezcla de tierra y mantillo de monte.',
    separacionCm: { minima: 20, maxima: 30 },
    permiteCalcularCerco: true,
    cuidados: [
      {
        titulo: '¿Para qué se usa?',
        texto:
          'Es una leguminosa de crecimiento rápido. Se usa para delimitar terrenos y formar cercos vivos y barreras vegetales densas. Tiene pequeñas espinas.',
      },
      {
        titulo: '¿Cuánto sol y riego necesita?',
        texto:
          'Necesita sol pleno. Durante las primeras semanas después del trasplante requiere riego frecuente. Una vez establecida, tolera el calor y los períodos de sequía.',
      },
      {
        titulo: '¿Cómo se mantiene el cerco?',
        texto:
          'Con podas de formación para controlar la altura y dar forma a la barrera vegetal. La separación recomendada es de 20 a 30 cm, según la densidad que buscás.',
      },
      {
        titulo: '¿Cómo se entrega?',
        texto:
          'En maceta, con mezcla de tierra y mantillo de monte. La temporada de producción va de septiembre a abril. Consultanos por la disponibilidad actual.',
      },
    ],
    fotos: [
      {
        archivo: 'assets/terramia/sanson-hojas.jpg',
        descripcion: 'Hojas de Sansón de campo con gotas de agua',
        encuadre: 'hojas',
        etiqueta: 'Hojas',
      },
      {
        archivo: 'assets/terramia/sanson-vivero.jpg',
        descripcion: 'Plantas de Sansón de campo en el vivero de Terramía',
        encuadre: 'vivero',
        etiqueta: 'En vivero',
      },
      {
        archivo: 'assets/terramia/sanson-cerco-formado.jpg',
        descripcion: 'Cerco de Sansón de campo delimitando un jardín',
        encuadre: 'cerco',
        etiqueta: 'Cerco formado',
      },
    ],
  },
];
export function calcularPlantas(metros: number, separacionCm: number): number {
  if (
    !Number.isFinite(metros) ||
    metros <= 0 ||
    !Number.isFinite(separacionCm) ||
    separacionCm <= 0
  )
    return 0;
  return Math.ceil((metros * 100) / separacionCm) + 1;
}
