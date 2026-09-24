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

// Proyectos reales. Cada proyecto tiene una o más láminas (planos).
// Las imágenes viven en /public/planos: `img` para la vista en página,
// `full` en alta resolución para el visor con zoom.
export const proyectos = [
  {
    id: 'planta-industrial',
    titulo: 'Proyecto de planta industrial',
    contexto: 'Planta industrial',
    anio: '2026',
    resumen:
      'Tres planos de un mismo sector: el movimiento de suelo que define niveles y pendientes, las vigas de hormigón armado sobre las que circulan las grúas RTG y las fundaciones de las torres de iluminación, coordinadas con los pavimentos y las vigas.',
    rol: 'Desarrollo de planos',
    materiales: 'Hormigón H-30 · Acero ADN420',
    laminas: [
      {
        id: 'movimiento-de-suelo',
        titulo: 'Movimiento de suelo',
        descripcion:
          'Desarrollo de plano de movimiento de suelo, con definición de niveles, pendientes y geometría del sector. Representación mediante planta general y cortes longitudinales y transversales para definir la configuración altimétrica del proyecto.',
        specs: ['Planta general', 'Cortes longitudinales y transversales', 'Niveles y pendientes'],
        img: '/planos/01-movimiento-de-suelo.webp',
        full: '/planos/01-movimiento-de-suelo-full.webp',
        w: 1978, h: 922,
      },
      {
        id: 'vigas-rtg',
        titulo: 'Vigas RTG',
        descripcion:
          'Desarrollo de plano de armaduras y prearmado de vigas RTG de hormigón armado. Detalle de las distintas tipologías mediante vistas en planta y lateral, disposición de armaduras, empalmes, juntas de dilatación, cortes típicos y esquema general de distribución de prearmados.',
        specs: ['Hormigón H-30', 'Acero ADN420', 'Armaduras y prearmado', 'Juntas de dilatación'],
        img: '/planos/02-vigas-rtg.webp',
        full: '/planos/02-vigas-rtg-full.webp',
        w: 2000, h: 1616,
      },
      {
        id: 'fundaciones-torres',
        titulo: 'Fundaciones de torres de iluminación',
        descripcion:
          'Desarrollo de plano de fundaciones para torres de iluminación, incluyendo ubicación y replanteo de pilotes, definición de niveles de proyecto y detalle de la geometría de fundación. Coordinación de las fundaciones con los distintos niveles de pavimento y las vigas RTG del sector.',
        specs: ['Pilotes P1 Ø1,00 m', 'Hormigón H-30', 'Acero ADN420', 'Replanteo de pilotes'],
        img: '/planos/03-fundaciones-torres-iluminacion.webp',
        full: '/planos/03-fundaciones-torres-iluminacion-full.webp',
        w: 2000, h: 867,
      },
    ],
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
