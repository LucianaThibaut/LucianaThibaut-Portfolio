// Portfolio data — Luciana Thibaut, Ingeniera Civil. Fuente: CV (sept. 2026).

export const personal = {
  nombre: 'Luciana Thibaut',
  titulo: 'Ingeniera Civil',
  subtitulo: 'Gestión documental de proyectos de ingeniería',
  email: 'lucianathibaut@hotmail.com',
  telefono: '(011) 3957 5435',
  telefonoHref: 'tel:+541139575435',
  ubicacion: 'Ituzaingó, Buenos Aires',
  foto: '/luciana.jpg',
  resumen:
    'Soy ingeniera civil (UNLaM) y hace más de 4 años trabajo en documentación técnica de proyectos de ingeniería: planos, memorias de cálculo, informes y documentación de obra. Pasé por hidráulica, pavimentos e instalaciones contra incendio, en organismos públicos y en empresas privadas. Hoy actualizo el catastro de obras hidráulicas de la Ciudad de Buenos Aires en Soluciones Químicas.',
}

// Herramientas agrupadas como en el CV (sin porcentajes inventados)
export const herramientas = [
  {
    grupo: 'Diseño e ingeniería',
    items: ['AutoCAD', 'Autodesk Civil 3D', 'Robot Structural', 'RAM Elements', 'EPANET', 'FlowMaster', 'QGIS (básico)', 'Mathcad'],
  },
  {
    grupo: 'Gestión documental y datos',
    items: ['Excel avanzado', 'Power BI (en formación)', 'MS Project', 'SharePoint', 'Teams', 'Outlook'],
  },
  {
    grupo: 'Sistemas de gestión',
    items: ['ISO 9001', 'ISO 14001'],
  },
]

// `plano` elige el dibujo técnico de la tarjeta (ver Projects.jsx)
export const proyectos = [
  {
    id: 1,
    titulo: 'Catastro de obras hidráulicas',
    subtitulo: 'Ciudad de Buenos Aires · Soluciones Químicas S.A.',
    periodo: '2025 — actualidad',
    descripcion:
      'Actualización catastral de obras hidráulicas de CABA en CAD. Elaboración, control y actualización de planos a partir de relevamientos topográficos y documentación existente, asegurando orden y trazabilidad entre área técnica y obra.',
    tags: ['AutoCAD', 'Catastro', 'Relevamiento topográfico', 'Trazabilidad'],
    plano: 'catastro',
    rol: 'Analista de CAD',
    entregables: 'Planos catastrales, informes técnicos',
    destacado: true,
  },
  {
    id: 2,
    titulo: 'Redes de desagüe pluvial',
    subtitulo: 'Municipalidad de La Matanza · Dirección de Hidráulica',
    periodo: '2022 — 2025',
    descripcion:
      'Diseño y cálculo de redes de desagüe pluvial para obra pública. Elaboración de memorias de cálculo, informes técnicos y planos generales y de detalle.',
    tags: ['Hidráulica', 'Cálculo', 'Memorias', 'Planos de detalle'],
    plano: 'pluvial',
    rol: 'Proyecto y cálculo',
    entregables: 'Memorias de cálculo, planos generales y de detalle',
    destacado: true,
  },
  {
    id: 3,
    titulo: 'Pavimentos y dirección de obra',
    subtitulo: 'Municipalidad de La Matanza · Dirección de Pavimentos',
    periodo: '2022 — 2025',
    descripcion:
      'Planialtimetrías y planos de replanteo para obras de pavimento. Gestión de certificaciones, seguimiento de partes diarios y avance, inspecciones y visitas técnicas a obra.',
    tags: ['Planialtimetría', 'Replanteo', 'Certificaciones', 'Inspección'],
    plano: 'pavimento',
    rol: 'Proyecto y dirección de obra',
    entregables: 'Planialtimetrías, planos de replanteo, certificados',
  },
  {
    id: 4,
    titulo: 'Instalaciones contra incendio',
    subtitulo: 'Obras industriales · Damianich & Sons',
    periodo: '2022',
    descripcion:
      'Cálculo y diseño de instalaciones de incendio para plantas industriales. Memorias de cálculo, planos generales, vistas axonométricas y detalles constructivos, con relevamiento y asesoramiento al cliente.',
    tags: ['Incendio', 'Axonometrías', 'Detalles constructivos', 'Relevamiento'],
    plano: 'incendio',
    rol: 'Proyectista',
    entregables: 'Memoria de cálculo, planos, axonometrías, detalles',
  },
  {
    id: 5,
    titulo: 'Instalaciones y evacuación en edificios públicos',
    subtitulo: 'Ministerio de Agricultura, Ganadería y Pesca',
    periodo: '2019 — 2021',
    descripcion:
      'Planos estructurales y de instalaciones sanitarias, eléctricas, de incendio y gas. Análisis de evacuación de incendio con su documentación técnica, relevamientos y seguimiento de obras.',
    tags: ['Instalaciones', 'Evacuación', 'Estructuras', 'Informes'],
    plano: 'evacuacion',
    rol: 'Asistente técnica',
    entregables: 'Planos de instalaciones, análisis de evacuación, informes',
  },
]

export const experiencia = [
  {
    empresa: 'Soluciones Químicas S.A.',
    cargo: 'Analista de CAD',
    periodo: 'May 2025 — Actual',
    descripcion: 'Servicios de Ingeniería Hidráulica.',
    logros: [
      'Actualización catastral de obras hidráulicas de la Ciudad de Buenos Aires mediante documentación técnica en CAD',
      'Elaboración, control y actualización de planos técnicos a partir de relevamientos topográficos y documentación existente',
      'Generación y organización de documentación de apoyo e informes técnicos',
      'Nexo entre el área técnica y obra, asegurando el orden y la trazabilidad de la información',
    ],
  },
  {
    empresa: 'Municipalidad de La Matanza',
    cargo: 'Proyecto y Dirección de Obras Públicas',
    periodo: 'Sep 2022 — Abr 2025',
    descripcion: 'Dirección de Hidráulica, Dirección de Pavimentos y tareas generales de obra.',
    logros: [
      'Hidráulica: diseño y cálculo de redes de desagüe pluvial',
      'Hidráulica: memorias de cálculo, informes técnicos y planos generales y de detalle',
      'Pavimentos: planialtimetrías y planos de replanteo',
      'Gestión de certificaciones y documentación de obra',
      'Seguimiento de partes diarios, avances, inspecciones y visitas técnicas',
    ],
  },
  {
    empresa: 'Damianich & Sons',
    cargo: 'Proyectista',
    periodo: 'Ene 2022 — Ago 2022',
    descripcion: 'Área de Ingeniería.',
    logros: [
      'Cálculo y diseño de instalaciones de incendio para obras industriales',
      'Memorias de cálculo y documentación técnica',
      'Planos generales, vistas axonométricas y detalles constructivos',
      'Relevamientos técnicos y asesoramiento a clientes',
    ],
  },
  {
    empresa: 'Ministerio de Agricultura, Ganadería y Pesca',
    cargo: 'Asistente Técnica',
    periodo: 'Ago 2019 — Dic 2021',
    descripcion: 'Dirección Técnica Operativa.',
    logros: [
      'Planos estructurales y de instalaciones sanitarias, eléctricas, de incendio y gas',
      'Análisis de evacuación de incendio y documentación técnica asociada',
      'Relevamiento de estructuras e instalaciones',
      'Redacción de informes, planes de trabajo y seguimiento de obras',
    ],
  },
]

export const formacion = {
  titulo: 'Ingeniería Civil',
  institucion: 'Universidad Nacional de La Matanza',
  periodo: '2016 — 2025',
  promedio: '7,90',
}

export const datos = [
  { l: 'Inglés', v: 'B2 · Upper Intermediate' },
  { l: 'Licencia de conducir', v: 'B1' },
  { l: 'Disponibilidad para viajar', v: 'Sí' },
]

export const marqueeItems = [
  'AutoCAD',
  'Civil 3D',
  'Gestión documental',
  'Desagües pluviales',
  'Catastro hidráulico',
  'Memorias de cálculo',
  'Planialtimetrías',
  'Replanteo',
  'Instalaciones contra incendio',
  'EPANET',
  'FlowMaster',
  'Robot Structural',
  'SharePoint',
  'ISO 9001',
  'Excel avanzado',
]
