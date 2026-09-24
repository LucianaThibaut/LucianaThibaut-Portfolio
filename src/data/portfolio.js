// Portfolio data — Luciana Thibaut, Ingeniera Civil

export const personal = {
  nombre: 'Luciana Thibaut',
  titulo: 'Ingeniera Civil',
  subtitulo: 'Especialista en Documentación Técnica & AutoCAD',
  email: 'luciana.thibaut@gmail.com',
  linkedin: 'linkedin.com/in/luciana-thibaut',
  ubicacion: 'Buenos Aires, Argentina',
  foto: '/luciana.jpg',
  resumen:
    'Ingeniera Civil con experiencia en oficina técnica, delineación y preparación de obras. Especializada en la elaboración y revisión de planos en AutoCAD para proyectos hidráulicos, de pavimentos y estructuras. Comprometida con la precisión técnica, la documentación detallada y la coordinación efectiva entre equipos de obra y producción.',
}

export const habilidades = [
  { nombre: 'AutoCAD', nivel: 95, categoria: 'software' },
  { nombre: 'Documentación Técnica', nivel: 90, categoria: 'tecnica' },
  { nombre: 'Lectura de Planos', nivel: 92, categoria: 'tecnica' },
  { nombre: 'Mediciones y Presupuestos', nivel: 85, categoria: 'tecnica' },
  { nombre: 'Excel (nivel avanzado)', nivel: 82, categoria: 'software' },
  { nombre: 'Despieces y Modulaciones', nivel: 88, categoria: 'tecnica' },
  { nombre: 'Cuantificación de Materiales', nivel: 87, categoria: 'tecnica' },
  { nombre: 'Presto', nivel: 65, categoria: 'software' },
]

export const proyectos = [
  {
    id: 1,
    titulo: 'Planos Hidráulicos',
    subtitulo: 'Redes de agua y saneamiento',
    descripcion:
      'Elaboración y modificación de planos de instalaciones hidráulicas en AutoCAD: redes de distribución de agua potable, desagüe cloacal y pluvial. Coordinación con equipos de obra para detección de incompatibilidades antes del inicio.',
    tags: ['AutoCAD', 'Hidráulica', 'Instalaciones', 'Documentación'],
    destacado: true,
  },
  {
    id: 2,
    titulo: 'Proyectos de Pavimentos',
    subtitulo: 'Vías urbanas e infraestructura vial',
    descripcion:
      'Generación de planos de trazado y perfiles de pavimento. Elaboración de libros de montaje, despieces y modulaciones. Cuantificación de materiales y generación de listados para compras y taller.',
    tags: ['AutoCAD', 'Vialidad', 'Cuantificación', 'Mediciones'],
    destacado: true,
  },
  {
    id: 3,
    titulo: 'Documentación de Fachadas',
    subtitulo: 'Sistemas SATE y fachadas ventiladas',
    descripcion:
      'Preparación de documentación técnica para sistemas de fachadas ventiladas. Lectura e interpretación de planos arquitectónicos y constructivos para la generación de despieces de materiales HPL, aluminio y fibrocemento.',
    tags: ['AutoCAD', 'SATE', 'Fachadas Ventiladas', 'HPL', 'Aluminio'],
    destacado: true,
  },
  {
    id: 4,
    titulo: 'Proyectos Estructurales',
    subtitulo: 'Estructuras de hormigón y acero',
    descripcion:
      'Colaboración en la elaboración de documentación técnica para proyectos estructurales: armaduras, encofrados y detalles constructivos. Revisión de planos y detección de interferencias previo al inicio de obra.',
    tags: ['AutoCAD', 'Estructuras', 'Armaduras', 'Detalles Constructivos'],
    destacado: false,
  },
]

export const experiencia = [
  {
    empresa: 'Proyecto Independiente / Consultoría Técnica',
    cargo: 'Delineante Técnica — AutoCAD',
    periodo: '2023 — Presente',
    descripcion:
      'Elaboración de planos técnicos para proyectos hidráulicos, de pavimentos y estructuras. Documentación técnica completa, coordinación con equipos de obra y generación de listados de materiales.',
    logros: [
      'Reducción de incompatibilidades en obra mediante revisión sistemática de planos',
      'Estandarización de planillas de cuantificación de materiales',
      'Gestión autónoma de documentación técnica de múltiples proyectos simultáneos',
    ],
  },
  {
    empresa: 'Formación Académica',
    cargo: 'Ingeniería Civil',
    periodo: '2018 — 2023',
    descripcion:
      'Desarrollo de competencias en diseño estructural, hidráulica, vialidad y gestión de obras. Aplicación práctica de AutoCAD en proyectos académicos de diversa escala.',
    logros: [
      'Dominio de AutoCAD aplicado a proyectos de ingeniería civil',
      'Formación en mediciones, presupuestos y planificación de obras',
      'Desarrollo de habilidades de interpretación de planos y detalles constructivos',
    ],
  },
]

export const competencias = [
  {
    icono: '⊡',
    titulo: 'AutoCAD Avanzado',
    descripcion:
      'Elaboración y modificación de planos para proyectos hidráulicos, viales, de fachadas y estructurales.',
  },
  {
    icono: '◫',
    titulo: 'Documentación Técnica',
    descripcion:
      'Generación y mantenimiento actualizado de toda la documentación técnica de obra: planos, libros de montaje y especificaciones.',
  },
  {
    icono: '◱',
    titulo: 'Medición y Cuantificación',
    descripcion:
      'Realización de mediciones, despieces, modulaciones y cuantificación de materiales para compras y producción.',
  },
  {
    icono: '◲',
    titulo: 'Revisión de Incompatibilidades',
    descripcion:
      'Detección y reporte de incompatibilidades en planos antes del inicio de obra, evitando sobrecostos y retrasos.',
  },
  {
    icono: '◳',
    titulo: 'Apoyo a Producción',
    descripcion:
      'Soporte técnico a equipos de montaje y producción mediante generación de listados de materiales y despieces detallados.',
  },
  {
    icono: '◰',
    titulo: 'Organización & Autonomía',
    descripcion:
      'Gestión independiente de múltiples proyectos con atención al detalle y capacidad de adaptación a distintos rubros.',
  },
]

export const marqueeItems = [
  'AutoCAD',
  'Fachadas Ventiladas',
  'Documentación Técnica',
  'Hidráulica',
  'SATE',
  'Pavimentos',
  'Despieces',
  'Modulaciones',
  'Cuantificación',
  'Estructuras',
  'HPL',
  'Fibrocemento',
  'Aluminio',
  'Presto',
  'Excel',
]
