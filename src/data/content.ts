export type Language = 'pt' | 'en' | 'es';

export const languages: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

export const projectSlugs = ['app-remaza', 'fresto', 'moto-remaza', 'gamp21', 'daitan', 'consorcio-remaza'];

const sharedImages = {
  projects: [
    '/assets/projeto-01-appremaza.webp',
    '/assets/projeto-02-fresto.webp',
    '/assets/projeto-03-motoremaza.webp',
    '/assets/projeto-04-gamp21.webp',
    '/assets/projeto-05-daitan.webp',
    '/assets/projeto-06-remaza.webp',
  ],
  services: [
    '/assets/servicos-1-uxui.png',
    '/assets/servicos-2-sites.png',
    '/assets/servicos-3-diagnostico.png',
    '/assets/servicos-4-consultoria.png',
  ],
};

export const dictionary = {
  pt: {
    navItems: ['Home', 'Projetos', 'Serviços', 'Sobre'],
    actions: {
      talk: 'Fale comigo',
      letsTalk: 'Vamos conversar',
      downloadCv: 'Download CV',
      viewProjects: 'Ver projetos',
      schedule: 'Agendar conversa',
      viewCreature: 'Ver criatura',
      light: 'Claro',
      dark: 'Escuro',
      languageLabel: 'Selecionar idioma',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    projectPage: {
      back: 'Voltar para projetos',
      eyebrow: 'Case em construção',
      overview: 'Visão geral',
      challenge: 'Desafio',
      role: 'Meu papel',
      decisions: 'Decisões de experiência',
      next: 'Próximos passos',
      overviewText:
        'Esta página será transformada em um storytelling completo do projeto, conectando contexto, problema, decisões e aprendizados.',
      challengeText:
        'O foco será mostrar o que estava em jogo, quais barreiras precisavam ser resolvidas e como a experiência foi estruturada para gerar clareza.',
      roleText:
        'Atuação em UX, organização de jornadas, arquitetura de informação, prototipação e alinhamento entre objetivos de negócio e necessidades das pessoas usuárias.',
      decisionsText:
        'A narrativa vai destacar escolhas de navegação, hierarquia, conteúdo, fluxos e critérios que ajudaram o produto a ficar mais simples de entender e evoluir.',
      nextText:
        'Em breve este case receberá imagens, bastidores, processo e resultados de forma mais imersiva.',
    },
    hero: {
      eyebrow: 'Consultoria em UX e Product Design',
      titleLine1: 'Clareza para decidir.',
      titleLine2: 'Estrutura para evoluir.',
      text: 'Jornadas mais claras, processos mais eficientes e produtos digitais preparados para evoluir.',
      imageAlt: 'Ilustração abstrata conectando clareza, fluxos, métricas e experiência digital',
    },
    benefits: [
      {
        title: 'Foco estratégico',
        text: 'Alinhamento entre negócio, usuário e produto.',
      },
      {
        title: 'Estrutura e método',
        text: 'Processos claros para decisões melhores e mais rápidas.',
      },
      {
        title: 'Experiência que escala',
        text: 'Soluções consistentes que crescem com o produto.',
      },
      {
        title: 'Impacto real',
        text: 'Menos atrito, mais eficiência e resultados sustentáveis.',
      },
    ],
    projectsIntro: {
      eyebrow: 'Projetos',
      title: 'Criações e Criaturas',
      line1: 'Algumas nasceram de uma ideia. Outras de uma necessidade.',
      line2: 'Todas começaram com uma pergunta que precisava ser respondida.',
    },
    projects: [
      {
        title: 'App Remaza',
        tags: ['Plataforma digital', 'Experiência do Cliente', 'Serviços Financeiros'],
        description:
          'De pagamentos a assembleias e informações de cota e atendimento, o desafio era transformar processos dispersos em uma experiência mais simples, acessível e organizada para milhares de clientes.',
        image: sharedImages.projects[0],
      },
      {
        title: 'Fresto',
        tags: ['Experiência Digital', 'Gastronomia', 'Site Institucional'],
        description:
          'O objetivo era traduzir a personalidade do restaurante para o ambiente digital, valorizando seus produtos, unidades e canais de contato em uma experiência tão convidativa quanto uma visita ao salão.',
        image: sharedImages.projects[1],
      },
      {
        title: 'Moto Remaza',
        tags: ['E-commerce', 'Experiência de Compra', 'Mobilidade'],
        description:
          'Entre modelos, serviços, acessórios e conteúdo, o projeto organizou diferentes jornadas em uma única plataforma, tornando a experiência mais clara para quem está pesquisando, comparando ou planejando sua próxima moto.',
        image: sharedImages.projects[2],
      },
      {
        title: 'Gamp21',
        tags: ['Conteúdo Digital', 'Educação', 'Acolhimento'],
        description:
          'O projeto nasceu para apoiar mães, pais e cuidadores com conteúdo acessível sobre gestação, infância e desenvolvimento, aproximando conhecimento especializado de quem mais precisa dele.',
        image: sharedImages.projects[3],
      },
      {
        title: 'Daitan',
        tags: ['Captação Digital', 'Automotivo', 'Conversão'],
        description:
          'Mais do que exibir veículos, o desafio era criar uma experiência capaz de apoiar a descoberta, comparação e escolha do próximo Honda de forma simples e intuitiva.',
        image: sharedImages.projects[4],
      },
      {
        title: 'Consórcio Remaza',
        tags: ['Captação Digital', 'Geração de Leads', 'Serviços Financeiros'],
        description:
          'O projeto foi desenvolvido para aproximar pessoas do sonho do imóvel, automóvel ou motocicleta própria, explicando o funcionamento do consórcio e reduzindo barreiras de entendimento ao longo da jornada.',
        image: sharedImages.projects[5],
      },
    ],
    servicesIntro: {
      eyebrow: 'Serviços · UX estratégico',
      title: 'Como posso ajudar',
      text: 'Transformo desafios de experiência em produtos digitais mais claros, eficientes e alinhados aos objetivos do negócio.',
      note: 'Experiência aplicada em produtos digitais, plataformas de serviços, e-commerce e sistemas corporativos.',
    },
    services: [
      {
        title: 'UX/UI para Produtos Digitais',
        text: 'Interfaces, protótipos, design systems e produtos digitais.',
        image: sharedImages.services[0],
      },
      {
        title: 'Sites e Landing pages',
        text: 'Institucionais, campanhas, geração de leads e conversão.',
        image: sharedImages.services[1],
      },
      {
        title: 'Diagnóstico de Experiência',
        text: 'Análise de produtos existentes e identificação de oportunidades.',
        image: sharedImages.services[2],
      },
      {
        title: 'Consultoria e Evolução',
        text: 'Acompanhamento, melhorias e direcionamento estratégico.',
        image: sharedImages.services[3],
      },
    ],
    about: {
      eyebrow: 'Sobre',
      titleLine1: 'Mais de 20 anos aprendendo',
      titleLine2: 'a resolver problemas',
      textStart:
        'Desde 2003, participo da criação de marcas, sites, plataformas, sistemas corporativos e produtos digitais. Com o tempo, o foco deixou de ser apenas desenhar interfaces e passou a ser ',
      textStrong: 'compreender problemas, conectar pessoas e transformar objetivos de negócio em experiências mais claras.',
      portraitAlt: 'Foto de Fabio Lopes',
      timelineTitle: 'Experiência construída na prática',
      lessonsTitle: 'O que essa jornada me ensinou',
      areasTitle: 'Áreas de atuação',
    },
    timeline: [
      ['2003', 'Design Gráfico', 'Marcas, comunicação visual e materiais impressos.'],
      ['2008', 'Web Design', 'Sites institucionais, interfaces e presença digital.'],
      [
        '2014',
        'Experiência Digital',
        'Evolução do foco visual para a criação de experiências digitais orientadas a usabilidade, conversão e clareza.',
      ],
      ['2017', 'UX Design', 'Fluxos, jornadas, pesquisa, arquitetura e prototipação.'],
      ['2020', 'Product Design', 'Produtos digitais, sistemas complexos e colaboração com tecnologia.'],
      ['2026', 'Estratégia & Consultoria', 'Diagnóstico, clareza, melhoria de experiência e visão de produto.'],
    ],
    lessons: [
      {
        number: '01',
        title: 'Visão de negócio',
        text: 'Antes da interface existem objetivos, processos, pessoas e indicadores.',
      },
      {
        number: '02',
        title: 'Produtos complexos',
        text: 'Experiência em SaaS, supply chain, consórcios, e-commerce e autoatendimento.',
      },
      {
        number: '03',
        title: 'Trabalho colaborativo',
        text: 'Alinhamento entre produto, tecnologia, operação, marketing, vendas e usuários.',
      },
    ],
    areas: [
      'UX Design',
      'Product Design',
      'Discovery',
      'Pesquisa',
      'Arquitetura da Informação',
      'Design Systems',
      'Prototipação',
      'Branding',
      'Estratégia de Produto',
      'Marketing Digital',
    ],
    footer: {
      headline: 'Grandes produtos não nascem de telas.',
      text: 'Nascem da compreensão dos problemas certos. Vamos conversar sobre seu produto, processo ou experiência digital?',
      copyright: 'Fabio Lopes UX & Product Designer © 2026. Todos os direitos reservados.',
    },
    contact: {
      title: 'Vamos juntos?',
      text: 'Conte como posso te ajudar na sua jornada:',
      name: 'Nome completo *',
      email: 'E-mail *',
      phone: 'Telefone *',
      message: 'Do que você precisa?',
      submit: 'Enviar mensagem',
      sending: 'Enviando...',
      close: 'Fechar formulário',
      open: 'Abrir formulário de contato',
      top: 'Voltar ao topo',
      subject: 'Novo contato pelo site Fabio Lopes',
      successTitle: 'Mensagem enviada com sucesso!',
      successText: 'Entrarei em contato em breve.',
      fallbackTitle: 'Abrindo WhatsApp.',
      fallbackText: 'Revise a mensagem preenchida e envie por lá.',
      errorTitle: 'Não foi possível enviar sua mensagem.',
      errorText: 'Tente novamente daqui a pouco.',
      infoTitle: 'Informação disponível.',
      infoText: 'As informações serão preparadas para envio pelo WhatsApp.',
    },
  },
  en: {
    navItems: ['Home', 'Projects', 'Services', 'About'],
    actions: {
      talk: 'Contact me',
      letsTalk: "Let's talk",
      downloadCv: 'Download CV',
      viewProjects: 'View projects',
      schedule: 'Schedule a call',
      viewCreature: 'View creature',
      light: 'Light',
      dark: 'Dark',
      languageLabel: 'Select language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    projectPage: {
      back: 'Back to projects',
      eyebrow: 'Case in progress',
      overview: 'Overview',
      challenge: 'Challenge',
      role: 'My role',
      decisions: 'Experience decisions',
      next: 'Next steps',
      overviewText:
        'This page will become a complete project storytelling experience, connecting context, problem, decisions and learnings.',
      challengeText:
        'The focus will be to show what was at stake, which barriers needed to be solved and how the experience was structured to create clarity.',
      roleText:
        'Work across UX, journey organization, information architecture, prototyping and alignment between business goals and user needs.',
      decisionsText:
        'The narrative will highlight navigation, hierarchy, content, flows and criteria that helped make the product easier to understand and evolve.',
      nextText:
        'Soon this case will receive images, behind-the-scenes process and results in a more immersive way.',
    },
    hero: {
      eyebrow: 'UX and Product Design Consulting',
      titleLine1: 'Clarity to decide.',
      titleLine2: 'Structure to evolve.',
      text: 'Clearer journeys, more efficient processes and digital products prepared to evolve.',
      imageAlt: 'Abstract illustration connecting clarity, flows, metrics and digital experience',
    },
    benefits: [
      {
        title: 'Strategic focus',
        text: 'Alignment between business, users and product.',
      },
      {
        title: 'Structure and method',
        text: 'Clear processes for better and faster decisions.',
      },
      {
        title: 'Experience that scales',
        text: 'Consistent solutions that grow with the product.',
      },
      {
        title: 'Real impact',
        text: 'Less friction, more efficiency and sustainable results.',
      },
    ],
    projectsIntro: {
      eyebrow: 'Projects',
      title: 'Creations and Creatures',
      line1: 'Some were born from an idea. Others from a need.',
      line2: 'All started with a question that needed an answer.',
    },
    projects: [
      {
        title: 'App Remaza',
        tags: ['Digital platform', 'Customer Experience', 'Financial Services'],
        description:
          'From payments to assemblies, quota information and support, the challenge was to turn scattered processes into a simpler, more accessible and organized experience for thousands of customers.',
        image: sharedImages.projects[0],
      },
      {
        title: 'Fresto',
        tags: ['Digital Experience', 'Food', 'Institutional Website'],
        description:
          'The goal was to translate the restaurant personality into the digital environment, highlighting products, locations and contact channels in an experience as inviting as a visit.',
        image: sharedImages.projects[1],
      },
      {
        title: 'Moto Remaza',
        tags: ['E-commerce', 'Purchase Experience', 'Mobility'],
        description:
          'Among models, services, accessories and content, the project organized different journeys into one platform, making the experience clearer for people researching, comparing or planning their next motorcycle.',
        image: sharedImages.projects[2],
      },
      {
        title: 'Gamp21',
        tags: ['Digital Content', 'Education', 'Care'],
        description:
          'The project was created to support mothers, fathers and caregivers with accessible content about pregnancy, childhood and development, bringing specialized knowledge closer to those who need it.',
        image: sharedImages.projects[3],
      },
      {
        title: 'Daitan',
        tags: ['Digital Acquisition', 'Automotive', 'Conversion'],
        description:
          'More than displaying vehicles, the challenge was to create an experience that supports discovery, comparison and choice of the next Honda in a simple and intuitive way.',
        image: sharedImages.projects[4],
      },
      {
        title: 'Consórcio Remaza',
        tags: ['Digital Acquisition', 'Lead Generation', 'Financial Services'],
        description:
          'The project was designed to bring people closer to owning a home, car or motorcycle, explaining how consortium plans work and reducing understanding barriers along the journey.',
        image: sharedImages.projects[5],
      },
    ],
    servicesIntro: {
      eyebrow: 'Services · Strategic UX',
      title: 'How I can help',
      text: 'I turn experience challenges into clearer, more efficient digital products aligned with business goals.',
      note: 'Experience applied to digital products, service platforms, e-commerce and corporate systems.',
    },
    services: [
      {
        title: 'UX/UI for Digital Products',
        text: 'Interfaces, prototypes, design systems and digital products.',
        image: sharedImages.services[0],
      },
      {
        title: 'Websites and Landing pages',
        text: 'Institutional websites, campaigns, lead generation and conversion.',
        image: sharedImages.services[1],
      },
      {
        title: 'Experience Diagnosis',
        text: 'Analysis of existing products and identification of opportunities.',
        image: sharedImages.services[2],
      },
      {
        title: 'Consulting and Evolution',
        text: 'Ongoing support, improvements and strategic direction.',
        image: sharedImages.services[3],
      },
    ],
    about: {
      eyebrow: 'About',
      titleLine1: 'More than 20 years learning',
      titleLine2: 'how to solve problems',
      textStart:
        'Since 2003, I have helped create brands, websites, platforms, corporate systems and digital products. Over time, the focus moved beyond designing interfaces and became about ',
      textStrong: 'understanding problems, connecting people and turning business goals into clearer experiences.',
      portraitAlt: 'Photo of Fabio Lopes',
      timelineTitle: 'Experience built in practice',
      lessonsTitle: 'What this journey taught me',
      areasTitle: 'Areas of expertise',
    },
    timeline: [
      ['2003', 'Graphic Design', 'Brands, visual communication and printed materials.'],
      ['2008', 'Web Design', 'Institutional websites, interfaces and digital presence.'],
      [
        '2014',
        'Digital Experience',
        'Evolution from a visual focus to creating digital experiences oriented to usability, conversion and clarity.',
      ],
      ['2017', 'UX Design', 'Flows, journeys, research, architecture and prototyping.'],
      ['2020', 'Product Design', 'Digital products, complex systems and collaboration with technology.'],
      ['2026', 'Strategy & Consulting', 'Diagnosis, clarity, experience improvement and product vision.'],
    ],
    lessons: [
      {
        number: '01',
        title: 'Business vision',
        text: 'Before the interface there are goals, processes, people and indicators.',
      },
      {
        number: '02',
        title: 'Complex products',
        text: 'Experience in SaaS, supply chain, consortium plans, e-commerce and self-service.',
      },
      {
        number: '03',
        title: 'Collaborative work',
        text: 'Alignment between product, technology, operations, marketing, sales and users.',
      },
    ],
    areas: [
      'UX Design',
      'Product Design',
      'Discovery',
      'Research',
      'Information Architecture',
      'Design Systems',
      'Prototyping',
      'Branding',
      'Product Strategy',
      'Digital Marketing',
    ],
    footer: {
      headline: 'Great products are not born from screens.',
      text: 'They are born from understanding the right problems. Let’s talk about your product, process or digital experience?',
      copyright: 'Fabio Lopes UX & Product Designer © 2026. All rights reserved.',
    },
    contact: {
      title: 'Shall we build together?',
      text: 'Tell me how I can help your journey:',
      name: 'Full name *',
      email: 'E-mail *',
      phone: 'Phone *',
      message: 'What do you need?',
      submit: 'Send message',
      sending: 'Sending...',
      close: 'Close form',
      open: 'Open contact form',
      top: 'Back to top',
      subject: 'New contact from Fabio Lopes website',
      successTitle: 'Message sent successfully!',
      successText: 'I will get in touch soon.',
      fallbackTitle: 'Opening WhatsApp.',
      fallbackText: 'Review the pre-filled message and send it there.',
      errorTitle: 'Your message could not be sent.',
      errorText: 'Please try again in a moment.',
      infoTitle: 'Information available.',
      infoText: 'The information will be prepared for WhatsApp.',
    },
  },
  es: {
    navItems: ['Inicio', 'Proyectos', 'Servicios', 'Sobre mí'],
    actions: {
      talk: 'Hablemos',
      letsTalk: 'Conversemos',
      downloadCv: 'Descargar CV',
      viewProjects: 'Ver proyectos',
      schedule: 'Agendar conversación',
      viewCreature: 'Ver criatura',
      light: 'Claro',
      dark: 'Oscuro',
      languageLabel: 'Seleccionar idioma',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    projectPage: {
      back: 'Volver a proyectos',
      eyebrow: 'Case en construcción',
      overview: 'Visión general',
      challenge: 'Desafío',
      role: 'Mi papel',
      decisions: 'Decisiones de experiencia',
      next: 'Próximos pasos',
      overviewText:
        'Esta página se convertirá en un storytelling completo del proyecto, conectando contexto, problema, decisiones y aprendizajes.',
      challengeText:
        'El foco será mostrar qué estaba en juego, qué barreras necesitaban resolverse y cómo la experiencia fue estructurada para generar claridad.',
      roleText:
        'Actuación en UX, organización de jornadas, arquitectura de información, prototipado y alineación entre objetivos de negocio y necesidades de las personas usuarias.',
      decisionsText:
        'La narrativa destacará decisiones de navegación, jerarquía, contenido, flujos y criterios que ayudaron al producto a ser más simple de entender y evolucionar.',
      nextText:
        'Pronto este case recibirá imágenes, proceso, bastidores y resultados de forma más inmersiva.',
    },
    hero: {
      eyebrow: 'Consultoría en UX y Product Design',
      titleLine1: 'Claridad para decidir.',
      titleLine2: 'Estructura para evolucionar.',
      text: 'Jornadas más claras, procesos más eficientes y productos digitales preparados para evolucionar.',
      imageAlt: 'Ilustración abstracta conectando claridad, flujos, métricas y experiencia digital',
    },
    benefits: [
      {
        title: 'Foco estratégico',
        text: 'Alineación entre negocio, usuario y producto.',
      },
      {
        title: 'Estructura y método',
        text: 'Procesos claros para decisiones mejores y más rápidas.',
      },
      {
        title: 'Experiencia que escala',
        text: 'Soluciones consistentes que crecen con el producto.',
      },
      {
        title: 'Impacto real',
        text: 'Menos fricción, más eficiencia y resultados sostenibles.',
      },
    ],
    projectsIntro: {
      eyebrow: 'Proyectos',
      title: 'Creaciones y Criaturas',
      line1: 'Algunas nacieron de una idea. Otras de una necesidad.',
      line2: 'Todas empezaron con una pregunta que necesitaba respuesta.',
    },
    projects: [
      {
        title: 'App Remaza',
        tags: ['Plataforma digital', 'Experiencia del Cliente', 'Servicios Financieros'],
        description:
          'De pagos a asambleas, información de cuota y atención, el desafío era transformar procesos dispersos en una experiencia más simple, accesible y organizada para miles de clientes.',
        image: sharedImages.projects[0],
      },
      {
        title: 'Fresto',
        tags: ['Experiencia Digital', 'Gastronomía', 'Sitio Institucional'],
        description:
          'El objetivo era traducir la personalidad del restaurante al entorno digital, valorizando productos, unidades y canales de contacto en una experiencia tan invitante como una visita.',
        image: sharedImages.projects[1],
      },
      {
        title: 'Moto Remaza',
        tags: ['E-commerce', 'Experiencia de Compra', 'Movilidad'],
        description:
          'Entre modelos, servicios, accesorios y contenido, el proyecto organizó diferentes jornadas en una sola plataforma, haciendo más clara la experiencia de quien investiga, compara o planea su próxima moto.',
        image: sharedImages.projects[2],
      },
      {
        title: 'Gamp21',
        tags: ['Contenido Digital', 'Educación', 'Acogida'],
        description:
          'El proyecto nació para apoyar madres, padres y cuidadores con contenido accesible sobre gestación, infancia y desarrollo, acercando conocimiento especializado a quienes más lo necesitan.',
        image: sharedImages.projects[3],
      },
      {
        title: 'Daitan',
        tags: ['Captación Digital', 'Automotriz', 'Conversión'],
        description:
          'Más que exhibir vehículos, el desafío era crear una experiencia capaz de apoyar el descubrimiento, la comparación y la elección del próximo Honda de forma simple e intuitiva.',
        image: sharedImages.projects[4],
      },
      {
        title: 'Consórcio Remaza',
        tags: ['Captación Digital', 'Generación de Leads', 'Servicios Financieros'],
        description:
          'El proyecto fue desarrollado para acercar a las personas al sueño del inmueble, automóvil o motocicleta propios, explicando cómo funciona el consorcio y reduciendo barreras de comprensión.',
        image: sharedImages.projects[5],
      },
    ],
    servicesIntro: {
      eyebrow: 'Servicios · UX estratégico',
      title: 'Cómo puedo ayudar',
      text: 'Transformo desafíos de experiencia en productos digitales más claros, eficientes y alineados con los objetivos del negocio.',
      note: 'Experiencia aplicada en productos digitales, plataformas de servicios, e-commerce y sistemas corporativos.',
    },
    services: [
      {
        title: 'UX/UI para Productos Digitales',
        text: 'Interfaces, prototipos, design systems y productos digitales.',
        image: sharedImages.services[0],
      },
      {
        title: 'Sitios y Landing pages',
        text: 'Institucionales, campañas, generación de leads y conversión.',
        image: sharedImages.services[1],
      },
      {
        title: 'Diagnóstico de Experiencia',
        text: 'Análisis de productos existentes e identificación de oportunidades.',
        image: sharedImages.services[2],
      },
      {
        title: 'Consultoría y Evolución',
        text: 'Acompañamiento, mejoras y dirección estratégica.',
        image: sharedImages.services[3],
      },
    ],
    about: {
      eyebrow: 'Sobre mí',
      titleLine1: 'Más de 20 años aprendiendo',
      titleLine2: 'a resolver problemas',
      textStart:
        'Desde 2003, participo en la creación de marcas, sitios, plataformas, sistemas corporativos y productos digitales. Con el tiempo, el foco dejó de ser solo diseñar interfaces y pasó a ser ',
      textStrong: 'comprender problemas, conectar personas y transformar objetivos de negocio en experiencias más claras.',
      portraitAlt: 'Foto de Fabio Lopes',
      timelineTitle: 'Experiencia construida en la práctica',
      lessonsTitle: 'Lo que este recorrido me enseñó',
      areasTitle: 'Áreas de actuación',
    },
    timeline: [
      ['2003', 'Diseño Gráfico', 'Marcas, comunicación visual y materiales impresos.'],
      ['2008', 'Web Design', 'Sitios institucionales, interfaces y presencia digital.'],
      [
        '2014',
        'Experiencia Digital',
        'Evolución del foco visual hacia la creación de experiencias digitales orientadas a usabilidad, conversión y claridad.',
      ],
      ['2017', 'UX Design', 'Flujos, jornadas, investigación, arquitectura y prototipado.'],
      ['2020', 'Product Design', 'Productos digitales, sistemas complejos y colaboración con tecnología.'],
      ['2026', 'Estrategia & Consultoría', 'Diagnóstico, claridad, mejora de experiencia y visión de producto.'],
    ],
    lessons: [
      {
        number: '01',
        title: 'Visión de negocio',
        text: 'Antes de la interfaz existen objetivos, procesos, personas e indicadores.',
      },
      {
        number: '02',
        title: 'Productos complejos',
        text: 'Experiencia en SaaS, supply chain, consorcios, e-commerce y autoservicio.',
      },
      {
        number: '03',
        title: 'Trabajo colaborativo',
        text: 'Alineación entre producto, tecnología, operación, marketing, ventas y usuarios.',
      },
    ],
    areas: [
      'UX Design',
      'Product Design',
      'Discovery',
      'Investigación',
      'Arquitectura de Información',
      'Design Systems',
      'Prototipado',
      'Branding',
      'Estrategia de Producto',
      'Marketing Digital',
    ],
    footer: {
      headline: 'Los grandes productos no nacen de pantallas.',
      text: 'Nacen de comprender los problemas correctos. ¿Conversamos sobre tu producto, proceso o experiencia digital?',
      copyright: 'Fabio Lopes UX & Product Designer © 2026. Todos los derechos reservados.',
    },
    contact: {
      title: '¿Vamos juntos?',
      text: 'Cuéntame cómo puedo ayudarte en tu jornada:',
      name: 'Nombre completo *',
      email: 'E-mail *',
      phone: 'Teléfono *',
      message: '¿Qué necesitas?',
      submit: 'Enviar mensaje',
      sending: 'Enviando...',
      close: 'Cerrar formulario',
      open: 'Abrir formulario de contacto',
      top: 'Volver arriba',
      subject: 'Nuevo contacto desde el sitio de Fabio Lopes',
      successTitle: '¡Mensaje enviado con éxito!',
      successText: 'Me pondré en contacto pronto.',
      fallbackTitle: 'Abriendo WhatsApp.',
      fallbackText: 'Revisa el mensaje completado y envíalo por allí.',
      errorTitle: 'No fue posible enviar tu mensaje.',
      errorText: 'Inténtalo nuevamente en unos instantes.',
      infoTitle: 'Información disponible.',
      infoText: 'La información se preparará para enviarla por WhatsApp.',
    },
  },
};
