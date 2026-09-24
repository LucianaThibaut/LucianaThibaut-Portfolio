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
    resumen:
      'Tres planos de un mismo sector: el movimiento de suelo que define niveles y pendientes, las vigas de hormigón armado sobre las que circulan las grúas RTG y las fundaciones de las torres de iluminación, coordinadas con los pavimentos y las vigas.',
    meta: [
      { l: 'Rol', v: 'Desarrollo de planos' },
      { l: 'Año', v: '2026' },
      { l: 'Materiales', v: 'Hormigón H-30 · Acero ADN420', full: true },
    ],
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
  {
    id: 'vivienda-unifamiliar',
    titulo: 'Vivienda unifamiliar',
    resumen: 'Proyecto académico realizado en 2020 dentro de la carrera de Ingeniería Civil de la UNLaM. Diseño y documentación completa de una vivienda de dos plantas con subsuelo: arquitectura, estructura de hormigón armado e instalaciones sanitaria, de gas, eléctrica y termomecánica. El programa incluye una sala de cine en el subsuelo; living, cocina-comedor, oficina y salón de música en planta baja; y tres dormitorios con play-room en el primer piso.',
    meta: [
      {
        l: 'Tipo',
        v: 'Proyecto académico · UNLaM'
      },
      {
        l: 'Año',
        v: '2020'
      },
      {
        l: 'Alcance',
        v: 'Arquitectura, estructura e instalaciones',
        full: true
      }
    ],
    grupos: [
      {
        id: 'arquitectura',
        titulo: 'Arquitectura',
        descripcion: 'Plantas de subsuelo, planta baja, primer piso y azotea, cortes A-A y B-B y vistas de frente, contrafrente y laterales. Definición de locales, circulaciones, niveles y aberturas.',
        specs: [
          'Plantas, cortes y vistas',
          'Escalas 1:70 a 1:150'
        ],
        laminas: [
          {
            id: '01-arq-subsuelo',
            titulo: 'Subsuelo',
            img: '/planos/vivienda/01-arq-subsuelo.webp',
            full: '/planos/vivienda/01-arq-subsuelo-full.webp',
            w: 1348,
            h: 996
          },
          {
            id: '02-arq-planta-baja',
            titulo: 'Planta baja',
            img: '/planos/vivienda/02-arq-planta-baja.webp',
            full: '/planos/vivienda/02-arq-planta-baja-full.webp',
            w: 1096,
            h: 1804
          },
          {
            id: '03-arq-primer-piso',
            titulo: 'Primer piso',
            img: '/planos/vivienda/03-arq-primer-piso.webp',
            full: '/planos/vivienda/03-arq-primer-piso-full.webp',
            w: 1400,
            h: 1804
          },
          {
            id: '04-arq-azotea',
            titulo: 'Azotea',
            img: '/planos/vivienda/04-arq-azotea.webp',
            full: '/planos/vivienda/04-arq-azotea-full.webp',
            w: 1400,
            h: 1804
          },
          {
            id: '05-arq-corte-aa',
            titulo: 'Corte A-A',
            img: '/planos/vivienda/05-arq-corte-aa.webp',
            full: '/planos/vivienda/05-arq-corte-aa-full.webp',
            w: 1400,
            h: 1002
          },
          {
            id: '06-arq-corte-bb',
            titulo: 'Corte B-B',
            img: '/planos/vivienda/06-arq-corte-bb.webp',
            full: '/planos/vivienda/06-arq-corte-bb-full.webp',
            w: 1400,
            h: 1048
          },
          {
            id: '07-arq-vista-frente',
            titulo: 'Vista de frente',
            img: '/planos/vivienda/07-arq-vista-frente.webp',
            full: '/planos/vivienda/07-arq-vista-frente-full.webp',
            w: 1999,
            h: 994
          },
          {
            id: '08-arq-vista-contrafrente',
            titulo: 'Vista de contrafrente',
            img: '/planos/vivienda/08-arq-vista-contrafrente.webp',
            full: '/planos/vivienda/08-arq-vista-contrafrente-full.webp',
            w: 1582,
            h: 1010
          },
          {
            id: '09-arq-vistas-laterales',
            titulo: 'Vistas laterales',
            img: '/planos/vivienda/09-arq-vistas-laterales.webp',
            full: '/planos/vivienda/09-arq-vistas-laterales-full.webp',
            w: 1999,
            h: 1476
          }
        ]
      },
      {
        id: 'estructura',
        titulo: 'Estructura',
        descripcion: 'Plantas de estructura de hormigón armado bajo subsuelo, sobre subsuelo, sobre planta baja y sobre primer piso: fundaciones, columnas, vigas y losas con su dimensionado.',
        specs: [
          'Hormigón armado',
          'Losas de 12 cm',
          'Escala 1:100'
        ],
        laminas: [
          {
            id: '10-est-bajo-subsuelo',
            titulo: 'Bajo subsuelo',
            img: '/planos/vivienda/10-est-bajo-subsuelo.webp',
            full: '/planos/vivienda/10-est-bajo-subsuelo-full.webp',
            w: 708,
            h: 646
          },
          {
            id: '11-est-sobre-subsuelo',
            titulo: 'Sobre subsuelo',
            img: '/planos/vivienda/11-est-sobre-subsuelo.webp',
            full: '/planos/vivienda/11-est-sobre-subsuelo-full.webp',
            w: 1148,
            h: 1226
          },
          {
            id: '12-est-sobre-planta-baja',
            titulo: 'Sobre planta baja',
            img: '/planos/vivienda/12-est-sobre-planta-baja.webp',
            full: '/planos/vivienda/12-est-sobre-planta-baja-full.webp',
            w: 1004,
            h: 1146
          },
          {
            id: '13-est-sobre-primer-piso',
            titulo: 'Sobre primer piso',
            img: '/planos/vivienda/13-est-sobre-primer-piso.webp',
            full: '/planos/vivienda/13-est-sobre-primer-piso-full.webp',
            w: 1004,
            h: 1108
          }
        ]
      },
      {
        id: 'sanitaria',
        titulo: 'Sanitaria',
        descripcion: 'Instalación sanitaria y de agua por planta: desagües cloacales y pluviales, provisión de agua fría y caliente, tanque de reserva y equipo de bombeo desde el subsuelo.',
        specs: [
          'Tanque de reserva 1000 l',
          'Tanque de bombeo 700 l',
          'Pluviales con embudos 25×25 cm'
        ],
        laminas: [
          {
            id: '14-san-subsuelo',
            titulo: 'Subsuelo',
            img: '/planos/vivienda/14-san-subsuelo.webp',
            full: '/planos/vivienda/14-san-subsuelo-full.webp',
            w: 1286,
            h: 1218
          },
          {
            id: '15-san-planta-baja',
            titulo: 'Planta baja',
            img: '/planos/vivienda/15-san-planta-baja.webp',
            full: '/planos/vivienda/15-san-planta-baja-full.webp',
            w: 980,
            h: 1797
          },
          {
            id: '16-san-primer-piso',
            titulo: 'Primer piso',
            img: '/planos/vivienda/16-san-primer-piso.webp',
            full: '/planos/vivienda/16-san-primer-piso-full.webp',
            w: 1400,
            h: 1804
          },
          {
            id: '17-san-azotea',
            titulo: 'Azotea',
            img: '/planos/vivienda/17-san-azotea.webp',
            full: '/planos/vivienda/17-san-azotea-full.webp',
            w: 1400,
            h: 1804
          }
        ]
      },
      {
        id: 'gas',
        titulo: 'Gas',
        descripcion: 'Instalación de gas en planta baja con el recorrido de la cañería y los artefactos conectados.',
        specs: [
          'Planta baja',
          'Escala 1:100'
        ],
        laminas: [
          {
            id: '18-gas-planta-baja',
            titulo: 'Planta baja',
            img: '/planos/vivienda/18-gas-planta-baja.webp',
            full: '/planos/vivienda/18-gas-planta-baja-full.webp',
            w: 1400,
            h: 1804
          }
        ]
      },
      {
        id: 'electrica',
        titulo: 'Eléctrica',
        descripcion: 'Instalación eléctrica en subsuelo, planta baja y primer piso, en dos juegos de planos: luminarias y tomacorrientes, con circuitos, secciones de conductores y cañerías.',
        specs: [
          'Luminarias y tomacorrientes',
          'Conductores de 1,5 a 10 mm²'
        ],
        laminas: [
          {
            id: '19-ele-luminarias-subsuelo',
            titulo: 'Luminarias · Subsuelo',
            img: '/planos/vivienda/19-ele-luminarias-subsuelo.webp',
            full: '/planos/vivienda/19-ele-luminarias-subsuelo-full.webp',
            w: 1286,
            h: 876
          },
          {
            id: '20-ele-luminarias-planta-baja',
            titulo: 'Luminarias · Planta baja',
            img: '/planos/vivienda/20-ele-luminarias-planta-baja.webp',
            full: '/planos/vivienda/20-ele-luminarias-planta-baja-full.webp',
            w: 980,
            h: 1801
          },
          {
            id: '21-ele-luminarias-primer-piso',
            titulo: 'Luminarias · Primer piso',
            img: '/planos/vivienda/21-ele-luminarias-primer-piso.webp',
            full: '/planos/vivienda/21-ele-luminarias-primer-piso-full.webp',
            w: 1400,
            h: 1804
          },
          {
            id: '22-ele-tomas-subsuelo',
            titulo: 'Tomacorrientes · Subsuelo',
            img: '/planos/vivienda/22-ele-tomas-subsuelo.webp',
            full: '/planos/vivienda/22-ele-tomas-subsuelo-full.webp',
            w: 1286,
            h: 1207
          },
          {
            id: '23-ele-tomas-planta-baja',
            titulo: 'Tomacorrientes · Planta baja',
            img: '/planos/vivienda/23-ele-tomas-planta-baja.webp',
            full: '/planos/vivienda/23-ele-tomas-planta-baja-full.webp',
            w: 978,
            h: 1793
          },
          {
            id: '24-ele-tomas-primer-piso',
            titulo: 'Tomacorrientes · Primer piso',
            img: '/planos/vivienda/24-ele-tomas-primer-piso.webp',
            full: '/planos/vivienda/24-ele-tomas-primer-piso-full.webp',
            w: 1400,
            h: 1804
          }
        ]
      },
      {
        id: 'termomecanica',
        titulo: 'Termomecánica',
        descripcion: 'Climatización con equipos de aire acondicionado: ubicación de unidades interiores y exteriores y recorrido de cañerías en planta baja, primer piso y azotea.',
        specs: [
          'Aire acondicionado',
          'Unidades interiores y exteriores'
        ],
        laminas: [
          {
            id: '25-termo-planta-baja',
            titulo: 'Planta baja',
            img: '/planos/vivienda/25-termo-planta-baja.webp',
            full: '/planos/vivienda/25-termo-planta-baja-full.webp',
            w: 1314,
            h: 1804
          },
          {
            id: '26-termo-primer-piso',
            titulo: 'Primer piso',
            img: '/planos/vivienda/26-termo-primer-piso.webp',
            full: '/planos/vivienda/26-termo-primer-piso-full.webp',
            w: 1400,
            h: 1804
          },
          {
            id: '27-termo-azotea',
            titulo: 'Azotea',
            img: '/planos/vivienda/27-termo-azotea.webp',
            full: '/planos/vivienda/27-termo-azotea-full.webp',
            w: 1400,
            h: 1804
          }
        ]
      }
    ]
  },
  {
    id: 'peatonal-san-justo',
    titulo: 'Peatonal de Plaza de San Justo',
    resumen: 'Proyecto del Municipio de La Matanza para la peatonal de la plaza de San Justo, sobre las calles Irigoyen y T. J. Villegas, entre Dr. I. Arieta y Almafuerte. Incluye las planialtimetrías de las canaletas pluviales, con conductos de Ø600 y Ø500 mm y pendiente de 2 ‰, y el perfil tipo del nuevo pavimento de hormigón simple H30.',
    meta: [
      {
        l: 'Comitente',
        v: 'Municipio de La Matanza'
      },
      {
        l: 'Ubicación',
        v: 'San Justo, La Matanza'
      },
      {
        l: 'Alcance',
        v: 'Canaletas pluviales y pavimento de hormigón',
        full: true
      }
    ],
    laminas: [
      {
        id: '01-canaleta-villegas',
        titulo: 'Canaleta T. J. Villegas',
        descripcion: 'Planialtimetría de la canaleta sobre T. J. Villegas, entre Dr. I. Arieta y Almafuerte. Traza en planta del conducto proyectado de Ø600 mm con sus sumideros y cámaras de enlace, y perfil longitudinal con cotas de terreno, extradós y fondo de caño, tapadas y pendiente.',
        specs: [
          'Conducto Ø600 mm',
          'Pendiente 2 ‰',
          'Esc. H 1:500 · V 1:50'
        ],
        img: '/planos/peatonal/01-canaleta-villegas.webp',
        full: '/planos/peatonal/01-canaleta-villegas-full.webp',
        w: 2000,
        h: 1178
      },
      {
        id: '02-canaleta-irigoyen-600',
        titulo: 'Canaleta Irigoyen',
        descripcion: 'Planialtimetría de la canaleta sobre Irigoyen, del lado de la plaza, con conducto proyectado de Ø600 mm, sumideros y cámaras de enlace. Perfil longitudinal con progresivas, cotas de pavimento y de fondo de caño, tapadas y pendientes.',
        specs: [
          'Conducto Ø600 mm',
          'Pendiente 2 ‰',
          'Progresivas y tapadas'
        ],
        img: '/planos/peatonal/02-canaleta-irigoyen-600.webp',
        full: '/planos/peatonal/02-canaleta-irigoyen-600-full.webp',
        w: 2000,
        h: 1250
      },
      {
        id: '03-canaleta-irigoyen-600-500',
        titulo: 'Canaleta Irigoyen · variante',
        descripcion: 'Variante de la canaleta sobre Irigoyen en la que los últimos tramos se resuelven con conducto de Ø500 mm. Planta con la traza y los sumideros a desplazar, y perfil longitudinal con cotas, tapadas y pendientes.',
        specs: [
          'Conductos Ø600 y Ø500 mm',
          'Pendiente 2 ‰'
        ],
        img: '/planos/peatonal/03-canaleta-irigoyen-600-500.webp',
        full: '/planos/peatonal/03-canaleta-irigoyen-600-500-full.webp',
        w: 2000,
        h: 1250
      },
      {
        id: '04-canaleta-irigoyen-traza',
        titulo: 'Canaleta Irigoyen · traza alternativa',
        descripcion: 'Planialtimetría de la canaleta sobre Irigoyen con conducto de Ø600 mm hasta Almafuerte y continuación en Ø500 mm por el cruce. Planta de la traza y perfil longitudinal con progresivas, cotas y tapadas.',
        specs: [
          'Conductos Ø600 y Ø500 mm',
          'Pendiente 2 ‰'
        ],
        img: '/planos/peatonal/04-canaleta-irigoyen-traza.webp',
        full: '/planos/peatonal/04-canaleta-irigoyen-traza-full.webp',
        w: 2000,
        h: 1250
      },
      {
        id: '05-perfil-tipo-pavimento',
        titulo: 'Perfil tipo del pavimento',
        descripcion: 'Perfil tipo del pavimento de hormigón simple H30 de 11,00 m de ancho, construido sobre la base de adoquines existentes, con sub-base de suelo seleccionado de 0,20 m y canaletas laterales de 0,60 m de ancho.',
        specs: [
          'Hormigón simple H30',
          'Malla Q524',
          'Ancho 11,00 m',
          'Canaletas de 0,60 m'
        ],
        img: '/planos/peatonal/05-perfil-tipo-pavimento.webp',
        full: '/planos/peatonal/05-perfil-tipo-pavimento-full.webp',
        w: 1802,
        h: 1134
      }
    ]
  },
  {
    id: 'calles-a-pavimentar',
    titulo: 'Planialtimetrías de calles a pavimentar',
    resumen:
      'Proyectos de pavimentación desarrollados para el Municipio de La Matanza en la localidad de Isidro Casanova (2023–2024). Reúne tres proyectos viales sobre las calles Tornquist, Bartolomé de las Casas y D. Alighieri, con la definición geométrica en planta, el perfil longitudinal con pendientes de escurrimiento, cotas de rasante y terreno natural, vinculación altimétrica a puntos fijos y relevamiento de niveles de umbrales en línea municipal.',
    meta: [
      { l: 'Comitente', v: 'Municipio de La Matanza' },
      { l: 'Período', v: '2023 — 2024' },
      { l: 'Ubicación', v: 'Isidro Casanova, La Matanza' },
      { l: 'Alcance', v: 'Planialtimetría, rasante, desagües y umbrales', full: true },
    ],
    laminas: [
      {
        id: '01-tornquist',
        titulo: 'Calle Tornquist',
        descripcion:
          'Planialtimetría para la pavimentación de la calle Tornquist, entre Pedro Ferré y Vogel. Traza en planta con bocacalles, cámaras de enlace y sumideros proyectados S2 (a construir y a reemplazar con hoya). Perfil longitudinal con cotas de terreno y proyecto, progresivas, pendientes de 2,8 ‰ a 10,3 ‰ y verificación de cotas de umbrales sobre línea municipal en ambos márgenes.',
        specs: [
          'Tramo: Pedro Ferré a Vogel',
          'Pendientes 2,8 ‰ a 10,3 ‰',
          'Sumideros S2 y cámaras de enlace',
          'Esc. H 1:500 · V 1:50',
          'Control de umbrales L.M.',
        ],
        img: '/planos/pavimentos/01-tornquist.webp',
        full: '/planos/pavimentos/01-tornquist-full.webp',
        w: 2200,
        h: 712,
      },
      {
        id: '02-bartolome-de-las-casas',
        titulo: 'Calle Bartolomé de las Casas',
        descripcion:
          'Planialtimetría para la pavimentación de Bartolomé de las Casas, entre Tomás A. Edison y Tornquist (cruzando Elías Bedoya y Hertz). Traza en planta con empalmes a pavimentos existentes y proyectados. Perfil longitudinal con progresivas, cotas de pavimento y terreno, pendientes de 2,00 ‰ a 7,05 ‰, plano de comparación a 24,00 m y relevamiento de niveles de umbrales.',
        specs: [
          'Tramo: Tomás A. Edison a Tornquist',
          'Pendientes 2,00 ‰ a 7,05 ‰',
          'Empalmes en bocacalles',
          'Esc. H 1:500 · V 1:50',
          'Control de umbrales L.M.',
        ],
        img: '/planos/pavimentos/02-bartolome-de-las-casas.webp',
        full: '/planos/pavimentos/02-bartolome-de-las-casas-full.webp',
        w: 2200,
        h: 875,
      },
      {
        id: '03-d-alighieri',
        titulo: 'Calle D. Alighieri',
        descripcion:
          'Planialtimetría para la pavimentación de la calle D. Alighieri, entre B. de las Casas y Fracción. Traza en planta vinculada al conducto circular de Ø800 mm existente y perfil longitudinal con plano de comparación a 24,00 m, pendientes de 5,17 ‰ y 17,6 ‰, vinculación a punto fijo auxiliar (P.F. Cota 25,865) y cotas de umbrales.',
        specs: [
          'Tramo: B. de las Casas a Fracción',
          'Pendientes 5,17 ‰ y 17,6 ‰',
          'Punto fijo P.F. Cota 25,865',
          'Esc. H 1:500 · V 1:50',
          'Conexión pluvial Ø800',
        ],
        img: '/planos/pavimentos/03-d-alighieri.webp',
        full: '/planos/pavimentos/03-d-alighieri-full.webp',
        w: 2200,
        h: 1649,
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
