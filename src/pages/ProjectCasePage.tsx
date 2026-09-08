import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  Component,
  FileText,
  GraduationCap,
  Headset,
  Home,
  Minus,
  MousePointer2,
  Network,
  Palette,
  Plus,
  Receipt,
  Route,
  Smartphone,
  UserRoundCog,
  Users,
  WalletCards,
  X,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react';
import { createPortal } from 'react-dom';
import { projectSlugs } from '../data/content';
import { useI18n } from '../i18n';
import { Button } from '../components/Button';

type ProjectCasePageProps = {
  slug: string;
};

type CaseSection = {
  id: string;
  label: string;
  title: string;
  intro: string;
  complement?: string;
  extraParagraphs?: string[];
  bullets?: string[];
  visual: string;
};

type CaseImpactContent = {
  intro: string;
  items: {
    category: string;
    title: string;
    text: string;
    icon: LucideIcon;
  }[];
  note?: string;
  testimonial?: {
    text?: string;
    name?: string;
    role?: string;
    company?: string;
  };
};

const caseImpactContent: Record<string, CaseImpactContent> = {
  'impact-app-remaza': {
    intro:
      'A solução reuniu tarefas importantes da jornada do consorciado em uma experiência única, tornando o acesso aos serviços mais simples e previsível.',
    items: [
      {
        category: 'Para o usuário',
        title: 'Mais autonomia',
        text: 'Pagamentos, assembleias, lances, documentos e informações da cota passaram a ser encontrados em caminhos mais claros e centralizados.',
        icon: Users,
      },
      {
        category: 'Para o negócio',
        title: 'Relacionamento mais próximo',
        text: 'O aplicativo criou um canal digital contínuo entre a administradora e o consorciado durante diferentes momentos da jornada.',
        icon: BadgeDollarSign,
      },
      {
        category: 'Para a operação',
        title: 'Serviços centralizados',
        text: 'A organização dos principais serviços ajudou a diminuir a dependência dos canais de atendimento para atividades recorrentes.',
        icon: Component,
      },
    ],
  },
  'impact-fresto': {
    intro:
      'O projeto transformou o site em uma extensão da experiência dos restaurantes, conectando desejo, descoberta e informações práticas.',
    items: [
      {
        category: 'Para o usuário',
        title: 'Escolha mais convidativa',
        text: 'Imagens mais humanas e apetitosas ajudaram o visitante a conhecer a proposta dos restaurantes e encontrar a unidade mais adequada.',
        icon: Users,
      },
      {
        category: 'Para o negócio',
        title: 'Presença digital mais atrativa',
        text: 'O destaque dado aos pratos, às unidades e às redes sociais fortaleceu a apresentação da marca no ambiente digital.',
        icon: BadgeDollarSign,
      },
      {
        category: 'Para a operação',
        title: 'Conteúdo sempre vivo',
        text: 'A integração com o Instagram permitiu apresentar novidades mesmo sem uma equipe dedicada à atualização frequente do site.',
        icon: Component,
      },
    ],
  },
  'impact-moto-remaza': {
    intro:
      'A nova experiência organizou um universo amplo de motos, serviços e conteúdos para diferentes perfis de motociclistas.',
    items: [
      {
        category: 'Para o usuário',
        title: 'Caminhos para diferentes perfis',
        text: 'Quem utiliza a moto para trabalhar, viajar ou viver uma paixão passou a encontrar modelos e serviços de forma mais orientada.',
        icon: Users,
      },
      {
        category: 'Para o negócio',
        title: 'Jornada mais completa',
        text: 'A solução aproximou descoberta, comparação, atendimento e intenção de compra dentro do mesmo ecossistema digital.',
        icon: BadgeDollarSign,
      },
      {
        category: 'Para a operação',
        title: 'Estrutura preparada para evoluir',
        text: 'A organização das páginas facilitou a inclusão de modelos, campanhas, peças, acessórios e novos serviços.',
        icon: Component,
      },
    ],
  },
  'impact-daitan': {
    intro:
      'O projeto equilibrou a experiência premium esperada de uma concessionária Honda com a agilidade necessária para sua rotina comercial.',
    items: [
      {
        category: 'Para o usuário',
        title: 'Decisão mais segura',
        text: 'Modelos, versões, diferenciais e formas de contato foram organizados para facilitar a pesquisa antes da visita à concessionária.',
        icon: Users,
      },
      {
        category: 'Para o negócio',
        title: 'Mais oportunidades de contato',
        text: 'Test-drive, ofertas e atendimento foram incorporados às jornadas de navegação como pontos naturais de conversão.',
        icon: BadgeDollarSign,
      },
      {
        category: 'Para a operação',
        title: 'Atualizações mais ágeis',
        text: 'A estrutura foi preparada para acompanhar a entrada frequente de veículos, seminovos, banners e campanhas comerciais.',
        icon: Component,
      },
    ],
  },
  'impact-gamp21': {
    intro:
      'Em seis meses, o Gamp21 apareceu mais de 103 mil vezes no Google e recebeu 847 acessos orgânicos. Artigos e materiais educativos se destacaram como portas de entrada para pessoas procurando orientações sobre amamentação, pós-parto e cuidados com o bebê.',
    items: [
      {
        category: 'Aparições no Google',
        title: '+103 mil',
        text: 'aparições registradas nos resultados de busca do Google nos últimos seis meses.',
        icon: Users,
      },
      {
        category: 'Acessos orgânicos',
        title: '847',
        text: 'acessos vindos de busca orgânica no mesmo período.',
        icon: MousePointer2,
      },
      {
        category: 'Cliques no celular',
        title: '70%',
        text: 'dos cliques realizados por pessoas acessando pelo celular.',
        icon: Smartphone,
      },
      {
        category: 'Materiais educativos',
        title: '+47 mil',
        text: 'impressões dos materiais educativos em PDF nos últimos seis meses.',
        icon: FileText,
      },
    ],
  },
  'impact-consorcio-remaza': {
    intro:
      'O projeto aproximou informação, planejamento e atendimento comercial em uma jornada digital de grande escala.',
    items: [
      {
        category: 'Para o usuário',
        title: 'Planejamento mais concreto',
        text: 'Os simuladores permitiram explorar possibilidades de crédito e pagamento antes do contato com a equipe comercial.',
        icon: Users,
      },
      {
        category: 'Para o negócio',
        title: 'Leads mais contextualizados',
        text: 'As escolhas realizadas durante a simulação ajudaram a iniciar conversas comerciais com informações mais relevantes.',
        icon: BadgeDollarSign,
      },
      {
        category: 'Para a operação',
        title: 'Experiência integrada',
        text: 'Site, centrais de vendas, conteúdos e orientações para os vendedores passaram a trabalhar de maneira mais consistente.',
        icon: Component,
      },
    ],
  },
};

const appRemazaSections = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Um aplicativo que concentra a relação entre o consorciado e a Remaza.',
    intro:
      'O APP Remaza é a Área do Cliente do consorciado. Nele, o usuário acompanha sua cota, consulta pagamentos, participa de assembleias, oferece lances, acessa documentos e utiliza diferentes serviços relacionados ao consórcio.',
    complement:
      'A primeira versão já reunia essas funcionalidades, mas a evolução do produto revelou a necessidade de tornar a experiência mais clara, organizada e próxima da linguagem utilizada pelo público.',
    visual: 'context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Simplificar um produto complexo sem perder profundidade.',
    intro:
      'O desafio não era apenas redesenhar telas. Era organizar uma grande quantidade de informações financeiras, serviços e possibilidades em uma experiência simples de navegar.',
    complement:
      'O aplicativo precisava atender usuários com diferentes níveis de familiaridade digital, mantendo informações importantes acessíveis sem tornar a interface excessivamente técnica ou carregada.',
    visual: 'challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Do entendimento do problema à construção da solução.',
    intro:
      'Trabalhei em parceria com a Product Owner na identificação dos gargalos da primeira versão e na organização das melhorias necessárias para a evolução do aplicativo.',
    complement:
      'Minha atuação envolveu arquitetura da informação, revisão de fluxos, UX/UI Design, prototipação de alta fidelidade e desenvolvimento do Design System.',
    visual: 'scope',
  },
  {
    id: 'usabilidade',
    label: 'Usabilidade',
    title: 'Projetando jornadas completas, não apenas interfaces.',
    intro:
      'Cada funcionalidade foi pensada como parte de uma jornada. O objetivo era deixar claro onde o usuário estava, o que precisava fazer e o que aconteceria depois de cada ação.',
    complement:
      'Fluxos como primeiro acesso, pagamentos e oferta de lance foram organizados para reduzir dúvidas e tornar decisões importantes mais fáceis de compreender.',
    visual: 'usability',
  },
  {
    id: 'design-system',
    label: 'Design System',
    title: 'Uma base consistente para um produto em constante evolução.',
    intro:
      'Com o crescimento do aplicativo, tornou-se necessário criar uma base visual capaz de manter a consistência entre diferentes telas e funcionalidades.',
    complement:
      'O Design System reuniu componentes, estados e padrões de interface reutilizáveis, facilitando a evolução do produto e a comunicação com o desenvolvimento.',
    visual: 'design-system',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Impacto da solução',
    intro: caseImpactContent['impact-app-remaza'].intro,
    visual: 'impact-app-remaza',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Cada decisão de design impacta toda a experiência.',
    intro:
      'Durante a evolução do projeto, eu e a Product Owner identificamos gargalos presentes na primeira versão e transformamos esses aprendizados em melhorias para os novos fluxos.',
    complement:
      'O principal aprendizado foi entender que evoluir um produto não significa corrigir telas isoladas. Cada alteração pode afetar outras jornadas, componentes e regras do aplicativo. Por isso, as decisões precisaram considerar o produto como um sistema conectado.',
    visual: 'none',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Construindo produtos preparados para evoluir.',
    intro:
      'O redesign do APP Remaza organizou uma visão mais clara e consistente para a evolução da Área do Cliente.',
    complement:
      'Mais do que atualizar a interface, o projeto estabeleceu fluxos, componentes e padrões capazes de acompanhar novas funcionalidades e futuras necessidades do produto.',
    visual: 'none',
  },
];

const frestoSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Uma rede de restaurantes presente em clubes de São Paulo.',
    intro:
      'O Fresto é uma rede de restaurantes concentrada principalmente em clubes de lazer da cidade de São Paulo.',
    complement:
      'Com pratos frescos, atendimento próximo e diferentes unidades, a marca precisava reunir sua presença digital em um site capaz de apresentar sua proposta, seus espaços e as principais formas de contato. O projeto buscou traduzir para o ambiente digital uma experiência baseada em comida, convivência e hospitalidade.',
    visual: 'fresto-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Transformar imagens de comida em desejo e experiência.',
    intro:
      'O principal desafio era fazer com que o usuário sentisse vontade de conhecer o Fresto antes mesmo de chegar ao restaurante.',
    complement:
      'Para isso, o site precisava valorizar fotografias de pratos com forte apelo visual, equilibrando o prazer de comer com informações importantes sobre a marca, suas unidades e seus serviços. A experiência deveria ser apetitosa e envolvente, sem dificultar o acesso às informações práticas.',
    visual: 'fresto-challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da pesquisa visual à construção da experiência.',
    intro:
      'O projeto começou com uma análise das redes sociais do Fresto, utilizadas como referência para compreender a personalidade, os pratos e o universo visual da marca.',
    complement:
      'Também pesquisei sites de restaurantes conhecidos e visitados na região de São Paulo, observando como apresentavam seus pratos, unidades, serviços e chamadas para ação. A partir dessas referências, organizei a arquitetura das páginas e desenvolvi a interface no Figma, considerando desde o início sua futura implementação em WordPress.',
    visual: 'fresto-scope',
  },
  {
    id: 'usabilidade',
    label: 'Usabilidade',
    title: 'Orientando o usuário sem perder o apelo visual.',
    intro:
      'Além de despertar o desejo pela comida, o site precisava ajudar o usuário a encontrar rapidamente informações práticas.',
    complement:
      'As unidades receberam destaque na navegação e na página inicial, facilitando o acesso aos endereços, horários de funcionamento e condições de acesso a cada clube. Na área de oportunidades, a experiência foi pensada para conversar diretamente com quem procura uma vaga.',
    visual: 'fresto-usability',
  },
  {
    id: 'design-system',
    label: 'Design System',
    title: 'Uma linguagem visual criada para abrir o apetite.',
    intro:
      'A identidade da interface foi construída para transmitir frescor, sabor e proximidade.',
    complement:
      'As fotografias dos pratos ganharam protagonismo, enquanto cores, tipografia e componentes ajudaram a organizar o conteúdo sem competir com a comida. A criação de padrões visuais também permitiu manter consistência entre páginas com necessidades diferentes, como unidades, eventos, contato e oportunidades de trabalho.',
    visual: 'fresto-design-system',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Impacto da solução',
    intro: caseImpactContent['impact-fresto'].intro,
    visual: 'impact-fresto',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Um site também precisa continuar vivo depois da entrega.',
    intro:
      'Um dos principais aprendizados foi considerar não apenas a publicação do site, mas também sua continuidade.',
    complement:
      'Como o Fresto ainda não teria uma equipe dedicada à atualização frequente do conteúdo, era importante encontrar uma solução compatível com a realidade da operação. A integração do Instagram permitiu aproveitar o conteúdo que a marca já produzia nas redes sociais, trazendo novidades para o site sem criar uma nova rotina de manutenção para a equipe.',
    visual: 'fresto-learning',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Uma experiência digital com o sabor do Fresto.',
    intro:
      'O projeto reuniu o universo visual, as unidades e os principais pontos de contato do Fresto em uma experiência mais clara e convidativa.',
    complement:
      'Mais do que apresentar restaurantes, o site foi pensado para despertar o apetite, orientar diferentes públicos e transmitir a hospitalidade presente em cada unidade. A integração com as redes sociais também ajudou a criar uma experiência preparada para acompanhar as novidades da marca.',
    visual: 'none',
  },
];

const motoRemazaSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Muito além de uma concessionária',
    intro:
      'A Moto Remaza atende diferentes perfis de motociclistas: desde quem utiliza a moto como ferramenta de trabalho até quem busca liberdade para viajar, explorar novos terrenos ou viver a paixão pelos modelos Honda.',
    complement:
      'O projeto nasceu com o objetivo de transformar o site em um ecossistema digital mais completo, capaz de conectar motos, serviços, conteúdos e atendimento em uma única experiência.',
    visual: 'moto-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Diferentes caminhos, uma experiência simples',
    intro:
      'Cada motociclista chega ao site com uma necessidade diferente. Alguns procuram economia e praticidade para trabalhar; outros querem desempenho, aventura ou um modelo para colecionar.',
    complement:
      'O desafio foi organizar esse universo sem tornar a experiência complexa. O usuário precisava encontrar modelos, comparar opções, esclarecer dúvidas e acessar serviços com poucos passos.',
    visual: 'moto-challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da estratégia à experiência digital',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos principais caminhos de navegação e a criação das interfaces para desktop e mobile.',
    complement:
      'O trabalho também considerou a evolução futura da plataforma, preparando a experiência para receber novos serviços, conteúdos e uma área de e-commerce personalizada para cada motociclista.',
    visual: 'moto-scope',
  },
  {
    id: 'pesquisa',
    label: 'Pesquisa',
    title: 'Ouvindo quem entende de motos',
    intro:
      'O direcionamento do projeto foi construído a partir de conversas com stakeholders e motociclistas de diferentes perfis.',
    complement:
      'A pesquisa buscou entender as principais dificuldades encontradas nos sites de concessionárias e o que essas pessoas sentiam falta durante a busca por motos, peças, serviços e informações.',
    extraParagraphs: [
      'Essas percepções ajudaram a priorizar uma navegação mais direta, informações fáceis de encontrar e canais de atendimento acessíveis.',
    ],
    bullets: [
      'Navegação mais direta',
      'Informações fáceis de encontrar',
      'Melhor acesso aos serviços',
      'Canais de atendimento visíveis',
      'Experiência adequada a diferentes perfis',
    ],
    visual: 'moto-research',
  },
  {
    id: 'experiencia-navegacao',
    label: 'Experiência',
    title: 'Tudo ao alcance do motociclista',
    intro:
      'A navegação foi planejada para facilitar o acesso aos modelos, serviços e principais dúvidas do usuário.',
    complement:
      'Menus objetivos, categorias claras e atalhos estratégicos ajudam o motociclista a encontrar o que procura sem precisar conhecer previamente a estrutura da empresa.',
    extraParagraphs: [
      'A experiência também considera diferentes momentos da jornada: descobrir uma moto, agendar um test-ride, solicitar atendimento ou cuidar de um modelo que já possui.',
    ],
    visual: 'moto-navigation',
  },
  {
    id: 'modelos',
    label: 'Modelos',
    title: 'Uma moto para cada estilo de vida',
    intro:
      'O catálogo foi organizado para atender diferentes necessidades de uso, como mobilidade urbana, trabalho, viagens, aventura e alta performance.',
    complement:
      'Em vez de apresentar apenas uma lista de produtos, a experiência ajuda o usuário a explorar categorias, conhecer versões e encontrar uma moto compatível com o seu perfil.',
    visual: 'moto-models',
  },
  {
    id: 'seminovos',
    label: 'Seminovos',
    title: 'Uma busca mais prática e profissional',
    intro:
      'A área de seminovos foi pensada como uma loja completa, com filtros fáceis de aplicar e informações organizadas para apoiar a decisão do usuário.',
    complement:
      'O objetivo foi tornar a busca mais prática, permitindo encontrar rapidamente as opções disponíveis de acordo com as características desejadas.',
    visual: 'moto-used',
  },
  {
    id: 'servicos',
    label: 'Serviços',
    title: 'A experiência continua depois da compra',
    intro:
      'O projeto não termina na escolha da motocicleta. Test-ride, agendamento de serviços, revisão, peças, acessórios e assistência técnica fazem parte da experiência.',
    complement:
      'Ao reunir esses caminhos no mesmo ambiente, o site passa a acompanhar o motociclista em diferentes momentos da sua relação com a Moto Remaza.',
    visual: 'moto-services',
  },
  {
    id: 'proximos-passos',
    label: 'Próximos passos',
    title: 'Uma experiência feita para cada moto',
    intro:
      'Em uma segunda etapa, o projeto receberá um serviço de e-commerce personalizado a partir do modelo de moto do usuário.',
    complement:
      'Essa área reunirá revisões, peças, acessórios e produtos compatíveis com o veículo cadastrado, todos associados ao selo de qualidade Honda.',
    extraParagraphs: [
      'A proposta é reduzir dúvidas, facilitar a manutenção e oferecer uma experiência mais segura e relevante para cada motociclista.',
    ],
    visual: 'moto-next-steps',
  },
  {
    id: 'pessoas-relacionamento',
    label: 'Relacionamento',
    title: 'Portas abertas para novas conversas',
    intro:
      'Além da experiência comercial, o projeto também facilita o acesso de quem deseja trabalhar na Moto Remaza, com um atalho direto para as oportunidades disponíveis.',
    complement:
      'Outro destaque é o canal de comunicação com a diretoria, preservando uma prática valorizada nas empresas do Grupo Remaza: manter a empresa aberta para ouvir pessoas, dúvidas e sugestões.',
    visual: 'moto-relationship',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Impacto da solução',
    intro: caseImpactContent['impact-moto-remaza'].intro,
    visual: 'impact-moto-remaza',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Projetar para diferentes relações com a moto',
    intro:
      'O principal aprendizado foi entender que a escolha de uma moto não acontece apenas por preço ou especificações técnicas.',
    complement:
      'Trabalho, mobilidade, liberdade, aventura e paixão influenciam essa decisão. Reconhecer essas diferentes relações ajudou a construir uma experiência mais humana, organizada e próxima da realidade dos motociclistas.',
    visual: 'moto-learning',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Um novo caminho para a Moto Remaza',
    intro:
      'O projeto transformou o site em uma experiência que vai além da apresentação de motocicletas.',
    complement:
      'Modelos, seminovos, serviços, conteúdos e atendimento passaram a fazer parte de uma jornada integrada, preparada para acompanhar o motociclista antes, durante e depois da compra.',
    extraParagraphs: [
      'Atualmente, o projeto está em ambiente de desenvolvimento, permitindo acompanhar sua implementação e realizar ajustes antes da publicação oficial.',
    ],
    visual: 'moto-conclusion',
  },
];

const appRemazaPrimaryAudience = [
  {
    icon: Users,
    text: 'Consorciados',
  },
  {
    icon: BadgeDollarSign,
    text: 'Investidores',
  },
  {
    icon: GraduationCap,
    text: 'Clientes das classes C e D',
  },
  {
    icon: Smartphone,
    text: 'Usuários com diferentes níveis de familiaridade digital',
  },
];

const appRemazaNeeds = [
  {
    icon: WalletCards,
    text: 'Consultar rapidamente informações da cota',
  },
  {
    icon: Receipt,
    text: 'Emitir boletos',
  },
  {
    icon: CalendarDays,
    text: 'Acompanhar assembleias',
  },
  {
    icon: FileText,
    text: 'Acessar documentos',
  },
  {
    icon: UserRoundCog,
    text: 'Atualizar cadastro',
  },
  {
    icon: Headset,
    text: 'Resolver tarefas sem precisar ligar para a central',
  },
];

const appRemazaScope = [
  {
    icon: Network,
    text: 'Organização da arquitetura da informação',
  },
  {
    icon: Route,
    text: 'Revisão dos fluxos principais',
  },
  {
    icon: MousePointer2,
    text: 'Criação de interfaces em alta fidelidade',
  },
  {
    icon: Component,
    text: 'Padronização de componentes',
  },
  {
    icon: Palette,
    text: 'Evolução do Design System',
  },
  {
    icon: FileText,
    text: 'Apoio à documentação para desenvolvimento',
  },
];

const gamp21Sections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Apoio para quem está começando uma nova fase',
    intro:
      'A chegada de um filho traz descobertas, dúvidas e novas responsabilidades. O Gamp21 atua como uma rede de apoio para mães, pais e empresas, oferecendo cursos, conteúdos e orientações desde a gestação até a primeira infância.',
    complement:
      'O site foi criado para apresentar esse trabalho de forma acolhedora e aproximar a marca tanto das famílias quanto das organizações interessadas em apoiar seus colaboradores.',
    visual: 'gamp-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Falar com famílias e empresas no mesmo espaço',
    intro:
      'O principal desafio foi equilibrar públicos com necessidades diferentes.',
    complement:
      'Enquanto mães e pais procuravam informações confiáveis para lidar com a parentalidade, as empresas precisavam compreender os cursos e serviços que poderiam oferecer aos seus colaboradores.',
    extraParagraphs: [
      'A experiência precisava ser humana e acolhedora, mas também transmitir organização, experiência profissional e clareza comercial.',
    ],
    visual: 'none',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Organização, conteúdo e experiência digital',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos principais caminhos de navegação e a criação das interfaces para desktop e mobile.',
    complement:
      'O trabalho buscou facilitar o acesso aos serviços, valorizar os conteúdos produzidos pelo Gamp21 e direcionar cada público para a informação mais relevante.',
    bullets: [
      'Arquitetura da informação',
      'Organização dos conteúdos',
      'Direção visual',
      'UX/UI Design',
      'Interfaces responsivas',
      'Estruturação da navegação',
      'Destaque para conteúdos e serviços',
    ],
    visual: 'gamp-scope',
  },
  {
    id: 'servicos',
    label: 'Serviços',
    title: 'Soluções para famílias e ambientes de trabalho',
    intro:
      'Os serviços receberam destaque para que empresas e famílias pudessem compreender rapidamente as diferentes formas de atuação do Gamp21.',
    complement:
      'A organização em categorias facilita a apresentação de cursos, rodas de conversa, consultorias e acompanhamentos, ajudando o usuário a encontrar uma solução adequada para cada momento.',
    extraParagraphs: [
      'Para o público corporativo, a página também posiciona o Gamp21 como parceiro de empresas que desejam apoiar seus colaboradores durante a maternidade e a paternidade.',
    ],
    visual: 'gamp-services',
  },
  {
    id: 'conteudo',
    label: 'Conteúdo',
    title: 'Informação que aproxima a marca das famílias',
    intro:
      'A área “Para mães e pais” reúne conteúdos sobre gestação, alimentação, cuidados com o bebê, parentalidade e primeira infância.',
    complement:
      'Além de apoiar as famílias com informações acessíveis, essa produção de conteúdo amplia os pontos de entrada para o site por meio das buscas orgânicas no Google.',
    extraParagraphs: [
      'O blog estabelece um primeiro contato baseado em informação e confiança, permitindo que novas pessoas conheçam o trabalho do Gamp21 antes mesmo de procurar um serviço.',
    ],
    visual: 'gamp-blog',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Conteúdo que amplia o alcance',
    intro: caseImpactContent['impact-gamp21'].intro,
    visual: 'impact-gamp21',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Equilibrar acolhimento e posicionamento profissional',
    intro:
      'O projeto mostrou como uma mesma experiência pode conversar com públicos diferentes sem perder sua identidade.',
    complement:
      'Foi necessário encontrar um equilíbrio entre o tom humano esperado pelas famílias e a clareza comercial necessária para apresentar os serviços às empresas.',
    extraParagraphs: [
      'Também foi importante compreender o conteúdo como parte da experiência, ajudando o Gamp21 a manter uma presença digital útil mesmo antes do contato direto com seus profissionais.',
    ],
    visual: 'none',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Um ponto de apoio entre conteúdo e serviço',
    intro:
      'O site organizou conteúdos, cursos e serviços em uma experiência capaz de acolher famílias e apresentar o trabalho do Gamp21 ao ambiente corporativo.',
    complement:
      'Mais do que uma presença institucional, o projeto criou um ponto de encontro entre informação, cuidado e apoio durante as diferentes etapas da parentalidade.',
    visual: 'none',
  },
];

const daitanSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Uma concessionária com diferentes pontos de contato',
    intro:
      'A Honda Daitan atende públicos com necessidades distintas. Enquanto alguns clientes procuram um veículo novo e desejam conhecer versões, tecnologias e condições de compra, outros pesquisam seminovos, peças, acessórios ou serviços de manutenção.',
    complement:
      'O projeto nasceu da necessidade de organizar esse universo em uma experiência digital capaz de acompanhar diferentes momentos da relação entre o cliente e a concessionária.',
    visual: 'daitan-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Organizar uma experiência que muda constantemente',
    intro:
      'O mercado automotivo exige atualizações frequentes. Novos modelos, versões, ofertas, veículos seminovos e serviços precisam ser publicados e atualizados com agilidade.',
    complement:
      'Além de facilitar a navegação para o cliente, o projeto precisava oferecer uma estrutura prática para a manutenção do conteúdo, permitindo que diferentes áreas do site fossem atualizadas sem comprometer a consistência da experiência.',
    visual: 'none',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da organização do conteúdo à experiência responsiva',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos principais caminhos de navegação e a criação das interfaces para desktop e mobile.',
    complement:
      'O trabalho contemplou diferentes áreas da jornada: apresentação dos veículos, seminovos, tecnologias, peças e acessórios, revisão programada, condições especiais e canais de atendimento.',
    bullets: [
      'Arquitetura da informação',
      'Organização dos conteúdos',
      'UX/UI Design',
      'Interfaces responsivas',
      'Estruturação das páginas de modelos',
      'Organização da experiência de seminovos',
      'Estruturação das áreas de pós-venda',
      'Criação de formulários e pontos de conversão',
      'Padronização visual entre diferentes áreas do site',
    ],
    visual: 'daitan-scope',
  },
  {
    id: 'veiculos-novos',
    label: 'Veículos novos',
    title: 'Informação para apoiar a escolha do cliente',
    intro:
      'As páginas de modelos foram organizadas para apresentar o veículo de maneira visual e facilitar o acesso às informações mais importantes durante a decisão de compra.',
    complement:
      'Versões, diferenciais, cores, tecnologias, ficha técnica e ações como solicitar uma cotação ou agendar um test drive passam a fazer parte de uma mesma experiência.',
    extraParagraphs: [
      'A estrutura também foi pensada para receber novos modelos e atualizações frequentes sem exigir a criação de uma experiência completamente diferente para cada lançamento.',
    ],
    visual: 'daitan-new-cars',
  },
  {
    id: 'tecnologia-diferenciais',
    label: 'Tecnologia',
    title: 'Detalhes que ajudam a construir valor',
    intro:
      'Além das informações comerciais, as páginas também apresentam tecnologias, recursos de segurança e diferenciais de cada veículo.',
    complement:
      'O conteúdo foi dividido em categorias para facilitar a exploração e permitir que o cliente compreenda os benefícios do modelo sem enfrentar uma página excessivamente técnica ou desorganizada.',
    visual: 'daitan-technology',
  },
  {
    id: 'seminovos',
    label: 'Seminovos',
    title: 'Busca e comparação para diferentes perfis de compra',
    intro:
      'A área de seminovos atende um público com necessidades diferentes daquele que procura um veículo novo.',
    complement:
      'A experiência foi estruturada para permitir a busca, a aplicação de filtros e a visualização das informações principais de cada veículo, ajudando o usuário a reduzir as opções antes de entrar em contato com a concessionária.',
    extraParagraphs: [
      'No detalhe, fotos, características e informações do automóvel dão mais segurança para continuar a jornada.',
    ],
    visual: 'daitan-used-cars',
  },
  {
    id: 'pos-venda',
    label: 'Pós-venda',
    title: 'A experiência continua depois da compra',
    intro:
      'O relacionamento com o cliente não termina na escolha do automóvel. O site também organiza serviços importantes para quem já possui um Honda, como peças, acessórios e revisão programada.',
    complement:
      'Na área de peças e acessórios, o usuário pode selecionar o modelo e visualizar itens compatíveis. Já na revisão programada, encontra informações sobre serviços previstos, quilometragem e valores relacionados à manutenção do veículo.',
    visual: 'daitan-after-sales',
  },
  {
    id: 'relacionamento',
    label: 'Relacionamento',
    title: 'Atendimento para clientes e empresas',
    intro:
      'Além das jornadas de compra e pós-venda, o site reúne canais voltados a necessidades específicas.',
    complement:
      'A área de condições especiais apresenta informações para pessoas jurídicas e outros públicos elegíveis, enquanto o Linha Direta cria um canal para dúvidas, sugestões, críticas e elogios.',
    extraParagraphs: [
      'Esses pontos de contato ampliam o papel do site e aproximam diferentes públicos da concessionária.',
    ],
    visual: 'daitan-relationship',
  },
  {
    id: 'experiencia-responsiva',
    label: 'Responsividade',
    title: 'A mesma jornada em diferentes telas',
    intro:
      'Como boa parte das pesquisas por veículos acontece pelo celular, a adaptação para telas menores foi considerada em diferentes partes da experiência.',
    complement:
      'Banners, páginas de modelos, filtros, detalhes de seminovos e catálogos de acessórios foram reorganizados para preservar a leitura e manter as principais ações sempre acessíveis.',
    visual: 'daitan-responsive',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Impacto da solução',
    intro: caseImpactContent['impact-daitan'].intro,
    visual: 'impact-daitan',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Projetar uma estrutura preparada para evoluir',
    intro:
      'O projeto reforçou a importância de criar uma experiência capaz de receber atualizações frequentes sem perder consistência.',
    complement:
      'Mais do que desenhar páginas isoladas, foi necessário pensar em estruturas reutilizáveis para modelos, ofertas, serviços e conteúdos que mudam ao longo do tempo.',
    extraParagraphs: [
      'Esse olhar ajudou a transformar o site em uma base mais flexível para a operação digital da concessionária.',
    ],
    visual: 'none',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Muito além de uma vitrine de veículos',
    intro:
      'O site da Honda Daitan reúne diferentes etapas da jornada automotiva em uma experiência mais organizada, desde a descoberta de um novo modelo até a busca por seminovos, acessórios, manutenção e atendimento.',
    complement:
      'O projeto criou uma base digital capaz de conectar produtos, serviços e relacionamento, acompanhando o cliente antes, durante e depois da compra.',
    visual: 'none',
  },
];

const consorcioRemazaSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'O primeiro grande projeto de uma nova trajetória',
    intro:
      'O Consórcio Remaza foi meu primeiro projeto na WebSupply e marcou o início de uma nova etapa da minha trajetória profissional.',
    complement:
      'Mais do que atualizar a aparência do site, o trabalho buscou facilitar o entendimento sobre o consórcio e criar caminhos mais práticos para pessoas interessadas em conquistar um imóvel, automóvel ou motocicleta.',
    extraParagraphs: [
      'O projeto também precisava apoiar a operação comercial da empresa, aproximando os usuários dos representantes responsáveis pelo atendimento.',
    ],
    visual: 'consorcio-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Tornar uma escolha complexa mais compreensível',
    intro:
      'A contratação de um consórcio envolve valores, prazos, parcelas e regras que podem gerar dúvidas antes mesmo do contato com a equipe comercial.',
    complement:
      'O desafio foi organizar essas informações sem sobrecarregar a experiência e permitir que o usuário tivesse uma primeira noção sobre suas possibilidades.',
    extraParagraphs: [
      'Ao mesmo tempo, cada interação precisava criar oportunidades reais para que a equipe de vendas continuasse o atendimento de maneira mais contextualizada.',
    ],
    visual: 'consorcio-challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da experiência pública às ferramentas comerciais',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos caminhos de navegação e a criação das interfaces públicas e comerciais.',
    complement:
      'O projeto contemplou páginas institucionais, simuladores, áreas de conteúdo, canais de atendimento, landing pages e estruturas destinadas aos representantes de vendas.',
    bullets: [
      'Arquitetura da informação',
      'Organização dos conteúdos',
      'UX/UI Design',
      'Interfaces responsivas',
      'Estruturação dos simuladores',
      'Criação de jornadas de geração de leads',
      'Landing pages para representantes',
      'Organização de canais de atendimento',
      'Apoio visual à estrutura comercial',
      'Padronização das principais áreas do site',
    ],
    visual: 'consorcio-scope',
  },
  {
    id: 'simulacao',
    label: 'Simulação',
    title: 'Uma decisão que começa pela realidade do usuário',
    intro:
      'Os simuladores foram criados para ajudar o usuário a explorar possibilidades antes de conversar com um representante.',
    complement:
      'A experiência permite escolher o tipo de consórcio, informar alguns dados e visualizar opções de planos de acordo com o valor pretendido.',
    extraParagraphs: [
      'Mais do que apresentar produtos, o simulador cria uma ponte entre o interesse inicial do usuário e a equipe comercial, gerando um contato com mais contexto para a continuidade do atendimento.',
    ],
    visual: 'consorcio-simulation',
  },
  {
    id: 'experiencia-mobile',
    label: 'Experiência mobile',
    title: 'Simular também pelo celular',
    intro:
      'A jornada foi adaptada para que as principais ações continuassem acessíveis em telas menores.',
    complement:
      'No mobile, etapas, campos e opções de planos foram reorganizados verticalmente, mantendo a orientação sobre o progresso e facilitando a interação com formulários e resultados.',
    visual: 'consorcio-mobile',
  },
  {
    id: 'estrutura-comercial',
    label: 'Estrutura comercial',
    title: 'Uma experiência que também apoia quem vende',
    intro:
      'O projeto não ficou restrito ao site voltado ao consumidor. Também foram desenvolvidas estruturas digitais para apoiar representantes e equipes comerciais.',
    complement:
      'Landing pages individuais permitiram que cada profissional divulgasse os produtos e recebesse contatos diretamente. A área de vendas reuniu acessos importantes para a rotina do representante, como dados pessoais, documentos, tabelas e materiais de apoio.',
    visual: 'consorcio-commercial',
  },
  {
    id: 'confianca',
    label: 'Confiança no atendimento',
    title: 'Pessoas reais por trás da experiência',
    intro:
      'A apresentação dos representantes também fez parte da construção de uma relação mais próxima com o cliente.',
    complement:
      'Foram definidas orientações para a produção de fotografias profissionais, buscando transmitir mais cuidado, credibilidade e segurança tanto para os colaboradores quanto para as pessoas que entrariam em contato com eles.',
    extraParagraphs: [
      'A identificação clara do profissional ajudou a humanizar uma jornada que normalmente poderia parecer distante ou excessivamente comercial.',
    ],
    visual: 'consorcio-trust',
  },
  {
    id: 'conteudo',
    label: 'Conteúdo',
    title: 'Informação para apoiar uma escolha consciente',
    intro:
      'A Central de Notícias ampliou o papel do site ao reunir conteúdos sobre consórcio, mobilidade, imóveis e outros assuntos relacionados aos objetivos dos clientes.',
    complement:
      'A produção constante de conteúdo ajudou a responder dúvidas, atrair novos usuários pelas buscas e melhorar a presença digital da empresa.',
    extraParagraphs: [
      'A área de dúvidas frequentes complementa esse trabalho, oferecendo respostas mais diretas para quem ainda está conhecendo o funcionamento do consórcio.',
    ],
    visual: 'consorcio-content',
  },
  {
    id: 'relacionamento',
    label: 'Relacionamento',
    title: 'Diferentes caminhos para continuar a jornada',
    intro:
      'Além dos simuladores, o site oferece caminhos para usuários que já são clientes ou que precisam de atendimento mais específico.',
    complement:
      'A área do cliente reúne serviços relacionados ao consórcio, enquanto o Linha Direta permite o envio de dúvidas e solicitações. A página de unidades e filiais ajuda a conectar a experiência digital ao atendimento presencial.',
    visual: 'consorcio-relationship',
  },
  {
    id: 'novas-oportunidades',
    label: 'Novas oportunidades',
    title: 'Expandindo também a rede comercial',
    intro:
      'O ecossistema digital também contempla pessoas interessadas em atuar junto à empresa.',
    complement:
      'A página “Seja um representante” apresenta a oportunidade e organiza os benefícios e recursos disponíveis para o profissional. A área “Trabalhe conosco” amplia os caminhos para quem deseja fazer parte da organização.',
    visual: 'consorcio-opportunities',
  },
  {
    id: 'impacto',
    label: 'Impacto',
    title: 'Impacto da solução',
    intro: caseImpactContent['impact-consorcio-remaza'].intro,
    visual: 'impact-consorcio-remaza',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Projetar para o usuário e para a operação',
    intro:
      'O principal aprendizado foi compreender que uma experiência digital não termina na interface utilizada pelo cliente.',
    complement:
      'O projeto precisou considerar quem pesquisa, quem simula, quem recebe o lead e quem continua o atendimento. Conectar esses diferentes pontos ajudou a criar uma solução mais útil para o usuário e mais próxima da operação comercial.',
    extraParagraphs: [
      'Por ter sido meu primeiro grande projeto na WebSupply, o Consórcio Remaza também marcou uma evolução importante na forma como passei a pensar arquitetura, conversão e continuidade da jornada.',
    ],
    visual: 'none',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Um projeto que abriu novos caminhos',
    intro:
      'O projeto transformou o site em um ecossistema capaz de informar, simular, gerar oportunidades e apoiar o atendimento comercial.',
    complement:
      'Os simuladores tornaram a escolha mais concreta para o usuário, enquanto as landing pages e ferramentas de vendas aproximaram a experiência digital dos profissionais responsáveis pela continuidade da jornada.',
    extraParagraphs: [
      'Atualmente, o site passa por uma nova evolução visual, conduzida por outra profissional. Este case registra a estrutura que serviu como ponto de partida e um projeto que permanece especialmente importante na minha trajetória.',
    ],
    visual: 'none',
  },
];

const frestoParticipation = [
  {
    icon: Palette,
    text: 'Pesquisa de referências',
  },
  {
    icon: Network,
    text: 'Arquitetura das páginas',
  },
  {
    icon: MousePointer2,
    text: 'UX e Web Design',
  },
  {
    icon: Route,
    text: 'Prototipação no Figma',
  },
  {
    icon: FileText,
    text: 'Planejamento para WordPress',
  },
];

const frestoProjectCharacteristics = [
  {
    icon: Component,
    text: 'Site institucional',
  },
  {
    icon: Smartphone,
    text: 'Experiência responsiva',
  },
  {
    icon: Network,
    text: 'Apresentação das unidades',
  },
  {
    icon: Users,
    text: 'Integração com Instagram',
  },
  {
    icon: FileText,
    text: 'Área de oportunidades',
  },
];

const frestoScope = [
  {
    icon: Users,
    text: 'Análise da comunicação nas redes sociais',
  },
  {
    icon: Palette,
    text: 'Pesquisa de referências do segmento',
  },
  {
    icon: Network,
    text: 'Organização da arquitetura das páginas',
  },
  {
    icon: Route,
    text: 'Definição das hierarquias de conteúdo',
  },
  {
    icon: MousePointer2,
    text: 'UX e Web Design',
  },
  {
    icon: Component,
    text: 'Prototipação no Figma',
  },
  {
    icon: Smartphone,
    text: 'Planejamento da experiência responsiva',
  },
  {
    icon: FileText,
    text: 'Interface preparada para WordPress',
  },
];

const motoRemazaParticipation = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: Route,
    text: 'Organização das jornadas',
  },
  {
    icon: MousePointer2,
    text: 'UX e Web Design',
  },
  {
    icon: Component,
    text: 'Padrões de interface',
  },
  {
    icon: Palette,
    text: 'Direção visual do site',
  },
];

const motoRemazaProjectCharacteristics = [
  {
    icon: Component,
    text: 'E-commerce e catálogo digital',
  },
  {
    icon: Smartphone,
    text: 'Experiência responsiva',
  },
  {
    icon: Route,
    text: 'Jornadas de pesquisa e compra',
  },
  {
    icon: Users,
    text: 'Contato com diferentes perfis de clientes',
  },
  {
    icon: FileText,
    text: 'Conteúdos de apoio à decisão',
  },
];

const motoRemazaScope = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: Route,
    text: 'Organização das jornadas',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: Smartphone,
    text: 'Interfaces desktop e mobile',
  },
  {
    icon: Component,
    text: 'Prototipação',
  },
  {
    icon: Route,
    text: 'Preparação para evolução do produto',
  },
];

type IconListItem = {
  icon: LucideIcon;
  text: string;
};

const appRemazaLoginFlowImages = [
  {
    src: '/assets/projects/app-remaza/02-fluxo-login.webp',
    alt: 'Fluxo de primeiro acesso e login do APP Remaza com identificação por CPF ou CNPJ e senha',
    caption: 'Fluxo de primeiro acesso e login com identificação da conta, senha e estados de validação.',
  },
];

type CaseImageItem = {
  src?: string;
  alt: string;
  caption: string;
  placeholder?: string;
  fit?: 'cover' | 'contain';
};

const gamp21Participation: IconListItem[] = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: FileText,
    text: 'Organização dos conteúdos',
  },
  {
    icon: Palette,
    text: 'Direção visual',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: Smartphone,
    text: 'Interfaces responsivas',
  },
  {
    icon: Route,
    text: 'Estruturação da jornada entre conteúdos e serviços',
  },
];

const gamp21ProjectCharacteristics: IconListItem[] = [
  {
    icon: Users,
    text: 'Conteúdo para mães e pais',
  },
  {
    icon: GraduationCap,
    text: 'Cursos e orientações',
  },
  {
    icon: Component,
    text: 'Serviços para empresas',
  },
  {
    icon: FileText,
    text: 'Blog “Para mães e pais”',
  },
  {
    icon: Headset,
    text: 'Experiência simples e acolhedora',
  },
];

const gamp21HomeImage: CaseImageItem = {
  src: '/assets/projects/gamp21/home.webp',
  alt: 'Página inicial do Gamp21 com seção de acolhimento para mães, pais e empresas',
  caption: 'Página inicial no desktop, apresentando a proposta do Gamp21 e seus principais caminhos.',
};

const gamp21MobileHomeImage: CaseImageItem = {
  src: '/assets/projects/gamp21/(iPhone%20SE).webp',
  alt: 'Página inicial do Gamp21 em um iPhone SE',
  caption: 'A mesma experiência adaptada para a navegação mobile.',
};

const gamp21ServicesImage: CaseImageItem = {
  src: '/assets/projects/gamp21/servicos.webp',
  alt: 'Página de serviços do Gamp21 com cursos, consultorias e acompanhamentos',
  caption: 'Serviços organizados para famílias, empresas e diferentes momentos da parentalidade.',
};

const gamp21BlogImage: CaseImageItem = {
  src: '/assets/projects/gamp21/blog.webp',
  alt: 'Página Para mães e pais do Gamp21 com listagem de conteúdos',
  caption: 'A área “Para mães e pais” organiza conteúdos acessíveis para as famílias.',
};

const gamp21HomeContentImage: CaseImageItem = {
  src: '/assets/projects/gamp21/home-maes_pais.webp',
  alt: 'Seção Para mães e pais presente na página inicial do Gamp21',
  caption: 'Os conteúdos também aparecem na home como ponto de entrada para novas leituras.',
};

const daitanParticipation: IconListItem[] = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: FileText,
    text: 'Organização dos conteúdos',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: Smartphone,
    text: 'Interfaces responsivas',
  },
  {
    icon: Component,
    text: 'Estruturação das páginas de modelos',
  },
  {
    icon: Route,
    text: 'Organização da experiência de seminovos',
  },
  {
    icon: Headset,
    text: 'Estruturação das áreas de pós-venda',
  },
  {
    icon: UserRoundCog,
    text: 'Criação de formulários e pontos de conversão',
  },
  {
    icon: Palette,
    text: 'Padronização visual entre diferentes áreas do site',
  },
];

const daitanProjectCharacteristics: IconListItem[] = [
  {
    icon: Users,
    text: 'Clientes interessados em modelos novos e sofisticados',
  },
  {
    icon: WalletCards,
    text: 'Busca por seminovos com segurança e procedência',
  },
  {
    icon: Component,
    text: 'Tecnologias, acessórios e serviços de manutenção',
  },
  {
    icon: BadgeDollarSign,
    text: 'Condições corporativas e oportunidades comerciais',
  },
  {
    icon: Headset,
    text: 'Canais de atendimento e relacionamento',
  },
  {
    icon: FileText,
    text: 'Atualizações frequentes de modelos, ofertas e serviços',
  },
];

const consorcioRemazaParticipation: IconListItem[] = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: Component,
    text: 'Simuladores de consórcio',
  },
  {
    icon: Route,
    text: 'Jornadas de conversão',
  },
  {
    icon: Headset,
    text: 'Ferramentas de apoio comercial',
  },
  {
    icon: Users,
    text: 'Orientação para fotografias dos vendedores',
  },
];

const consorcioRemazaProjectCharacteristics: IconListItem[] = [
  {
    icon: WalletCards,
    text: 'Produto financeiro complexo',
  },
  {
    icon: Smartphone,
    text: 'Experiência responsiva',
  },
  {
    icon: BadgeDollarSign,
    text: 'Geração de leads para vendas',
  },
  {
    icon: UserRoundCog,
    text: 'Centrais e ferramentas comerciais',
  },
  {
    icon: FileText,
    text: 'Conteúdo como parte do ecossistema',
  },
];

const consorcioRemazaScope: IconListItem[] = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: FileText,
    text: 'Organização dos conteúdos',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: Smartphone,
    text: 'Interfaces responsivas',
  },
  {
    icon: Component,
    text: 'Estruturação dos simuladores',
  },
  {
    icon: BadgeDollarSign,
    text: 'Criação de jornadas de geração de leads',
  },
  {
    icon: Users,
    text: 'Landing pages para representantes',
  },
  {
    icon: Headset,
    text: 'Organização de canais de atendimento',
  },
  {
    icon: UserRoundCog,
    text: 'Apoio visual à estrutura comercial',
  },
  {
    icon: Palette,
    text: 'Padronização das principais áreas do site',
  },
];

const daitanHomeImage: CaseImageItem = {
  src: '/assets/projects/daitan/home.webp',
  alt: 'Página inicial desktop do site Honda Daitan',
  caption: 'A home apresenta modelos, ofertas, serviços e caminhos de atendimento logo na entrada do site.',
};

const daitanMobileHomeImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/mob-home.webp',
  alt: 'Página inicial mobile do site Honda Daitan',
  caption: 'A experiência mobile organiza os principais caminhos da concessionária desde a entrada no site.',
};

const daitanModelDetailImage: CaseImageItem = {
  src: '/assets/projects/daitan/modelo-detalhe.webp',
  alt: 'Página de detalhe de modelo no site Honda Daitan',
  caption: 'A página de modelo reúne imagem do veículo, versões, cores, ficha técnica e chamadas de conversão.',
};

const daitanModelTechnologyImage: CaseImageItem = {
  src: '/assets/projects/daitan/modelo-evidencia-tecnologica.webp',
  alt: 'Blocos de tecnologia, segurança e conectividade em uma página de modelo da Honda Daitan',
  caption: 'Tecnologias e diferenciais foram organizados em blocos para facilitar a exploração.',
};

const daitanModelMobileImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/mob-hrv-touring(iPhone%20SE).webp',
  alt: 'Página mobile de um modelo Honda HR-V Touring no site Honda Daitan',
  caption: 'No mobile, a página mantém apresentação visual, botões de cotação e test drive em evidência.',
};

const daitanModelMobileDetailsImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/mob-hrv-touring(iPhone%20SE)-2.webp',
  alt: 'Continuação mobile da página de modelo Honda HR-V Touring com versões e diferenciais',
  caption: 'Versões, diferenciais e informações do modelo continuam acessíveis em telas menores.',
};

const daitanUsedListingImage: CaseImageItem = {
  src: '/assets/projects/daitan/seminovos.webp',
  alt: 'Listagem desktop de seminovos no site Honda Daitan',
  caption: 'Listagem desktop com busca, filtros e informações principais dos seminovos.',
};

const daitanUsedMobileFilterImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/seminovos.webp',
  alt: 'Busca e filtros de seminovos no mobile do site Honda Daitan',
  caption: 'Filtros mobile ajudam o usuário a reduzir opções antes do contato.',
};

const daitanUsedMobileDetailImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/seminos-detalhe.webp',
  alt: 'Detalhe mobile de veículo seminovo no site Honda Daitan',
  caption: 'Detalhe do seminovo com fotos e informações para apoiar a continuidade da jornada.',
};

const daitanPartsImage: CaseImageItem = {
  src: '/assets/projects/daitan/pecas-e-acessorios.webp',
  alt: 'Página de peças e acessórios no site Honda Daitan',
  caption: 'Seleção de modelo e exploração de peças e acessórios compatíveis.',
};

const daitanPartsMobileImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/pecas-e-acessorios(iPhone%20SE).webp',
  alt: 'Seleção mobile de modelo na área de peças e acessórios da Honda Daitan',
  caption: 'Seleção do veículo no mobile.',
};

const daitanPartsMobileListImage: CaseImageItem = {
  src: '/assets/projects/daitan/mobile/pecas-e-acessorios(iPhone%20SE)-2.webp',
  alt: 'Listagem mobile de acessórios compatíveis na Honda Daitan',
  caption: 'Listagem de acessórios compatíveis no mobile.',
};

const daitanReviewImage: CaseImageItem = {
  src: '/assets/projects/daitan/revisao-programada-detalhe.webp',
  alt: 'Página de revisão programada com serviços, quilometragem e valores no site Honda Daitan',
  caption: 'Revisão programada com serviços previstos, quilometragem e valores de manutenção.',
};

const daitanCorporateConditionsImage: CaseImageItem = {
  src: '/assets/projects/daitan/condicoes+especiais-pessoajuridica.webp',
  alt: 'Página de condições especiais para pessoa jurídica no site Honda Daitan',
  caption: 'Condições especiais aproximam públicos corporativos da concessionária.',
};

const daitanDirectLineImage: CaseImageItem = {
  src: '/assets/projects/daitan/linha-direta.webp',
  alt: 'Página Linha Direta no site Honda Daitan para dúvidas, sugestões, críticas e elogios',
  caption: 'Linha Direta cria um canal aberto de comunicação com a empresa.',
};

const daitanFooterImage: CaseImageItem = {
  src: '/assets/projects/daitan/footer.webp',
  alt: 'Footer do site Honda Daitan com unidades, canais de contato e caminhos de navegação',
  caption: 'Detalhe final com unidades, contatos e navegação complementar.',
};

const consorcioRemazaHeroPlaceholder: CaseImageItem = {
  src: '/assets/projects/hero-consorcio-remaza.webp',
  alt: 'Imagem principal do case Consórcio Remaza',
  caption: 'Imagem principal do case Consórcio Remaza.',
};

const consorcioRemazaContextImage: CaseImageItem = {
  src: '/assets/projects/consorcio-remaza/home.webp',
  alt: 'Página inicial do site Consórcio Remaza com chamadas para imóveis, automóveis e motocicletas',
  caption: 'A página inicial conecta produtos, simulação e principais caminhos comerciais.',
};

const consorcioRemazaHomeSimulationImage: CaseImageItem = {
  src: '/assets/projects/consorcio-remaza/home-simuleaqui.webp',
  alt: 'Continuação da página inicial do Consórcio Remaza com chamada para simulação',
  caption: 'A simulação aparece como caminho central da jornada comercial.',
};

const consorcioRemazaChallengeImage: CaseImageItem = {
  src: '/assets/projects/consorcio-remaza/simulador-imovel-2.webp',
  alt: 'Etapa de definição de valor no simulador de imóvel do Consórcio Remaza',
  caption: 'Campos, seletores e etapas ajudam o usuário a transformar uma escolha complexa em possibilidades mais concretas.',
};

const consorcioRemazaSimulatorImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/simulador-imovel-1.webp',
    alt: 'Primeira etapa do simulador de imóvel do Consórcio Remaza',
    caption: 'Conte-nos o que você procura',
  },
  {
    src: '/assets/projects/consorcio-remaza/simulador-imovel-2.webp',
    alt: 'Etapa de definição de valor no simulador de imóvel do Consórcio Remaza',
    caption: 'Defina uma faixa de investimento',
  },
  {
    src: '/assets/projects/consorcio-remaza/simulador-imovel-3.webp',
    alt: 'Opções de planos apresentadas no simulador de imóvel do Consórcio Remaza',
    caption: 'Compare as opções disponíveis',
  },
];

const consorcioRemazaMobileSimulatorImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/simulador-imovel(iPhone%2016%20Pro%20Max)-1.webp',
    alt: 'Início da simulação de imóvel no mobile do Consórcio Remaza',
    caption: 'Dados para iniciar a simulação',
  },
  {
    src: '/assets/projects/consorcio-remaza/simulador-imovel(iPhone%2016%20Pro%20Max)-2.webp',
    alt: 'Planos apresentados no mobile do simulador de imóvel do Consórcio Remaza',
    caption: 'Planos apresentados de forma objetiva',
  },
];

const consorcioRemazaCommercialImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/Landing%20Page-1.webp',
    alt: 'Landing page individual de representante do Consórcio Remaza',
    caption: 'Landing pages individuais conectavam divulgação, interesse e geração do contato.',
  },
  {
    src: '/assets/projects/consorcio-remaza/Perfil%20Vendas.webp',
    alt: 'Perfil de vendas com dados e materiais de apoio para representantes do Consórcio Remaza',
    caption: 'A interface complementar reunia dados, documentos e materiais de apoio ao representante.',
  },
];

const consorcioRemazaTrustImage: CaseImageItem = {
  src: '/assets/projects/consorcio-remaza/Perfil%20Vendas.webp',
  alt: 'Recorte do perfil de vendas com fotografia, nome, contato e página individual da representante',
  caption: 'A identificação clara do profissional aproxima a experiência digital do atendimento real.',
};

const consorcioRemazaContentImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/central-noticias.webp',
    alt: 'Central de Notícias do Consórcio Remaza com conteúdos sobre consórcio e assuntos relacionados',
    caption: 'Conteúdos para descoberta e orientação ampliam o papel informativo do site.',
  },
  {
    src: '/assets/projects/consorcio-remaza/duvidas-frequentes.webp',
    alt: 'Página de dúvidas frequentes do Consórcio Remaza',
    caption: 'Respostas rápidas apoiam quem ainda está entendendo como o consórcio funciona.',
  },
];

const consorcioRemazaRelationshipImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/area-cliente.webp',
    alt: 'Área do cliente do Consórcio Remaza',
    caption: 'Acessar serviços',
  },
  {
    src: '/assets/projects/consorcio-remaza/linha-direta.webp',
    alt: 'Linha Direta do Consórcio Remaza para dúvidas e solicitações',
    caption: 'Falar com a empresa',
  },
  {
    src: '/assets/projects/consorcio-remaza/unidades-e-filiais.webp',
    alt: 'Página de unidades e filiais do Consórcio Remaza',
    caption: 'Encontrar uma unidade',
  },
];

const consorcioRemazaOpportunityImages: CaseImageItem[] = [
  {
    src: '/assets/projects/consorcio-remaza/seja-um-representante.webp',
    alt: 'Página Seja um representante do Consórcio Remaza',
    caption: 'Seja um representante apresenta a oportunidade e os recursos para atuação comercial.',
  },
  {
    src: '/assets/projects/consorcio-remaza/trabalhe-conosco.webp',
    alt: 'Página Trabalhe conosco do Consórcio Remaza',
    caption: 'Trabalhe conosco amplia os caminhos para candidatos interessados na organização.',
  },
];

const contextOverviewImage: CaseImageItem = {
  src: '/assets/projects/app-remaza/01-app.webp',
  alt: 'Composição de telas do APP Remaza com informações e serviços do consórcio',
  caption: 'As principais informações e serviços do consórcio reunidos em um único aplicativo.',
  placeholder: 'Dashboard + Pagamentos + Assembleia + Menu',
};

const challengeImages: CaseImageItem[] = [
  {
    src: '/assets/projects/app-remaza/02-tela-inicial+atalhos.webp',
    alt: 'Dashboard do APP Remaza com situação da cota, próxima parcela e atalhos',
    caption: 'Informações importantes visíveis logo no primeiro acesso.',
    placeholder: 'Dashboard + próxima parcela + atalhos',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/02-menuwebp.webp',
    alt: 'Menu do APP Remaza com os serviços disponíveis ao consorciado',
    caption: 'Diferentes serviços organizados para serem encontrados com facilidade.',
    placeholder: 'Menu de serviços',
    fit: 'contain',
  },
];

const usabilityFlowPlaceholders: CaseImageItem[] = [
  {
    src: '/assets/projects/app-remaza/02-fluxo-pagamentos.webp',
    alt: 'Fluxo de pagamento do APP Remaza com seleção da parcela, forma de pagamento e confirmação',
    caption: 'Um caminho direto para consultar e pagar parcelas.',
    placeholder: 'Inserir fluxo de pagamento',
  },
  {
    src: '/assets/projects/app-remaza/04-fluxo-oferta-lance.webp',
    alt: 'Fluxo de oferta de lance no APP Remaza com assembleia, valor, revisão e confirmação',
    caption: 'Clareza em cada etapa para uma decisão financeira importante.',
    placeholder: 'Inserir fluxo de oferta de lance',
  },
];

const designSystemImages: CaseImageItem[] = [
  {
    src: '/assets/projects/app-remaza/01-cores.webp',
    alt: 'Paleta de cores do Design System do APP Remaza com escalas primárias, secundárias e neutras',
    caption: 'Paleta de cores estruturada para estados, superfícies e hierarquia visual.',
    placeholder: 'Elementos fundamentais',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-cores-variantes.webp',
    alt: 'Variantes de cores do Design System do APP Remaza com tokens primários, secundários e estados',
    caption: 'Variantes principais para padronizar feedbacks, contrastes e aplicações recorrentes.',
    placeholder: 'Componentes do produto',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-componentes.webp',
    alt: 'Tipografia e estilos de texto do Design System do APP Remaza',
    caption: 'Escala tipográfica definida para títulos, textos de apoio e leitura em telas móveis.',
    placeholder: 'Componentes aplicados',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-botoes.webp',
    alt: 'Estados e variações de botões do Design System do APP Remaza',
    caption: 'Botões e estados reutilizáveis para ações primárias, secundárias e contornos.',
    placeholder: 'Botões e estados',
    fit: 'contain',
  },
];

const frestoContextImage: CaseImageItem = {
  src: '/assets/projects/fresto/fresto-home.webp',
  alt: 'Captura da página inicial do Fresto com hero, fotografias dos pratos e conteúdo institucional',
  caption: 'Uma experiência digital criada para apresentar a marca e despertar o interesse pelo Fresto.',
  placeholder: 'Inserir visão geral da Home',
  fit: 'contain',
};

const frestoChallengeImages: CaseImageItem[] = [
  {
    src: '/assets/projects/fresto/fresto-comida.webp',
    alt: 'Composição com fotografias de pizza, hambúrguer, prato fresco e sobremesa utilizadas no site do Fresto',
    caption: 'Fotografias escolhidas para provocar desejo e aproximar o usuário da experiência do restaurante.',
    placeholder: 'Inserir composição de pratos',
    fit: 'contain',
  },
];

const frestoUsabilityImages: CaseImageItem[] = [
  {
    src: '/assets/projects/fresto/unidades.webp',
    alt: 'Jornada para conhecer uma unidade do Fresto, passando pela home, seção de unidades, localização e horários',
    caption: 'Informações de cada unidade organizadas para serem encontradas com facilidade.',
    placeholder: 'Inserir jornada das unidades',
    fit: 'contain',
  },
  {
    src: '/assets/projects/fresto/fresto-trabalhe-conosco.webp',
    alt: 'Jornada da página Trabalhe Conosco do Fresto com apresentação de oportunidades e acesso ao canal de candidatura',
    caption: 'Uma experiência visual que orienta quem deseja trabalhar no Fresto.',
    placeholder: 'Inserir experiência Trabalhe Conosco',
    fit: 'contain',
  },
];

const frestoDesignSystemImages: CaseImageItem[] = [
  {
    src: '/assets/projects/fresto/componentes.webp',
    alt: 'Elementos visuais do site Fresto, incluindo paleta de cores, tipografia, botões, ícones e tratamentos de imagem',
    caption: 'Elementos visuais que aproximam a interface da personalidade do Fresto.',
    placeholder: 'Inserir cores + tipografia + botões',
    fit: 'contain',
  },
];

const frestoLearningImage: CaseImageItem = {
  src: '/assets/projects/fresto/fresto-redes-sociais.webp',
  alt: 'Seção da página inicial do Fresto com feed do Instagram integrado mostrando publicações da marca',
  caption: 'O conteúdo das redes sociais também ajuda a manter o site conectado às novidades da marca.',
  placeholder: 'Inserir seção do Instagram integrada à Home',
  fit: 'contain',
};

const motoRemazaContextImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/1-home.webp',
  alt: 'Visão geral do site Moto Remaza com modelos de motos, chamadas de compra e conteúdos de apoio',
  caption: 'Visão geral da nova home do Moto Remaza.',
  placeholder: '[INSERIR IMAGEM — Visão geral da nova home do Moto Remaza]',
  fit: 'contain',
};

const motoRemazaChallengeImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/motoremaza-listagem.webp',
    alt: 'Página de categoria ou listagem de motos da Moto Remaza com filtros e modelos em destaque',
    caption: 'Pesquisa e comparação como parte central da jornada.',
    placeholder: '[INSERIR IMAGEM — Listagem de modelos e categorias]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-diferenciais.webp',
    alt: 'Página de detalhe de uma moto com informações técnicas, imagem do modelo e chamada para contato',
    caption: 'Informações importantes organizadas para apoiar a decisão.',
    placeholder: '[INSERIR IMAGEM — Detalhe de modelo com informações principais]',
    fit: 'contain',
  },
];

const motoRemazaProcessImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/motoremaza-fluxo.webp',
  alt: 'Visão geral das interfaces ou fluxo principal do projeto Moto Remaza',
  caption: 'Visão geral das interfaces e do fluxo principal do projeto.',
  placeholder: '[INSERIR IMAGEM — Visão geral das interfaces ou fluxo principal do projeto]',
  fit: 'contain',
};

const motoRemazaResearchImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/motoremaza-diferenciais.webp',
  alt: 'Síntese visual dos direcionamentos da pesquisa do projeto Moto Remaza',
  caption: 'Direcionamentos reais identificados a partir das conversas com stakeholders e motociclistas.',
  placeholder: '[INSERIR IMAGEM — Síntese visual dos direcionamentos da pesquisa]',
  fit: 'contain',
};

const motoRemazaNavigationImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/1-home.webp',
    alt: 'Header e menus de navegação do site Moto Remaza',
    caption: 'Header e menus de navegação planejados para acesso direto às principais áreas.',
    placeholder: '[INSERIR IMAGEM — Header e menus de navegação]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-listagem.webp',
    alt: 'Mega menu ou atalhos para modelos e serviços do site Moto Remaza',
    caption: 'Atalhos estratégicos conectam modelos, serviços e momentos da jornada.',
    placeholder: '[INSERIR IMAGEM — Mega menu ou atalhos para modelos e serviços]',
    fit: 'contain',
  },
];

const motoRemazaModelImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/motoremaza-modelos.webp',
    alt: 'Catálogo de modelos com categorias do site Moto Remaza',
    caption: 'Catálogo de modelos organizado por categorias e necessidades de uso.',
    placeholder: '[INSERIR IMAGEM — Catálogo de modelos com categorias]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-diferenciais.webp',
    alt: 'Página de detalhes de uma motocicleta no site Moto Remaza',
    caption: 'Página de detalhes com versões, cores e informações do modelo.',
    placeholder: '[INSERIR IMAGEM — Página de detalhes de uma motocicleta]',
    fit: 'contain',
  },
];

const motoRemazaUsedImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/motoremaza-seminovos copiar.webp',
    alt: 'Listagem de motos seminovas com filtros no site Moto Remaza',
    caption: 'Filtros e informações organizadas para facilitar a busca por seminovos.',
    placeholder: '[INSERIR IMAGEM — Listagem de motos seminovas com filtros]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-seminovos-detalhes copiar.webp',
    alt: 'Página de detalhes de uma moto seminova no site Moto Remaza',
    caption: 'Detalhes de uma moto seminova apresentados de forma prática e profissional.',
    placeholder: '[INSERIR IMAGEM — Página de detalhes de uma moto seminova]',
    fit: 'contain',
  },
];

const motoRemazaServiceImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/motoremaza-test-ride copiar.webp',
    alt: 'Agendamento de test-ride no site Moto Remaza',
    caption: 'Test-ride como parte da jornada de descoberta e decisão.',
    placeholder: '[INSERIR IMAGEM — Agendamento de test-ride]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-agendar-revisao copiar.webp',
    alt: 'Agendamento de serviços e revisão no site Moto Remaza',
    caption: 'Serviços e revisão conectam o site à rotina de cuidado com a moto.',
    placeholder: '[INSERIR IMAGEM — Agendamento de serviços e revisão]',
    fit: 'contain',
  },
  {
    src: '/assets/projects/moto-remaza/motoremaza-pecas.webp',
    alt: 'Peças, acessórios e assistência técnica no site Moto Remaza',
    caption: 'Peças, acessórios e assistência técnica reunidos no ecossistema digital.',
    placeholder: '[INSERIR IMAGEM — Peças, acessórios e assistência técnica]',
    fit: 'contain',
  },
];

const motoRemazaNextStepsImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/motoremaza-pecas-plp.webp',
  alt: 'Conceito da futura área personalizada por modelo de moto no site Moto Remaza',
  caption: 'Evolução planejada: uma área personalizada por modelo de moto, ainda não disponível na versão atual.',
  placeholder: '[INSERIR IMAGEM — Conceito da futura área personalizada por modelo de moto]',
  fit: 'contain',
};

const motoRemazaRelationshipImages: CaseImageItem[] = [
  {
    src: '/assets/projects/moto-remaza/motoremaza-falediretoria copiar.webp',
    alt: 'Canal de comunicação com a diretoria no site Moto Remaza',
    caption: 'Canal de comunicação com a diretoria como parte da cultura de escuta do Grupo Remaza.',
    placeholder: '[INSERIR IMAGEM — Canal de comunicação com a diretoria]',
    fit: 'contain',
  },
];

const motoRemazaLearningImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/motoremaza-diferentes-relacoes.webp',
  alt: 'Motociclista em uma situação de uso real ou composição com diferentes jornadas',
  caption: 'Uma composição mais editorial sobre as diferentes relações das pessoas com a moto.',
  placeholder: '[INSERIR IMAGEM — Motociclista em uma situação de uso real ou composição com diferentes jornadas]',
};

const motoRemazaConclusionImage: CaseImageItem = {
  src: '/assets/projects/moto-remaza/1-home-mobile.webp',
  alt: 'Composição final com telas mobile do Moto Remaza',
  caption: 'Composição final com telas mobile do Moto Remaza.',
  placeholder: '[INSERIR IMAGEM — Composição final com telas desktop e mobile do Moto Remaza]',
  fit: 'contain',
};

const motoRemazaDirectionItems = [
  {
    icon: Route,
    text: 'Navegação mais direta',
  },
  {
    icon: FileText,
    text: 'Informações fáceis de encontrar',
  },
  {
    icon: Headset,
    text: 'Melhor acesso aos serviços',
  },
  {
    icon: MousePointer2,
    text: 'Canais de atendimento visíveis',
  },
  {
    icon: Users,
    text: 'Experiência adequada a diferentes perfis',
  },
];

function ContextList({ title, items }: { title: string; items: IconListItem[] }) {
  return (
    <div>
      <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{title}</h3>
      <ul className="mt-6 grid gap-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]" strokeWidth={2.2} />
            <span className="font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScopeBlock({ title = 'Principais entregas', items = appRemazaScope }: { title?: string; items?: IconListItem[] }) {
  return (
    <div className="mt-14 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:py-12">
      <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{title}</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-x-10">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseImageSlot({
  image,
  aspectClass = 'aspect-[16/8]',
  onZoom,
}: {
  image: CaseImageItem;
  aspectClass?: string;
  onZoom?: () => void;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const openZoom = () => {
    if (onZoom) {
      onZoom();
      return;
    }

    setIsLightboxOpen(true);
  };

  const imageContent = image.src ? (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
    />
  ) : (
    // Substitua o placeholder pelo caminho da imagem final deste bloco quando o material estiver pronto.
    <div className="flex h-full min-h-48 w-full items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--off-white)_0%,#eef4fb_100%)] px-6 text-center dark:bg-[linear-gradient(135deg,rgba(103,149,202,0.12)_0%,rgba(70,177,153,0.08)_100%)]">
      <span className="font-display text-sm font-extrabold text-[var(--blue-padrao)]/45 dark:text-white/45">
        {image.placeholder}
      </span>
    </div>
  );

  return (
    <figure>
      {image.src ? (
        <button
          type="button"
          className={`group relative block w-full overflow-hidden rounded-md bg-[#edf4fb] text-left shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:bg-[rgba(20,51,79,0.42)] dark:focus-visible:ring-offset-[var(--fundo)] ${aspectClass}`}
          onClick={openZoom}
          aria-label={`Ampliar imagem: ${image.alt}`}
        >
          {imageContent}
          <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--blue-padrao)] shadow-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[var(--tradewind-claro)]">
            <ZoomIn size={26} strokeWidth={2.6} aria-hidden="true" />
          </span>
        </button>
      ) : (
        <div className={`overflow-hidden rounded-md bg-[#edf4fb] shadow-soft dark:bg-[rgba(20,51,79,0.42)] ${aspectClass}`}>
          {imageContent}
        </div>
      )}
      <figcaption className="mt-4 font-sans text-sm leading-6 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
        {image.caption}
      </figcaption>

      {image.src && !onZoom && (
        <CaseImageLightbox image={image} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
      )}
    </figure>
  );
}

function CaseImageLightbox({
  image,
  isOpen,
  onClose,
}: {
  image: CaseImageItem;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [canUsePortal, setCanUsePortal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const minZoom = 1;
  const maxZoom = 4;

  useEffect(() => {
    setCanUsePortal(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsClosing(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        increaseZoom();
      }

      if (event.key === '-') {
        event.preventDefault();
        decreaseZoom();
      }

      if (event.key === '0') {
        event.preventDefault();
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function closeLightbox() {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 180);
  }

  function increaseZoom() {
    setZoom((currentZoom) => Math.min(maxZoom, Number((currentZoom + 0.5).toFixed(1))));
  }

  function decreaseZoom() {
    setZoom((currentZoom) => {
      const nextZoom = Math.max(minZoom, Number((currentZoom - 0.5).toFixed(1)));

      if (nextZoom === minZoom) {
        setPosition({ x: 0, y: 0 });
      }

      return nextZoom;
    });
  }

  function resetZoom() {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();

    if (event.deltaY < 0) {
      increaseZoom();
      return;
    }

    decreaseZoom();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.stopPropagation();

    if (zoom <= minZoom) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current || dragState.current.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    setPosition({
      x: dragState.current.originX + event.clientX - dragState.current.startX,
      y: dragState.current.originY + event.clientY - dragState.current.startY,
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current || dragState.current.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    dragState.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  if (!isOpen) {
    return null;
  }

  const lightbox = (
    <div
      className={`fixed inset-0 z-[999] grid bg-[rgba(8,31,51,0.92)] p-4 text-white backdrop-blur-sm md:p-6 ${
        isClosing ? 'case-lightbox-out' : 'case-lightbox-in'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={closeLightbox}
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 md:right-6 md:top-6">
        <div className="flex items-center overflow-hidden rounded-md border border-white/20 bg-white text-[var(--blue-padrao)] shadow-soft">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center transition hover:bg-[var(--tradewind-claro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)]"
            onClick={(event) => {
              event.stopPropagation();
              decreaseZoom();
            }}
            disabled={zoom <= minZoom}
            aria-label="Diminuir zoom"
          >
            <Minus size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="min-w-14 border-x border-[var(--cinza-claro)] px-3 py-3 text-center font-display text-xs font-extrabold transition hover:bg-[var(--tradewind-claro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)]"
            onClick={(event) => {
              event.stopPropagation();
              resetZoom();
            }}
            aria-label="Resetar zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center transition hover:bg-[var(--tradewind-claro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)]"
            onClick={(event) => {
              event.stopPropagation();
              increaseZoom();
            }}
            disabled={zoom >= maxZoom}
            aria-label="Aumentar zoom"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-[var(--blue-padrao)] shadow-soft transition hover:bg-[var(--tradewind-claro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--blue-escuro)]"
          onClick={(event) => {
            event.stopPropagation();
            closeLightbox();
          }}
          aria-label="Fechar imagem ampliada"
        >
          <X size={22} strokeWidth={2.4} />
        </button>
      </div>

      <figure
        className={`grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-4 pt-16 ${isClosing ? 'case-lightbox-figure-out' : 'case-lightbox-figure-in'}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`flex min-h-0 touch-none items-center justify-center overflow-hidden rounded-md bg-white/8 shadow-soft ${
            zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          onClick={(event) => event.stopPropagation()}
          onDoubleClick={(event) => {
            event.stopPropagation();
            increaseZoom();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="block max-h-full max-w-full select-none rounded-md bg-white object-contain"
            draggable={false}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 160ms ease-out',
            }}
          />
        </div>
        <figcaption className="font-sans text-sm leading-6 text-white/86">
          {image.caption}
        </figcaption>
      </figure>
    </div>
  );

  return canUsePortal ? createPortal(lightbox, document.body) : lightbox;
}

function CaseSectionText({ section, index }: { section: CaseSection; index: number }) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span className="caption font-extrabold text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="h-px w-8 bg-[var(--tradewind-padrao)] dark:bg-[var(--blue-border)]" aria-hidden="true" />
        <p className="caption font-semibold uppercase text-[var(--cinza-escuro)] dark:text-white">
          {section.label}
        </p>
      </div>

      <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,4vw,2.2rem)] font-extrabold leading-[1.08] tracking-[0.02em] text-[var(--blue-padrao)] dark:text-white">
        {section.title}
      </h2>

      <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
        {section.intro}
      </p>

      {section.complement && (
        <p className="mt-5 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
          {section.complement}
        </p>
      )}

      {section.extraParagraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--tradewind-padrao)]" aria-hidden="true" />
              <span className="font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProjectBreadcrumb({ currentTitle, currentHref, inverted = false }: { currentTitle: string; currentHref: string; inverted?: boolean }) {
  const linkColor = 'rgb(70 177 153 / var(--tw-bg-opacity, 1))';
  const linkClass = inverted
    ? 'focus-visible:ring-white'
    : 'focus-visible:ring-[var(--tradewind-padrao)]';
  const currentClass = inverted
    ? 'text-white'
    : 'text-[var(--blue-padrao)] dark:text-white';
  const separatorClass = inverted
    ? 'text-white/45'
    : 'text-[var(--cinza-escuro)]/45 dark:text-white/36';

  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex max-w-[calc(100vw-2.5rem)] flex-wrap items-center gap-2 font-display text-base font-bold"
    >
      <a
        href="/"
        className={`rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          inverted ? 'focus-visible:ring-offset-[var(--blue-escuro)]' : 'focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--fundo)]'
        } ${linkClass}`}
        style={{ color: linkColor }}
        aria-label="Home"
      >
        <Home size={16} strokeWidth={2.4} aria-hidden="true" />
      </a>
      <span className={separatorClass} aria-hidden="true">
        &gt;
      </span>
      <a
        href="/#projetos"
        className={`rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          inverted ? 'focus-visible:ring-offset-[var(--blue-escuro)]' : 'focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--fundo)]'
        } ${linkClass}`}
        style={{ color: linkColor }}
      >
        Projetos
      </a>
      <span className={separatorClass} aria-hidden="true">
        &gt;
      </span>
      <a
        href={currentHref}
        className={`rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          inverted ? 'focus-visible:ring-white focus-visible:ring-offset-[var(--blue-escuro)]' : 'focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--fundo)]'
        } ${currentClass}`}
        style={{ color: linkColor }}
        aria-current="page"
      >
        {currentTitle}
      </a>
    </nav>
  );
}

function ProjectCaseContentHeader({ currentTitle, currentHref }: { currentTitle: string; currentHref: string }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 md:pb-24">
      <ProjectBreadcrumb currentTitle={currentTitle} currentHref={currentHref} />
    </div>
  );
}

function CaseImpactBlock({ content }: { content: CaseImpactContent }) {
  const testimonial =
    content.testimonial?.text &&
    content.testimonial.name &&
    content.testimonial.role &&
    content.testimonial.company
      ? content.testimonial
      : null;
  const gridClass = content.items.length >= 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3';

  return (
    <div className="mt-12 grid gap-6">
      <div className={`grid gap-5 ${gridClass}`}>
        {content.items.map(({ category, title, text, icon: Icon }) => (
          <article
            key={category}
            className="rounded-md border border-[var(--cinza-claro)] bg-white p-6 shadow-soft dark:border-[var(--blue-padrao)] dark:bg-[rgba(20,51,79,0.42)]"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]" strokeWidth={2.2} aria-hidden="true" />
              <p className="caption font-bold uppercase text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
                {category}
              </p>
            </div>
            <h3 className="mt-5 font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">
              {title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-6 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
              {text}
            </p>
          </article>
        ))}
      </div>

      {content.note && (
        <p className="max-w-3xl rounded-md border border-[var(--cinza-claro)] bg-[var(--off-white)] px-6 py-5 font-sans text-base leading-7 text-[var(--cinza-escuro)] shadow-soft dark:border-[var(--blue-padrao)] dark:bg-[rgba(20,51,79,0.42)] dark:text-[var(--cinza-claro)]">
          {content.note}
        </p>
      )}

      {testimonial && (
        <blockquote className="rounded-md border border-[var(--cinza-claro)] bg-[var(--off-white)] p-6 shadow-soft dark:border-[var(--blue-padrao)] dark:bg-[rgba(20,51,79,0.42)]">
          <p className="font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
            {testimonial.text}
          </p>
          <footer className="mt-4 font-display text-sm font-extrabold text-[var(--blue-padrao)] dark:text-white">
            {testimonial.name} · {testimonial.role} · {testimonial.company}
          </footer>
        </blockquote>
      )}
    </div>
  );
}

function CaseContextBlock({
  leftTitle = 'Público principal',
  leftItems = appRemazaPrimaryAudience,
  rightTitle = 'Necessidades',
  rightItems = appRemazaNeeds,
  image = contextOverviewImage,
}: {
  leftTitle?: string;
  leftItems?: IconListItem[];
  rightTitle?: string;
  rightItems?: IconListItem[];
  image?: CaseImageItem;
}) {
  return (
    <div className="mt-14 grid gap-10">
      <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
        <ContextList title={leftTitle} items={leftItems} />
        <ContextList title={rightTitle} items={rightItems} />
      </div>

      <CaseImageSlot image={image} aspectClass="aspect-[16/8] min-h-[22rem]" />
    </div>
  );
}

function CaseImageGallery() {
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">Fluxo 1 - Primeiro acesso</h3>
        <p className="mt-3 max-w-2xl font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
          Um primeiro acesso guiado, seguro e sem etapas desnecessárias.
        </p>
      </div>

      <div className="grid gap-[30px]">
        <CaseImageSlot image={appRemazaLoginFlowImages[0]} aspectClass="h-auto" />
        {appRemazaLoginFlowImages.length > 1 && (
          <div className="grid gap-[30px] md:grid-cols-2">
            {appRemazaLoginFlowImages.slice(1).map((image) => (
              <CaseImageSlot
                key={image.src}
                image={image}
                aspectClass="h-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChallengeVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <div className="grid gap-[30px] md:grid-cols-2">
        {challengeImages.map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function UsabilityVisualBlock() {
  return (
    <div className="grid gap-12">
      <CaseImageGallery />

      <div>
        <div className="mb-6">
          <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">Fluxo 2 - Pagamento</h3>
        </div>
        <CaseImageSlot image={usabilityFlowPlaceholders[0]} aspectClass="aspect-[16/8]" />
      </div>

      <div>
        <div className="mb-6">
          <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">Fluxo 3 - Oferta de lance</h3>
        </div>
        <CaseImageSlot image={usabilityFlowPlaceholders[1]} aspectClass="aspect-[16/8]" />
      </div>
    </div>
  );
}

function DesignSystemVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <div className="grid gap-[30px] md:grid-cols-2">
        {designSystemImages.map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function FrestoContextBlock() {
  return (
    <CaseContextBlock
      leftTitle="Minha participação"
      leftItems={frestoParticipation}
      rightTitle="Características do projeto"
      rightItems={frestoProjectCharacteristics}
      image={frestoContextImage}
    />
  );
}

function FrestoChallengeVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={frestoChallengeImages[0]} aspectClass="aspect-[16/8]" />
    </div>
  );
}

function FrestoUsabilityVisualBlock() {
  return (
    <div className="mt-12 grid gap-12">
      {frestoUsabilityImages.map((image, index) => (
        <div key={image.caption}>
          <div className="mb-6">
            <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">
              {index === 0 ? 'Conhecer uma unidade' : 'Encontrar uma oportunidade'}
            </h3>
          </div>
          <CaseImageSlot image={image} aspectClass="aspect-[16/8]" />
        </div>
      ))}
    </div>
  );
}

function FrestoDesignSystemVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={frestoDesignSystemImages[0]} aspectClass="aspect-[16/8]" />
    </div>
  );
}

function MotoRemazaContextBlock() {
  return (
    <CaseContextBlock
      leftTitle="Minha participação"
      leftItems={motoRemazaParticipation}
      rightTitle="Características do projeto"
      rightItems={motoRemazaProjectCharacteristics}
      image={motoRemazaContextImage}
    />
  );
}

function MotoRemazaChallengeVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={motoRemazaChallengeImages[0]} aspectClass="aspect-[16/8]" />
      <div className="grid gap-[30px] md:grid-cols-2">
        {motoRemazaChallengeImages.slice(1).map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function MotoRemazaUsabilityVisualBlock() {
  return (
    <div className="mt-12 grid gap-12">
      {motoRemazaNavigationImages.map((image, index) => (
        <div key={image.caption}>
          <div className="mb-6">
            <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">
              {index === 0 ? 'Header e menus' : 'Atalhos para modelos e serviços'}
            </h3>
          </div>
          <CaseImageSlot image={image} aspectClass="aspect-[16/8]" />
        </div>
      ))}
    </div>
  );
}

function MotoRemazaImagePairBlock({ images, titles }: { images: CaseImageItem[]; titles: string[] }) {
  return (
    <div className={`mt-12 grid gap-12 ${images.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {images.map((image, index) => (
        <div key={image.caption}>
          <div className="mb-6">
            <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{titles[index]}</h3>
          </div>
          <CaseImageSlot image={image} aspectClass="aspect-[16/8]" />
        </div>
      ))}
    </div>
  );
}

function Gamp21ResponsiveVisualBlock() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end lg:grid-cols-[minmax(0,1fr)_15rem]">
      <CaseImageSlot image={gamp21HomeImage} aspectClass="aspect-[16/9]" />
      <CaseImageSlot image={gamp21MobileHomeImage} aspectClass="aspect-[9/16]" />
    </div>
  );
}

function CaseCropCard({
  image,
  title,
  className = '',
  imageClassName = '',
}: {
  image: CaseImageItem;
  title: string;
  className?: string;
  imageClassName?: string;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <figure className={`flex flex-col overflow-hidden rounded-md bg-[#edf4fb] shadow-soft dark:bg-[rgba(20,51,79,0.42)] ${className}`}>
      <button
        type="button"
        className="group relative block min-h-[14rem] w-full flex-1 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[var(--fundo)]"
        onClick={() => setIsLightboxOpen(true)}
        aria-label={`Ampliar imagem: ${image.alt}`}
      >
        <img
          src={image.src ?? ''}
          alt={image.alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.015] ${imageClassName}`}
        />
        <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--blue-padrao)] shadow-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[var(--tradewind-claro)]">
          <ZoomIn size={24} strokeWidth={2.6} aria-hidden="true" />
        </span>
      </button>
      <figcaption className="border-t border-white/70 bg-white px-5 py-4 font-display text-sm font-extrabold text-[var(--blue-padrao)] dark:border-white/10 dark:bg-[rgba(8,31,51,0.62)] dark:text-white">
        {title}
      </figcaption>

      {image.src && (
        <CaseImageLightbox image={image} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
      )}
    </figure>
  );
}

function Gamp21ScopeVisualBlock() {
  return (
    <div className="grid gap-10">
      <ScopeBlock title="Escopo de atuação" items={gamp21Participation} />
      <div className="grid gap-[30px] md:grid-cols-[1.15fr_0.85fr]">
        <CaseCropCard
          image={gamp21HomeImage}
          title="Home e caminhos principais"
          className="md:min-h-[24rem]"
          imageClassName="object-top"
        />
        <div className="grid gap-[30px]">
          <CaseCropCard
            image={gamp21ServicesImage}
            title="Serviços"
            className="min-h-[13rem]"
            imageClassName="object-top"
          />
          <CaseCropCard
            image={gamp21BlogImage}
            title="Conteúdo"
            className="min-h-[13rem]"
            imageClassName="object-top"
          />
        </div>
      </div>
    </div>
  );
}

function Gamp21BlogVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px] md:grid-cols-[1fr_0.72fr] md:items-end">
      <CaseImageSlot image={gamp21BlogImage} aspectClass="aspect-[16/10]" />
      <CaseImageSlot image={gamp21HomeContentImage} aspectClass="aspect-[4/3]" />
    </div>
  );
}

function DaitanContextVisualBlock() {
  return (
    <div className="mt-14 grid gap-10">
      <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
        <ContextList title="Minha participação" items={daitanParticipation} />
        <ContextList title="Características do projeto" items={daitanProjectCharacteristics} />
      </div>
      <div className="grid gap-[30px]">
        <CaseImageSlot image={daitanHomeImage} aspectClass="aspect-[16/10] min-h-[24rem]" />
        <div className="grid items-start gap-[30px] sm:grid-cols-3">
          <CaseCropCard image={daitanModelDetailImage} title="Modelos" className="min-h-[15rem]" imageClassName="object-top" />
          <CaseCropCard image={daitanUsedListingImage} title="Seminovos" className="min-h-[15rem]" imageClassName="object-top" />
          <CaseCropCard image={daitanPartsImage} title="Pós-venda" className="min-h-[15rem]" imageClassName="object-top" />
        </div>
      </div>
    </div>
  );
}

function DaitanScopeVisualBlock() {
  return (
    <ScopeBlock title="Escopo de atuação" items={daitanParticipation} />
  );
}

function DaitanNewCarsVisualBlock() {
  return (
    <div className="mt-12 grid gap-12">
      <CaseImageSlot image={daitanModelDetailImage} aspectClass="aspect-[16/10] min-h-[24rem]" />
    </div>
  );
}

function DaitanTechnologyVisualBlock() {
  return (
    <div className="mt-12">
      <CaseCropCard
        image={daitanModelTechnologyImage}
        title="Tecnologia, segurança e conectividade"
        className="min-h-[24rem] md:min-h-[30rem]"
        imageClassName="object-center"
      />
    </div>
  );
}

function DaitanUsedCarsVisualBlock() {
  return (
    <div className="mt-12 grid gap-10">
      <div className="grid gap-3 border-y border-[var(--cinza-claro)] py-6 dark:border-[var(--blue-padrao)] sm:grid-cols-3">
        {['Buscar', 'Filtrar', 'Conhecer o veículo'].map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="caption font-extrabold text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-display text-base font-extrabold text-[var(--blue-padrao)] dark:text-white">{step}</p>
          </div>
        ))}
      </div>
      <div className="grid items-start gap-[30px] md:grid-cols-[1fr_0.72fr]">
        <CaseImageSlot image={daitanUsedListingImage} aspectClass="aspect-[16/10]" />
        <CaseImageSlot image={daitanUsedMobileDetailImage} aspectClass="aspect-[9/16]" />
      </div>
    </div>
  );
}

function DaitanAfterSalesVisualBlock() {
  return (
    <div className="mt-12 grid gap-12">
      <div>
        <div className="mb-6">
          <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">Seleção do veículo e acessórios</h3>
        </div>
        <div className="grid items-start gap-[30px] md:grid-cols-[1fr_0.78fr]">
          <CaseImageSlot image={daitanPartsImage} aspectClass="aspect-[16/10]" />
          <CaseImageSlot image={daitanPartsMobileListImage} aspectClass="aspect-[9/16]" />
        </div>
      </div>
      <div>
        <div className="mb-6">
          <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">Revisão programada</h3>
        </div>
        <CaseImageSlot image={daitanReviewImage} aspectClass="aspect-[16/10] min-h-[24rem]" />
      </div>
    </div>
  );
}

function DaitanRelationshipVisualBlock() {
  return (
    <div className="mt-12 grid items-start gap-[30px] md:grid-cols-2">
      <CaseImageSlot image={daitanCorporateConditionsImage} aspectClass="aspect-[16/10]" />
      <CaseImageSlot image={daitanDirectLineImage} aspectClass="aspect-[16/10]" />
    </div>
  );
}

function DaitanResponsiveVisualBlock() {
  const mobileImages = [
    daitanMobileHomeImage,
    daitanModelMobileImage,
    daitanModelMobileDetailsImage,
    daitanUsedMobileFilterImage,
    daitanUsedMobileDetailImage,
    daitanPartsMobileImage,
    daitanPartsMobileListImage,
  ];

  return (
    <div className="mt-12 grid items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
      {mobileImages.map((image, index) => (
        <div key={image.caption} className={index % 2 === 0 ? 'lg:pt-10' : ''}>
          <CaseImageSlot image={image} aspectClass="aspect-[9/16]" />
        </div>
      ))}
    </div>
  );
}

function MotoRemazaServicesVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={motoRemazaServiceImages[0]} aspectClass="aspect-[16/8]" />
      <div className="grid gap-[30px] md:grid-cols-2">
        {motoRemazaServiceImages.slice(1).map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function MotoRemazaResearchVisualBlock() {
  return (
    <div className="mt-12 grid gap-10">
      <ScopeBlock title="Direcionamentos identificados" items={motoRemazaDirectionItems} />
      <CaseImageSlot image={motoRemazaResearchImage} aspectClass="aspect-[16/8]" />
    </div>
  );
}

function ConsorcioRemazaContextBlock() {
  return (
    <div className="mt-14 grid gap-10">
      <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
        <ContextList title="Minha participação" items={consorcioRemazaParticipation} />
        <ContextList title="Características do projeto" items={consorcioRemazaProjectCharacteristics} />
      </div>
      <div className="grid gap-[30px]">
        <CaseImageSlot image={consorcioRemazaContextImage} aspectClass="aspect-[16/9] min-h-[24rem]" />
        <CaseCropCard
          image={consorcioRemazaHomeSimulationImage}
          title="Simule aqui como continuidade da home"
          className="min-h-[20rem]"
          imageClassName="object-top"
        />
      </div>
    </div>
  );
}

function ConsorcioRemazaScopeVisualBlock() {
  return (
    <ScopeBlock title="Escopo de atuação" items={consorcioRemazaScope} />
  );
}

function ConsorcioRemazaChallengeVisualBlock() {
  return (
    <div className="mt-12 grid items-start gap-[18px] sm:grid-cols-3">
      {[
        { image: consorcioRemazaSimulatorImages[0], title: 'Etapas da simulação' },
        { image: consorcioRemazaSimulatorImages[1], title: 'Faixa de investimento' },
        { image: consorcioRemazaSimulatorImages[2], title: 'Cards de planos' },
      ].map(({ image, title }) => (
        <CaseCropCard key={title} image={image} title={title} className="min-h-[13rem]" imageClassName="object-center" />
      ))}
    </div>
  );
}

function ConsorcioRemazaSimulationVisualBlock() {
  return (
    <div className="mt-12 grid gap-10">
      <div className="grid gap-3 border-y border-[var(--cinza-claro)] py-6 dark:border-[var(--blue-padrao)] sm:grid-cols-3">
        {consorcioRemazaSimulatorImages.map((image, index) => (
          <div key={image.caption} className="flex items-center gap-3">
            <span className="caption font-extrabold text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-display text-base font-extrabold text-[var(--blue-padrao)] dark:text-white">{image.caption}</p>
          </div>
        ))}
      </div>
      <div className="grid items-start gap-[30px] lg:grid-cols-3">
        {consorcioRemazaSimulatorImages.map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[16/10] min-h-[19rem]" />
        ))}
      </div>
    </div>
  );
}

function ConsorcioRemazaMobileVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px] sm:grid-cols-2 sm:items-start md:max-w-3xl">
      {consorcioRemazaMobileSimulatorImages.map((image) => (
        <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[9/16]" />
      ))}
    </div>
  );
}

function ConsorcioRemazaCommercialVisualBlock() {
  return (
    <div className="mt-12 grid gap-10">
      <div className="grid gap-3 border-y border-[var(--cinza-claro)] py-6 dark:border-[var(--blue-padrao)] sm:grid-cols-3">
        {['Divulgação individual', 'Geração do contato', 'Apoio ao representante'].map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="caption font-extrabold text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-display text-base font-extrabold text-[var(--blue-padrao)] dark:text-white">{step}</p>
          </div>
        ))}
      </div>
      <div>
        <CaseCropCard
          image={consorcioRemazaCommercialImages[0]}
          title="Landing page individual"
          className="min-h-[30rem]"
          imageClassName="object-top"
        />
      </div>
    </div>
  );
}

function ConsorcioRemazaTrustVisualBlock() {
  return (
    <div className="mt-12">
      <CaseCropCard
        image={consorcioRemazaTrustImage}
        title="Fotografia, nome, contato e acesso à página individual"
        className="min-h-[24rem] md:min-h-[30rem]"
        imageClassName="object-center"
      />
    </div>
  );
}

function ConsorcioRemazaContentVisualBlock() {
  return (
    <div className="mt-12 grid items-start gap-[30px] md:grid-cols-2">
      <CaseCropCard image={consorcioRemazaContentImages[0]} title="Central de notícias" className="min-h-[22rem]" imageClassName="object-top" />
      <CaseCropCard image={consorcioRemazaContentImages[1]} title="Dúvidas frequentes" className="min-h-[22rem]" imageClassName="object-top" />
    </div>
  );
}

function ConsorcioRemazaRelationshipVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={consorcioRemazaRelationshipImages[0]} aspectClass="aspect-[16/10] min-h-[22rem]" />
      <div className="grid items-start gap-[30px] md:grid-cols-2">
        <CaseCropCard image={consorcioRemazaRelationshipImages[1]} title="Falar com a empresa" className="min-h-[16rem]" imageClassName="object-top" />
        <CaseCropCard image={consorcioRemazaRelationshipImages[2]} title="Encontrar uma unidade" className="min-h-[16rem]" imageClassName="object-top" />
      </div>
    </div>
  );
}

function ConsorcioRemazaOpportunitiesVisualBlock() {
  return (
    <div className="mt-12 grid items-start gap-[30px] md:grid-cols-2">
      <CaseCropCard image={consorcioRemazaOpportunityImages[0]} title="Seja um representante" className="min-h-[22rem]" imageClassName="object-top" />
      <CaseCropCard image={consorcioRemazaOpportunityImages[1]} title="Trabalhe conosco" className="min-h-[22rem]" imageClassName="object-top" />
    </div>
  );
}

function CaseVisualBlock({ variant }: { variant: string }) {
  if (variant.startsWith('impact-')) {
    return <CaseImpactBlock content={caseImpactContent[variant]} />;
  }

  if (variant === 'context') {
    return <CaseContextBlock />;
  }

  if (variant === 'scope') {
    return <ScopeBlock />;
  }

  if (variant === 'challenge') {
    return <ChallengeVisualBlock />;
  }

  if (variant === 'usability') {
    return <UsabilityVisualBlock />;
  }

  if (variant === 'design-system') {
    return <DesignSystemVisualBlock />;
  }

  if (variant === 'fresto-context') {
    return <FrestoContextBlock />;
  }

  if (variant === 'fresto-scope') {
    return <ScopeBlock items={frestoScope} />;
  }

  if (variant === 'fresto-challenge') {
    return <FrestoChallengeVisualBlock />;
  }

  if (variant === 'fresto-usability') {
    return <FrestoUsabilityVisualBlock />;
  }

  if (variant === 'fresto-design-system') {
    return <FrestoDesignSystemVisualBlock />;
  }

  if (variant === 'fresto-learning') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={frestoLearningImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'moto-context') {
    return <MotoRemazaContextBlock />;
  }

  if (variant === 'moto-scope') {
    return (
      <div className="grid gap-10">
        <ScopeBlock items={motoRemazaScope} />
        <CaseImageSlot image={motoRemazaProcessImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'moto-challenge') {
    return <MotoRemazaChallengeVisualBlock />;
  }

  if (variant === 'moto-research') {
    return <MotoRemazaResearchVisualBlock />;
  }

  if (variant === 'moto-navigation') {
    return <MotoRemazaUsabilityVisualBlock />;
  }

  if (variant === 'moto-models') {
    return <MotoRemazaImagePairBlock images={motoRemazaModelImages} titles={['Catálogo de modelos', 'Detalhes da motocicleta']} />;
  }

  if (variant === 'moto-used') {
    return <MotoRemazaImagePairBlock images={motoRemazaUsedImages} titles={['Listagem de seminovos', 'Detalhe do seminovo']} />;
  }

  if (variant === 'moto-services') {
    return <MotoRemazaServicesVisualBlock />;
  }

  if (variant === 'moto-next-steps') {
    return (
      <div className="mt-12 grid gap-5">
        <div className="rounded-md border border-[var(--tradewind-padrao)] bg-[rgba(70,177,153,0.08)] p-5 dark:border-[var(--blue-border)] dark:bg-[rgba(103,149,202,0.10)]">
          <p className="caption font-bold uppercase text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
            Evolução planejada — ainda não disponível na versão atual
          </p>
        </div>
        <CaseImageSlot image={motoRemazaNextStepsImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'moto-relationship') {
    return <MotoRemazaImagePairBlock images={motoRemazaRelationshipImages} titles={['Canal com a diretoria']} />;
  }

  if (variant === 'moto-learning') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={motoRemazaLearningImage} aspectClass="aspect-[16/7]" />
      </div>
    );
  }

  if (variant === 'moto-conclusion') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={motoRemazaConclusionImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'gamp-context') {
    return (
      <div className="mt-14 grid gap-10">
        <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
          <ContextList title="Minha participação" items={gamp21Participation} />
          <ContextList title="Características do projeto" items={gamp21ProjectCharacteristics} />
        </div>
        <Gamp21ResponsiveVisualBlock />
      </div>
    );
  }

  if (variant === 'gamp-scope') {
    return <Gamp21ScopeVisualBlock />;
  }

  if (variant === 'gamp-services') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={gamp21ServicesImage} aspectClass="aspect-[16/10] min-h-[24rem]" />
      </div>
    );
  }

  if (variant === 'gamp-blog') {
    return <Gamp21BlogVisualBlock />;
  }

  if (variant === 'daitan-context') {
    return <DaitanContextVisualBlock />;
  }

  if (variant === 'daitan-scope') {
    return <DaitanScopeVisualBlock />;
  }

  if (variant === 'daitan-new-cars') {
    return <DaitanNewCarsVisualBlock />;
  }

  if (variant === 'daitan-technology') {
    return <DaitanTechnologyVisualBlock />;
  }

  if (variant === 'daitan-used-cars') {
    return <DaitanUsedCarsVisualBlock />;
  }

  if (variant === 'daitan-after-sales') {
    return <DaitanAfterSalesVisualBlock />;
  }

  if (variant === 'daitan-relationship') {
    return <DaitanRelationshipVisualBlock />;
  }

  if (variant === 'daitan-responsive') {
    return <DaitanResponsiveVisualBlock />;
  }

  if (variant === 'consorcio-context') {
    return <ConsorcioRemazaContextBlock />;
  }

  if (variant === 'consorcio-challenge') {
    return <ConsorcioRemazaChallengeVisualBlock />;
  }

  if (variant === 'consorcio-scope') {
    return <ConsorcioRemazaScopeVisualBlock />;
  }

  if (variant === 'consorcio-simulation') {
    return <ConsorcioRemazaSimulationVisualBlock />;
  }

  if (variant === 'consorcio-mobile') {
    return <ConsorcioRemazaMobileVisualBlock />;
  }

  if (variant === 'consorcio-commercial') {
    return <ConsorcioRemazaCommercialVisualBlock />;
  }

  if (variant === 'consorcio-trust') {
    return <ConsorcioRemazaTrustVisualBlock />;
  }

  if (variant === 'consorcio-content') {
    return <ConsorcioRemazaContentVisualBlock />;
  }

  if (variant === 'consorcio-relationship') {
    return <ConsorcioRemazaRelationshipVisualBlock />;
  }

  if (variant === 'consorcio-opportunities') {
    return <ConsorcioRemazaOpportunitiesVisualBlock />;
  }

  if (variant === 'none') {
    return null;
  }

  const baseSurface =
    'rounded-md bg-[linear-gradient(135deg,var(--off-white)_0%,#eef4fb_100%)] dark:bg-[linear-gradient(135deg,rgba(103,149,202,0.12)_0%,rgba(70,177,153,0.08)_100%)]';
  const accentSurface =
    'rounded-md bg-[linear-gradient(135deg,#edf8f5_0%,#f8f9fb_100%)] dark:bg-[linear-gradient(135deg,rgba(70,177,153,0.13)_0%,rgba(103,149,202,0.08)_100%)]';

  if (variant === 'split') {
    return (
      <div className="mt-12 grid gap-5 md:grid-cols-[0.82fr_1.18fr]" aria-hidden="true">
        <div className={`${baseSurface} aspect-[4/5]`} />
        <div className={`${accentSurface} aspect-[4/3] md:mt-16`} />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className="mt-12 grid gap-5" aria-hidden="true">
        <div className={`${baseSurface} aspect-[16/8]`} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className={`${accentSurface} aspect-[4/3]`} />
          <div className={`${baseSurface} aspect-[4/3]`} />
        </div>
      </div>
    );
  }

  if (variant === 'mosaic') {
    return (
      <div className="mt-12 grid gap-5 md:grid-cols-12" aria-hidden="true">
        <div className={`${baseSurface} aspect-[4/3] md:col-span-7`} />
        <div className={`${accentSurface} aspect-[4/5] md:col-span-5 md:mt-10`} />
        <div className={`${accentSurface} aspect-[16/7] md:col-span-12`} />
      </div>
    );
  }

  return <div className={`mt-12 aspect-[16/8] ${baseSurface}`} aria-hidden="true" />;
}

function GenericProjectCasePage({ slug }: ProjectCasePageProps) {
  const { t } = useI18n();
  const projectIndex = Math.max(projectSlugs.indexOf(slug), 0);
  const project = t.projects[projectIndex];
  const sections = [
    [t.projectPage.overview, t.projectPage.overviewText],
    [t.projectPage.challenge, t.projectPage.challengeText],
    [t.projectPage.role, t.projectPage.roleText],
    [t.projectPage.decisions, t.projectPage.decisionsText],
  ];

  return (
    <main>
      <section className="overflow-hidden bg-gradient-to-b from-[var(--blue-claro)] to-white pt-12 dark:from-[var(--fundo)] dark:to-[#020e1a]">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
          <ProjectBreadcrumb currentTitle={project.title} currentHref={`/projetos/${slug}`} />

          <div className="mt-10 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <small className="font-sans font-semibold text-[var(--blue-padrao)] dark:text-[var(--blue-background)]">
                {t.projectPage.eyebrow}
              </small>
              <h1 className="display-xl mt-6 text-[var(--blue-padrao)] dark:text-white">{project.title}</h1>
              <p className="mt-6 max-w-xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-white">
                {project.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-2 font-display text-xs font-bold text-[var(--blue-padrao)] shadow-sm dark:bg-white/10 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <CaseImageSlot
              image={{
                src: project.image,
                alt: project.title,
                caption: project.description,
              }}
              aspectClass="aspect-[16/9]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#020e1a] md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.65fr_1.35fr]">
          <div>
            <h2 className="display-m text-[var(--blue-padrao)] dark:text-white">{t.projectPage.next}</h2>
            <p className="mt-5 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white">
              {t.projectPage.nextText}
            </p>
            <Button href="/#projetos" variant="outlineSecondary" className="mt-8">
              {t.projectPage.back}
            </Button>
          </div>

          <div className="grid gap-4">
            {sections.map(([title, text]) => (
              <article
                key={title}
                className="rounded-md border border-[var(--cinza-claro)] bg-white p-6 dark:border-white/24 dark:bg-transparent"
              >
                <h3 className="font-display text-2xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{title}</h3>
                <p className="mt-4 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AppRemazaCasePage() {
  const [activeSection, setActiveSection] = useState(appRemazaSections[0].id);

  useEffect(() => {
    const sectionElements = appRemazaSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-app-remaza.webp"
            alt="Tela do APP Remaza em uso como imagem principal do case"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.30)_0%,rgba(8,31,51,0.34)_42%,rgba(8,31,51,0.88)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.16] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">Product Design para consórcio</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Aplicativo para gestão de consórcio
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Projeto desenvolvido para o App Remaza, redesenhando a experiência da Área do Cliente.
              </p>
              <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Product Design</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Ano</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case APP Remaza">
          {appRemazaSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Aplicativo para gestão de consórcio" currentHref="/projetos/app-remaza" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case APP Remaza">
                {appRemazaSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {appRemazaSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FrestoCasePage() {
  const [activeSection, setActiveSection] = useState(frestoSections[0].id);

  useEffect(() => {
    const sectionElements = frestoSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-fresto.webp"
            alt="Família compartilhando uma refeição em uma das unidades do Fresto"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-[54%_center] md:object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.28)_0%,rgba(8,31,51,0.36)_42%,rgba(8,31,51,0.90)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.14] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">UX/UI para gastronomia</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Fresto — Rede de restaurantes
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                UX e Web Design para uma rede de restaurantes presente em clubes de São Paulo.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX e Web Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Prototipação no Figma</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Entrega</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Site institucional</p>
                  <p className="font-display text-lg font-extrabold text-white">Planejamento WordPress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case Fresto">
          {frestoSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Fresto — Rede de restaurantes" currentHref="/projetos/fresto" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case Fresto">
                {frestoSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {frestoSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MotoRemazaCasePage() {
  const [activeSection, setActiveSection] = useState(motoRemazaSections[0].id);

  useEffect(() => {
    const sectionElements = motoRemazaSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-motoremaza.webp"
            alt="Casal pilotando uma Honda Biz 125 com a Ponte Octávio Frias de Oliveira ao fundo"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.24)_0%,rgba(8,31,51,0.34)_42%,rgba(8,31,51,0.90)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.14] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">
                Automotivo e e-commerce
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Concessionárias de motos Honda
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Projeto desenvolvido para a Moto Remaza, criando uma experiência digital para acompanhar diferentes jornadas sobre duas rodas.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX Strategy</p>
                  <p className="font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Arquitetura da Informação</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Plataformas</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Desktop</p>
                  <p className="font-display text-lg font-extrabold text-white">Mobile</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Status</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Em ambiente</p>
                  <p className="font-display text-lg font-extrabold text-white">de desenvolvimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case Moto Remaza">
          {motoRemazaSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Concessionárias de motos Honda" currentHref="/projetos/moto-remaza" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case Moto Remaza">
                {motoRemazaSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {motoRemazaSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Gamp21CasePage() {
  const [activeSection, setActiveSection] = useState(gamp21Sections[0].id);

  useEffect(() => {
    const sectionElements = gamp21Sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-gamp21.webp"
            alt="Imagem principal do case Gamp21"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.26)_0%,rgba(8,31,51,0.34)_42%,rgba(8,31,51,0.90)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.14] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">
                Uma experiência digital para acolher famílias e aproximar empresas
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Gamp21
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Projeto de organização de conteúdo e criação de interfaces para uma rede de apoio à maternidade e à paternidade.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Arquitetura da Informação</p>
                  <p className="font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Direção visual</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Entrega</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Site institucional</p>
                  <p className="font-display text-lg font-extrabold text-white">Blog “Para mães e pais”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case Gamp21">
          {gamp21Sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Gamp21 — Parentalidade nas empresas" currentHref="/projetos/gamp21" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case Gamp21">
                {gamp21Sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {gamp21Sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function DaitanCasePage() {
  const [activeSection, setActiveSection] = useState(daitanSections[0].id);

  useEffect(() => {
    const sectionElements = daitanSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-daitan.webp"
            alt="Imagem principal do case Daitan"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.18)_0%,rgba(8,31,51,0.42)_44%,rgba(8,31,51,0.92)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.14] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">
                Uma experiência digital para acompanhar toda a jornada do cliente
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Honda Daitan
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Redesign de um ecossistema digital que conecta veículos, serviços e atendimento em uma experiência mais organizada e responsiva.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Arquitetura da Informação</p>
                  <p className="font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Interfaces responsivas</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Entrega</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Site Honda Daitan</p>
                  <p className="font-display text-lg font-extrabold text-white">Gestão de conteúdo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case Daitan">
          {daitanSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Concessionária Honda" currentHref="/projetos/daitan" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case Daitan">
                {daitanSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {daitanSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ConsorcioRemazaCasePage() {
  const [activeSection, setActiveSection] = useState(consorcioRemazaSections[0].id);

  useEffect(() => {
    const sectionElements = consorcioRemazaSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {consorcioRemazaHeroPlaceholder.src ? (
            <img
              src={consorcioRemazaHeroPlaceholder.src}
              alt={consorcioRemazaHeroPlaceholder.alt}
              className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center"
              fetchPriority="high"
            />
          ) : (
            <div
              className="absolute inset-0 flex h-full w-full items-start justify-center bg-[linear-gradient(135deg,#081f33_0%,#14334f_45%,#317c6a_100%)] px-5 pt-36 md:items-center md:px-8 md:pt-0"
              role="img"
              aria-label={consorcioRemazaHeroPlaceholder.alt}
            >
              <div className="grid min-w-0 w-full max-w-4xl gap-5 opacity-78">
                <div className="h-20 rounded-md border border-white/22 bg-white/9 backdrop-blur-sm md:h-32" />
                <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="h-44 rounded-md border border-white/22 bg-white/11 backdrop-blur-sm md:h-72" />
                  <div className="grid gap-5">
                    <div className="h-20 rounded-md border border-white/18 bg-white/8 backdrop-blur-sm md:h-32" />
                    <div className="h-20 rounded-md border border-white/18 bg-white/8 backdrop-blur-sm md:h-32" />
                  </div>
                </div>
                <p className="caption hidden max-w-full justify-self-center break-words rounded-md border border-white/24 bg-black/12 px-4 py-3 text-center font-bold uppercase text-white/72 backdrop-blur-sm sm:block">
                  {consorcioRemazaHeroPlaceholder.placeholder}
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.08)_0%,rgba(8,31,51,0.34)_42%,rgba(8,31,51,0.92)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.14] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">
                Uma experiência digital para transformar planos em possibilidades
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Consórcio Remaza
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Projeto de UX/UI que conectou informação, simulação e atendimento em uma jornada mais clara para clientes e equipes comerciais.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Simuladores</p>
                  <p className="font-display text-lg font-extrabold text-white">Ferramentas comerciais</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Entrega</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Site institucional</p>
                  <p className="font-display text-lg font-extrabold text-white">Jornadas de geração de leads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case Consórcio Remaza">
          {consorcioRemazaSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <ProjectCaseContentHeader currentTitle="Consórcio Remaza" currentHref="/projetos/consorcio-remaza" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case Consórcio Remaza">
                {consorcioRemazaSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {consorcioRemazaSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 first:pt-0 ${
                  section.visual === 'none' ? 'py-12 md:py-14' : 'py-20 md:py-20'
                }`}
              >
                <article className="grid gap-10">
                  <CaseSectionText section={section} index={index} />
                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProjectCasePage({ slug }: ProjectCasePageProps) {
  if (slug === 'app-remaza') {
    return <AppRemazaCasePage />;
  }

  if (slug === 'fresto') {
    return <FrestoCasePage />;
  }

  if (slug === 'moto-remaza') {
    return <MotoRemazaCasePage />;
  }

  if (slug === 'gamp21') {
    return <Gamp21CasePage />;
  }

  if (slug === 'daitan') {
    return <DaitanCasePage />;
  }

  if (slug === 'consorcio-remaza') {
    return <ConsorcioRemazaCasePage />;
  }

  return <GenericProjectCasePage slug={slug} />;
}
