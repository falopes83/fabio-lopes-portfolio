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
    id: 'rede-de-apoio',
    label: 'Contexto',
    title: 'Uma rede de apoio para quem está começando',
    intro:
      'A chegada de um filho traz descobertas, dúvidas e muitas responsabilidades. O Gamp21 atua como uma rede de apoio para mães, pais e empresas, oferecendo conteúdos, cursos e orientações para tornar esse momento mais acolhedor e consciente.',
    complement:
      'O projeto do site nasceu da necessidade de apresentar esse trabalho com mais clareza, aproximando a marca tanto das famílias quanto das organizações interessadas em apoiar seus colaboradores.',
    visual: 'gamp-context',
  },
  {
    id: 'familias-e-empresas',
    label: 'Desafio',
    title: 'Conversar com famílias e empresas na mesma experiência',
    intro: 'O principal desafio foi equilibrar duas formas diferentes de comunicação.',
    complement:
      'De um lado, mães e pais procurando informações confiáveis para lidar com as dúvidas da parentalidade. Do outro, empresas interessadas em oferecer cursos de paternidade e ações de apoio aos seus colaboradores.',
    extraParagraphs: [
      'O site precisava acolher o público familiar e, ao mesmo tempo, transmitir profissionalismo, estrutura e credibilidade para o ambiente corporativo.',
    ],
    visual: 'gamp-audiences',
  },
  {
    id: 'organizacao',
    label: 'Atuação',
    title: 'Organização, conteúdo e experiência digital',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos principais caminhos de navegação e a criação das interfaces.',
    complement:
      'O trabalho buscou dar mais visibilidade aos serviços do Gamp21, facilitar o entendimento da proposta e direcionar cada público para o conteúdo mais relevante, mantendo uma experiência simples e acolhedora.',
    bullets: [
      'Arquitetura da informação',
      'Organização dos conteúdos',
      'Direção visual',
      'UX/UI Design',
      'Interfaces responsivas',
      'Estruturação da jornada entre conteúdos e serviços',
    ],
    visual: 'gamp-scope',
  },
  {
    id: 'informacao-acessivel',
    label: 'Experiência',
    title: 'Informação acessível em um momento de transformação',
    intro:
      'A linguagem visual e a organização das páginas foram pensadas para transmitir proximidade, segurança e cuidado.',
    complement:
      'Em vez de apresentar a parentalidade de maneira excessivamente técnica, o site procura conversar com mães e pais de forma humana, ajudando o usuário a compreender os serviços e encontrar apoio com facilidade.',
    visual: 'gamp-care',
  },
  {
    id: 'solucoes',
    label: 'Serviços',
    title: 'Soluções para famílias e ambientes de trabalho',
    intro:
      'Os serviços receberam destaque para que empresas e famílias pudessem compreender rapidamente como o Gamp21 atua.',
    complement:
      'Para o público corporativo, o site apresenta o Gamp21 como parceiro na criação de cursos e ações voltadas à paternidade, contribuindo para colaboradores mais preparados e apoiados durante essa nova fase da vida.',
    visual: 'gamp-services',
  },
  {
    id: 'blog',
    label: 'Conteúdo',
    title: 'Um canal que aproxima a marca das famílias',
    intro:
      'O blog “Para mães e pais” ocupa um papel importante dentro da experiência. Além de responder às dúvidas mais comuns sobre maternidade e paternidade, ele também amplia o alcance orgânico do Gamp21 por meio das buscas no Google.',
    complement:
      'O conteúdo ajuda novos usuários a descobrirem a marca e cria um primeiro contato baseado em informação, confiança e acolhimento.',
    visual: 'gamp-blog',
  },
  {
    id: 'equilibrio',
    label: 'Aprendizado',
    title: 'Equilibrar acolhimento e posicionamento profissional',
    intro:
      'O projeto mostrou como uma mesma experiência pode conversar com públicos diferentes sem perder sua identidade.',
    complement:
      'Foi necessário encontrar um equilíbrio entre o tom humano esperado pelas famílias e a clareza comercial necessária para apresentar os serviços às empresas.',
    visual: 'gamp-balance',
  },
  {
    id: 'apoio-digital',
    label: 'Conclusão',
    title: 'Apoio que começa antes do primeiro contato',
    intro:
      'O site do Gamp21 transformou conteúdos, cursos e serviços em uma experiência mais organizada e acessível.',
    complement:
      'Mais do que apresentar a empresa, o projeto criou um ponto de apoio digital para mães, pais e organizações que desejam tornar a experiência da parentalidade mais consciente, acolhedora e bem acompanhada.',
    visual: 'gamp-conclusion',
  },
];

const daitanSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Uma experiência digital para diferentes momentos de compra',
    intro:
      'A Daitan atende desde clientes interessados nos lançamentos e modelos mais sofisticados da Honda até pessoas que procuram um seminovo com segurança e procedência.',
    complement:
      'Desenvolvido em 2023, o novo site foi pensado para tornar esse portfólio mais fácil de conhecer, reunindo veículos, ofertas, serviços e canais de atendimento em uma experiência simples e objetiva.',
    visual: 'daitan-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Velocidade para quem acessa. Praticidade para quem atualiza.',
    intro:
      'Além de apresentar dificuldades de navegação, o site anterior demorava para carregar e tornava a atualização dos conteúdos mais trabalhosa.',
    complement:
      'O desafio era criar uma estrutura rápida, responsiva e fácil de administrar, considerando a entrada constante de novos modelos, versões, ofertas e veículos seminovos pelas equipes das concessionárias.',
    visual: 'daitan-challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da organização do conteúdo à interface responsiva',
    intro:
      'Minha atuação envolveu a organização da arquitetura do site, a definição dos principais caminhos de navegação e a criação das interfaces para desktop e mobile.',
    complement:
      'O projeto também estabeleceu algumas das soluções que posteriormente seriam evoluídas no site da Moto Remaza, funcionando como um primeiro passo dessa abordagem para o ecossistema digital das concessionárias do grupo.',
    visual: 'daitan-scope',
  },
  {
    id: 'experiencia',
    label: 'Experiência',
    title: 'Conteúdo fácil de encontrar e ações bem direcionadas',
    intro:
      'A experiência foi estruturada para que o usuário pudesse conhecer os veículos, acessar detalhes dos modelos e encontrar rapidamente o atendimento mais adequado para cada necessidade.',
    complement:
      'Banners responsivos e chamadas distribuídas pelas páginas direcionam para diferentes formulários, como agendamento de test-drive, solicitação de informações, cadastro de interesse e contato com a diretoria.',
    visual: 'daitan-experience',
  },
  {
    id: 'gestao-de-conteudo',
    label: 'Gestão de conteúdo',
    title: 'Uma estrutura preparada para mudanças constantes',
    intro:
      'Como lançamentos, versões, ofertas e veículos seminovos mudam com frequência, o site precisava oferecer mais autonomia para as equipes responsáveis pelas concessionárias.',
    complement:
      'A estrutura foi desenvolvida para facilitar a publicação e a atualização dos conteúdos, reduzindo a dependência técnica nas tarefas recorrentes do site.',
    visual: 'daitan-content',
  },
  {
    id: 'responsividade-performance',
    label: 'Responsividade',
    title: 'Uma experiência rápida em qualquer dispositivo',
    intro:
      'O projeto priorizou o carregamento das páginas e a adaptação dos conteúdos para diferentes tamanhos de tela, especialmente nos banners e áreas de destaque.',
    complement:
      'O objetivo foi oferecer uma navegação mais fluida, permitindo que o usuário encontrasse veículos e canais de atendimento tanto pelo computador quanto pelo celular.',
    visual: 'daitan-performance',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'A base para uma experiência mais madura',
    intro:
      'O projeto da Daitan ajudou a consolidar uma estrutura digital capaz de acompanhar a rotina de uma concessionária: novos veículos, campanhas, seminovos e diferentes solicitações de atendimento.',
    complement:
      'Os aprendizados obtidos durante sua criação também serviram como ponto de partida para decisões que seriam aprofundadas posteriormente no projeto da Moto Remaza.',
    visual: 'daitan-learning',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Uma concessionária mais acessível no ambiente digital',
    intro:
      'O novo site transformou um ambiente lento e difícil de atualizar em uma experiência mais rápida, organizada e preparada para mudanças frequentes.',
    complement:
      'Mais do que apresentar veículos, o projeto aproximou clientes e concessionária por meio de caminhos claros para conhecer modelos, demonstrar interesse e iniciar uma conversa com a Daitan.',
    visual: 'none',
  },
];

const consorcioRemazaSections: CaseSection[] = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'O primeiro grande desafio na WebSupply',
    intro:
      'O Consórcio Remaza foi meu primeiro projeto na WebSupply e marcou o início de uma nova fase na minha trajetória como designer.',
    complement:
      'Mais do que atualizar a presença digital da empresa, o projeto buscava tornar o consórcio mais simples de compreender e aproximar o público do time comercial.',
    visual: 'consorcio-context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Tornar uma decisão importante mais fácil',
    intro:
      'Contratar um consórcio envolve planejamento, confiança e muitas dúvidas. O desafio era apresentar as possibilidades de forma clara, permitindo que diferentes públicos entendessem o produto e avaliassem se ele fazia sentido para sua realidade.',
    complement:
      'Também era necessário transmitir segurança durante toda a jornada, principalmente nos momentos em que o usuário precisava conversar com um vendedor.',
    visual: 'consorcio-challenge',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Uma experiência que conectava clientes e vendedores',
    intro:
      'Minha atuação envolveu a criação das interfaces do site institucional e de diferentes jornadas de simulação e conversão.',
    complement:
      'Desenvolvemos simuladores que ajudavam o usuário a visualizar possibilidades de pagamento antes de iniciar o contato. Além de facilitar a tomada de decisão, essas ferramentas geravam leads mais contextualizados para o time comercial.',
    bullets: [
      'Interfaces do site institucional',
      'Jornadas de simulação',
      'Fluxos de conversão',
      'Geração de leads para vendas',
      'Experiência desktop e mobile',
      'Apoio à jornada comercial',
    ],
    visual: 'consorcio-scope',
  },
  {
    id: 'ecossistema-comercial',
    label: 'Ecossistema comercial',
    title: 'O projeto continuava depois do site',
    intro:
      'O trabalho não ficou restrito à experiência do público. Também foram criadas centrais e ferramentas de apoio para o time de vendas, conectando a jornada digital ao atendimento comercial.',
    complement:
      'Essa visão tornou o projeto especialmente amplo: não estávamos desenhando apenas páginas, mas parte de um ecossistema utilizado por clientes, vendedores e diferentes áreas da empresa.',
    visual: 'consorcio-commercial',
  },
  {
    id: 'confianca',
    label: 'Confiança',
    title: 'A presença do vendedor também fazia parte da experiência',
    intro:
      'Percebemos que a confiança não dependia apenas da interface. A forma como os vendedores apareciam no ambiente digital também influenciava a decisão do cliente.',
    complement:
      'Por isso, orientamos a produção de fotografias profissionais para os consultores. O resultado trouxe mais consistência, credibilidade e valorização para os próprios colaboradores, além de deixar o atendimento mais humano e confiável.',
    visual: 'consorcio-trust',
  },
  {
    id: 'conteudo-alcance',
    label: 'Conteúdo e alcance',
    title: 'Informação como parte da estratégia',
    intro:
      'Uma empresa parceira ficou responsável pela estratégia de conteúdo e engajamento, publicando notícias e materiais sobre consórcio de forma recorrente.',
    complement:
      'Esse trabalho fortaleceu a presença orgânica da marca e contribuiu para melhorar sua posição nos mecanismos de busca, ampliando o alcance do projeto para além das campanhas comerciais.',
    extraParagraphs: [
      'Essa frente é apresentada aqui como parte do ecossistema do projeto, sem atribuir a mim a execução da estratégia de conteúdo.',
    ],
    visual: 'consorcio-content',
  },
  {
    id: 'aprendizado',
    label: 'Aprendizado',
    title: 'Design também acontece fora das telas',
    intro:
      'Esse projeto me mostrou que uma experiência digital não é construída somente com interfaces.',
    complement:
      'Simuladores, conteúdo, ferramentas comerciais, atendimento e até a apresentação dos vendedores faziam parte da percepção de confiança da marca. Foi quando comecei a enxergar com mais clareza como o design poderia conectar diferentes pontos do negócio.',
    visual: 'none',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Um ponto de partida que ainda me representa',
    intro:
      'Atualmente, o Consórcio Remaza está passando por uma nova atualização visual, conduzida por outra profissional — e tenho gostado muito de acompanhar a evolução do trabalho.',
    complement:
      'Este case registra a etapa da qual participei: um projeto de grande escala, que marcou meu início na WebSupply e ajudou a construir uma base importante para a presença digital da empresa.',
    extraParagraphs: [
      'Mesmo pertencendo a outro momento da marca e da minha carreira, ele continua sendo um trabalho do qual tenho muito orgulho.',
    ],
    visual: 'consorcio-conclusion',
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
  alt: 'Página inicial do Gamp21 com seção de acolhimento para mães, pais e empresas',
  caption: 'Página inicial e seção de acolhimento do projeto Gamp21.',
  placeholder: '[IMAGEM DO PROJETO — Página inicial / seção de acolhimento]',
};

const gamp21HeroImage: CaseImageItem = {
  alt: 'Hero ou visão geral da página inicial do Gamp21',
  caption: 'Hero ou visão geral da página inicial.',
  placeholder: '[IMAGEM DO PROJETO — Hero ou visão geral da página inicial]',
};

const gamp21AudienceImage: CaseImageItem = {
  alt: 'Seção do Gamp21 representando famílias ou empresas',
  caption: 'Uma experiência planejada para acolher famílias e apresentar soluções para empresas.',
  placeholder: '[IMAGEM DO PROJETO — Seção que represente famílias ou empresas]',
};

const gamp21ScreenSequenceImage: CaseImageItem = {
  alt: 'Sequência de telas desktop e mobile do projeto Gamp21',
  caption: 'Sequência de telas desktop e mobile.',
  placeholder: '[IMAGEM DO PROJETO — Sequência de telas desktop e mobile]',
};

const gamp21CareImage: CaseImageItem = {
  alt: 'Página inicial ou seção do Gamp21 com abordagem humana e acolhedora',
  caption: 'Conteúdo organizado para transmitir proximidade, segurança e cuidado.',
  placeholder: '[IMAGEM DO PROJETO — Página inicial ou seção com abordagem humana e acolhedora]',
};

const gamp21ServicesImage: CaseImageItem = {
  alt: 'Seção ou página de serviços e cursos do Gamp21',
  caption: 'Serviços e cursos apresentados para famílias e ambientes de trabalho.',
  placeholder: '[IMAGEM DO PROJETO — Seção ou página de serviços e cursos]',
};

const gamp21BlogImages: CaseImageItem[] = [
  {
    alt: 'Listagem do blog Para mães e pais do Gamp21',
    caption: 'Listagem do blog “Para mães e pais”.',
    placeholder: '[IMAGEM DO PROJETO — Listagem do blog “Para mães e pais”]',
  },
  {
    alt: 'Página interna de um artigo do blog do Gamp21',
    caption: 'Página interna de um artigo.',
    placeholder: '[IMAGEM DO PROJETO — Página interna de um artigo]',
  },
];

const gamp21BalanceImage: CaseImageItem = {
  alt: 'Composição com detalhes visuais ou diferentes páginas do Gamp21',
  caption: 'Detalhes visuais e diferentes páginas da experiência.',
  placeholder: '[IMAGEM DO PROJETO — Composição com detalhes visuais ou diferentes páginas]',
};

const gamp21ConclusionImage: CaseImageItem = {
  alt: 'Encerramento com mockup ou visão geral do site Gamp21',
  caption: 'Encerramento com mockup ou visão geral do site.',
  placeholder: '[IMAGEM DO PROJETO — Encerramento com mockup ou visão geral do site]',
};

const daitanParticipation: IconListItem[] = [
  {
    icon: Network,
    text: 'Arquitetura da informação',
  },
  {
    icon: Route,
    text: 'Mapeamento da jornada de compra',
  },
  {
    icon: MousePointer2,
    text: 'UX/UI Design',
  },
  {
    icon: FileText,
    text: 'Organização de conteúdo comercial',
  },
  {
    icon: Component,
    text: 'Padrões de interface para formulários e chamadas',
  },
  {
    icon: Smartphone,
    text: 'Experiência responsiva',
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
    icon: Headset,
    text: 'Canais de atendimento em destaque',
  },
  {
    icon: FileText,
    text: 'Atualizações frequentes de modelos, ofertas e seminovos',
  },
  {
    icon: Smartphone,
    text: 'Experiência responsiva para desktop e mobile',
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
    text: 'Organização da presença digital',
  },
  {
    icon: Component,
    text: 'Criação de simuladores',
  },
  {
    icon: Route,
    text: 'Fluxos de captação e conversão',
  },
  {
    icon: MousePointer2,
    text: 'Interfaces para site institucional',
  },
  {
    icon: Headset,
    text: 'Conexão com o atendimento comercial',
  },
  {
    icon: Users,
    text: 'Valorização do time de vendas',
  },
];

const daitanHomeImage: CaseImageItem = {
  src: '/assets/projeto-05-daitan.webp',
  alt: 'Imagem de apresentação do projeto Daitan',
  caption: 'Imagem geral do projeto Daitan reaproveitada da listagem de projetos.',
};

const daitanChallengeImages: CaseImageItem[] = [
  {
    alt: 'Página de modelos ou ofertas do site Honda Daitan',
    caption: 'Espaço reservado para uma captura da página de modelos, ofertas ou navegação principal.',
    placeholder: '[INSERIR IMAGEM - Página de modelos, ofertas ou navegação principal]',
  },
  {
    alt: 'Detalhe de modelo ou oferta no site Honda Daitan',
    caption: 'Detalhes de modelos e ofertas ajudam o usuário a compreender melhor as opções.',
    placeholder: '[INSERIR IMAGEM - Detalhe de modelo ou oferta]',
  },
  {
    alt: 'Navegação principal do site Honda Daitan',
    caption: 'A navegação precisa acomodar modelos, seminovos, serviços e canais de atendimento.',
    placeholder: '[INSERIR IMAGEM - Navegação principal]',
  },
];

const daitanResponsiveCompositionImage: CaseImageItem = {
  alt: 'Composição com telas desktop e mobile do site Honda Daitan',
  caption: 'Espaço reservado para uma composição com telas desktop e mobile do projeto.',
  placeholder: '[INSERIR IMAGEM - Composição com telas desktop e mobile]',
};

const daitanExperienceImages: CaseImageItem[] = [
  {
    alt: 'Banners responsivos do site Honda Daitan',
    caption: 'Banners responsivos e áreas de destaque orientam diferentes caminhos de navegação.',
    placeholder: '[INSERIR IMAGEM - Banners responsivos]',
  },
  {
    alt: 'Páginas de veículos ou chamadas para formulários no site Honda Daitan',
    caption: 'Chamadas distribuídas pelas páginas direcionam o usuário para o formulário adequado.',
    placeholder: '[INSERIR IMAGEM - Páginas de veículos ou chamadas para formulários]',
  },
];

const daitanContentManagementImage: CaseImageItem = {
  alt: 'Composição da listagem de modelos, ofertas e seminovos do site Honda Daitan',
  caption: 'Espaço reservado para mostrar listagem de modelos, ofertas e veículos seminovos.',
  placeholder: '[INSERIR IMAGEM - Listagem de modelos, ofertas e seminovos]',
};

const daitanPerformanceImage: CaseImageItem = {
  alt: 'Comparação entre desktop e mobile com banners responsivos do site Honda Daitan',
  caption: 'Espaço reservado para destacar o comportamento responsivo dos banners e áreas principais.',
  placeholder: '[INSERIR IMAGEM - Comparação desktop e mobile dos banners responsivos]',
};

const daitanLearningImage: CaseImageItem = {
  alt: 'Composição de telas representativas do projeto Honda Daitan',
  caption: 'Espaço reservado para uma composição ampla com telas representativas da experiência.',
  placeholder: '[INSERIR IMAGEM - Composição de telas representativas do projeto]',
};

// Para inserir as imagens finais do Consórcio Remaza, preencha o campo `src` em cada item mantendo o `alt` descritivo.
const consorcioRemazaHeroPlaceholder: CaseImageItem = {
  src: '/assets/projects/hero-consorcio-remaza.webp',
  alt: 'Imagem principal do case Consórcio Remaza',
  caption: 'Imagem principal do case Consórcio Remaza.',
  placeholder: '[INSERIR IMAGEM — Hero do Consórcio Remaza]',
};

const consorcioRemazaContextImage: CaseImageItem = {
  alt: 'Composição mostrando a presença digital do Consórcio Remaza',
  caption: 'Espaço reservado para imagem do site ou composição da presença digital do projeto.',
  placeholder: '[INSERIR IMAGEM — Site ou presença digital do Consórcio Remaza]',
};

const consorcioRemazaChallengeImage: CaseImageItem = {
  alt: 'Jornada explicativa para escolha de um consórcio no site Consórcio Remaza',
  caption: 'Espaço reservado para jornada, página explicativa ou tela relacionada à escolha do consórcio.',
  placeholder: '[INSERIR IMAGEM — Jornada, página explicativa ou escolha do consórcio]',
};

const consorcioRemazaSimulatorImages: CaseImageItem[] = [
  {
    alt: 'Tela desktop do simulador de consórcio do Consórcio Remaza',
    caption: 'Simulador em desktop para apoiar a visualização de possibilidades de pagamento.',
    placeholder: '[INSERIR IMAGEM — Simulador de consórcio em desktop]',
  },
  {
    alt: 'Tela mobile do simulador de consórcio do Consórcio Remaza',
    caption: 'Experiência mobile preparada para conversão e contato com o time comercial.',
    placeholder: '[INSERIR IMAGEM — Simulador de consórcio em mobile]',
  },
];

const consorcioRemazaCommercialImages: CaseImageItem[] = [
  {
    alt: 'Central comercial ou ferramenta interna do Consórcio Remaza',
    caption: 'Espaço reservado para uma central comercial ou ferramenta de apoio ao time de vendas.',
    placeholder: '[INSERIR IMAGEM — Central comercial ou ferramenta interna]',
  },
  {
    alt: 'Tela de apoio comercial conectada à jornada digital do Consórcio Remaza',
    caption: 'Ferramentas internas ajudavam a conectar a jornada digital ao atendimento comercial.',
    placeholder: '[INSERIR IMAGEM — Tela de apoio comercial conectada aos leads]',
  },
];

const consorcioRemazaTrustImages: CaseImageItem[] = [
  {
    alt: 'Fotografias profissionais dos vendedores do Consórcio Remaza',
    caption: 'Fotografias profissionais dos consultores como parte da percepção de confiança.',
    placeholder: '[INSERIR IMAGEM — Fotografias profissionais dos vendedores]',
  },
  {
    alt: 'Tela do Consórcio Remaza em que consultores aparecem no atendimento digital',
    caption: 'A presença dos vendedores ajudava a tornar o atendimento mais humano e confiável.',
    placeholder: '[INSERIR IMAGEM — Tela com consultores no atendimento digital]',
  },
];

const consorcioRemazaContentImages: CaseImageItem[] = [
  {
    alt: 'Blog ou notícias do Consórcio Remaza com conteúdo sobre consórcio',
    caption: 'Conteúdos publicados de forma recorrente por uma empresa parceira.',
    placeholder: '[INSERIR IMAGEM — Blog ou notícias sobre consórcio]',
  },
  {
    alt: 'Resultado de busca ou presença orgânica do Consórcio Remaza',
    caption: 'Espaço reservado para presença orgânica ou resultado de busca, sem métricas numéricas.',
    placeholder: '[INSERIR IMAGEM — Presença orgânica ou resultado de busca]',
  },
];

const consorcioRemazaConclusionImage: CaseImageItem = {
  alt: 'Composição final com telas do Consórcio Remaza na etapa do projeto apresentada no case',
  caption: 'Composição final com telas da etapa do projeto apresentada neste case.',
  placeholder: '[INSERIR IMAGEM — Composição final do Consórcio Remaza]',
};

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
    src: '/assets/projects/app-remaza/01-cores.jpg',
    alt: 'Paleta de cores do Design System do APP Remaza com escalas primárias, secundárias e neutras',
    caption: 'Paleta de cores estruturada para estados, superfícies e hierarquia visual.',
    placeholder: 'Elementos fundamentais',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-cores-variantes.jpg',
    alt: 'Variantes de cores do Design System do APP Remaza com tokens primários, secundários e estados',
    caption: 'Variantes principais para padronizar feedbacks, contrastes e aplicações recorrentes.',
    placeholder: 'Componentes do produto',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-componentes.jpg',
    alt: 'Tipografia e estilos de texto do Design System do APP Remaza',
    caption: 'Escala tipográfica definida para títulos, textos de apoio e leitura em telas móveis.',
    placeholder: 'Componentes aplicados',
    fit: 'contain',
  },
  {
    src: '/assets/projects/app-remaza/01-botoes.jpg',
    alt: 'Estados e variações de botões do Design System do APP Remaza',
    caption: 'Botões e estados reutilizáveis para ações primárias, secundárias e contornos.',
    placeholder: 'Botões e estados',
    fit: 'contain',
  },
];

// Para inserir as imagens finais do Fresto, preencha o campo `src` em cada item mantendo o `alt` descritivo.
const frestoContextImage: CaseImageItem = {
  alt: 'Captura da página inicial do Fresto com hero, fotografias dos pratos e conteúdo institucional',
  caption: 'Uma experiência digital criada para apresentar a marca e despertar o interesse pelo Fresto.',
  placeholder: 'Inserir visão geral da Home',
};

const frestoChallengeImages: CaseImageItem[] = [
  {
    alt: 'Composição com fotografias de pizza, hambúrguer, prato fresco e sobremesa utilizadas no site do Fresto',
    caption: 'Fotografias escolhidas para provocar desejo e aproximar o usuário da experiência do restaurante.',
    placeholder: 'Inserir composição de pratos',
  },
  {
    alt: 'Detalhe de uma seção do site Fresto com fotografia de um prato em destaque',
    caption: 'A comida como protagonista da comunicação.',
    placeholder: 'Inserir prato em destaque',
  },
  {
    alt: 'Trecho da interface do Fresto combinando fotografia, título e chamada para ação',
    caption: 'Conteúdo e imagem trabalhando juntos para convidar o usuário.',
    placeholder: 'Inserir fotografia + CTA',
  },
];

const frestoProcessImage: CaseImageItem = {
  alt: 'Referências visuais do Fresto, estudos de layout e versão final da página inicial no Figma',
  caption: 'Referências da marca e do segmento ajudaram a definir o direcionamento visual do projeto.',
  placeholder: 'Inserir referências + estudos visuais + layout final',
};

const frestoUsabilityImages: CaseImageItem[] = [
  {
    alt: 'Jornada para conhecer uma unidade do Fresto, passando pela home, seção de unidades, localização e horários',
    caption: 'Informações de cada unidade organizadas para serem encontradas com facilidade.',
    placeholder: 'Inserir jornada das unidades',
  },
  {
    alt: 'Jornada da página Trabalhe Conosco do Fresto com apresentação de oportunidades e acesso ao canal de candidatura',
    caption: 'Uma experiência visual que orienta quem deseja trabalhar no Fresto.',
    placeholder: 'Inserir experiência Trabalhe Conosco',
  },
];

const frestoDesignSystemImages: CaseImageItem[] = [
  {
    alt: 'Elementos visuais do site Fresto, incluindo paleta de cores, tipografia, botões, ícones e tratamentos de imagem',
    caption: 'Elementos visuais que aproximam a interface da personalidade do Fresto.',
    placeholder: 'Inserir cores + tipografia + botões',
  },
  {
    alt: 'Componentes do site Fresto, incluindo cards de unidades, chamadas para ação, blocos de conteúdo e cards de oportunidades',
    caption: 'Componentes reutilizáveis para organizar diferentes tipos de informação.',
    placeholder: 'Inserir cards e componentes',
  },
  {
    alt: 'Linguagem visual do Fresto aplicada nas páginas home, unidades, eventos, Trabalhe Conosco e contato',
    caption: 'A mesma linguagem visual aplicada aos diferentes pontos de contato da marca.',
    placeholder: 'Inserir componentes aplicados nas páginas',
  },
];

const frestoLearningImage: CaseImageItem = {
  alt: 'Seção da página inicial do Fresto com feed do Instagram integrado mostrando publicações da marca',
  caption: 'O conteúdo das redes sociais também ajuda a manter o site conectado às novidades da marca.',
  placeholder: 'Inserir seção do Instagram integrada à Home',
};

// Para inserir as imagens finais da Moto Remaza, preencha o campo `src` em cada item mantendo o `alt` descritivo.
const motoRemazaContextImage: CaseImageItem = {
  alt: 'Visão geral do site Moto Remaza com modelos de motos, chamadas de compra e conteúdos de apoio',
  caption: 'Visão geral da nova home do Moto Remaza.',
  placeholder: '[INSERIR IMAGEM — Visão geral da nova home do Moto Remaza]',
};

const motoRemazaChallengeImages: CaseImageItem[] = [
  {
    alt: 'Composição representando diferentes perfis de motociclistas ou categorias de motos',
    caption: 'Diferentes perfis e categorias orientam caminhos de navegação mais claros.',
    placeholder: '[INSERIR IMAGEM — Composição representando diferentes perfis de motociclistas ou categorias de motos]',
  },
  {
    alt: 'Página de categoria ou listagem de motos da Moto Remaza com filtros e modelos em destaque',
    caption: 'Pesquisa e comparação como parte central da jornada.',
    placeholder: '[INSERIR IMAGEM — Listagem de modelos e categorias]',
  },
  {
    alt: 'Página de detalhe de uma moto com informações técnicas, imagem do modelo e chamada para contato',
    caption: 'Informações importantes organizadas para apoiar a decisão.',
    placeholder: '[INSERIR IMAGEM — Detalhe de modelo com informações principais]',
  },
];

const motoRemazaProcessImage: CaseImageItem = {
  alt: 'Visão geral das interfaces ou fluxo principal do projeto Moto Remaza',
  caption: 'Visão geral das interfaces e do fluxo principal do projeto.',
  placeholder: '[INSERIR IMAGEM — Visão geral das interfaces ou fluxo principal do projeto]',
};

const motoRemazaResearchImage: CaseImageItem = {
  alt: 'Síntese visual dos direcionamentos da pesquisa do projeto Moto Remaza',
  caption: 'Direcionamentos reais identificados a partir das conversas com stakeholders e motociclistas.',
  placeholder: '[INSERIR IMAGEM — Síntese visual dos direcionamentos da pesquisa]',
};

const motoRemazaNavigationImages: CaseImageItem[] = [
  {
    alt: 'Header e menus de navegação do site Moto Remaza',
    caption: 'Header e menus de navegação planejados para acesso direto às principais áreas.',
    placeholder: '[INSERIR IMAGEM — Header e menus de navegação]',
  },
  {
    alt: 'Mega menu ou atalhos para modelos e serviços do site Moto Remaza',
    caption: 'Atalhos estratégicos conectam modelos, serviços e momentos da jornada.',
    placeholder: '[INSERIR IMAGEM — Mega menu ou atalhos para modelos e serviços]',
  },
];

const motoRemazaModelImages: CaseImageItem[] = [
  {
    alt: 'Catálogo de modelos com categorias do site Moto Remaza',
    caption: 'Catálogo de modelos organizado por categorias e necessidades de uso.',
    placeholder: '[INSERIR IMAGEM — Catálogo de modelos com categorias]',
  },
  {
    alt: 'Página de detalhes de uma motocicleta no site Moto Remaza',
    caption: 'Página de detalhes com versões, cores e informações do modelo.',
    placeholder: '[INSERIR IMAGEM — Página de detalhes de uma motocicleta]',
  },
];

const motoRemazaUsedImages: CaseImageItem[] = [
  {
    alt: 'Listagem de motos seminovas com filtros no site Moto Remaza',
    caption: 'Filtros e informações organizadas para facilitar a busca por seminovos.',
    placeholder: '[INSERIR IMAGEM — Listagem de motos seminovas com filtros]',
  },
  {
    alt: 'Página de detalhes de uma moto seminova no site Moto Remaza',
    caption: 'Detalhes de uma moto seminova apresentados de forma prática e profissional.',
    placeholder: '[INSERIR IMAGEM — Página de detalhes de uma moto seminova]',
  },
];

const motoRemazaServiceImages: CaseImageItem[] = [
  {
    alt: 'Agendamento de test-ride no site Moto Remaza',
    caption: 'Test-ride como parte da jornada de descoberta e decisão.',
    placeholder: '[INSERIR IMAGEM — Agendamento de test-ride]',
  },
  {
    alt: 'Agendamento de serviços e revisão no site Moto Remaza',
    caption: 'Serviços e revisão conectam o site à rotina de cuidado com a moto.',
    placeholder: '[INSERIR IMAGEM — Agendamento de serviços e revisão]',
  },
  {
    alt: 'Peças, acessórios e assistência técnica no site Moto Remaza',
    caption: 'Peças, acessórios e assistência técnica reunidos no ecossistema digital.',
    placeholder: '[INSERIR IMAGEM — Peças, acessórios e assistência técnica]',
  },
];

const motoRemazaNextStepsImage: CaseImageItem = {
  alt: 'Conceito da futura área personalizada por modelo de moto no site Moto Remaza',
  caption: 'Evolução planejada: uma área personalizada por modelo de moto, ainda não disponível na versão atual.',
  placeholder: '[INSERIR IMAGEM — Conceito da futura área personalizada por modelo de moto]',
};

const motoRemazaRelationshipImages: CaseImageItem[] = [
  {
    alt: 'Página Trabalhe Conosco do site Moto Remaza',
    caption: 'Atalho para quem deseja trabalhar na Moto Remaza.',
    placeholder: '[INSERIR IMAGEM — Página Trabalhe Conosco]',
  },
  {
    alt: 'Canal de comunicação com a diretoria no site Moto Remaza',
    caption: 'Canal de comunicação com a diretoria como parte da cultura de escuta do Grupo Remaza.',
    placeholder: '[INSERIR IMAGEM — Canal de comunicação com a diretoria]',
  },
];

const motoRemazaLearningImage: CaseImageItem = {
  alt: 'Motociclista em uma situação de uso real ou composição com diferentes jornadas',
  caption: 'Uma composição mais editorial sobre as diferentes relações das pessoas com a moto.',
  placeholder: '[INSERIR IMAGEM — Motociclista em uma situação de uso real ou composição com diferentes jornadas]',
};

const motoRemazaConclusionImage: CaseImageItem = {
  alt: 'Composição final com telas desktop e mobile do Moto Remaza',
  caption: 'Composição final com telas desktop e mobile do Moto Remaza.',
  placeholder: '[INSERIR IMAGEM — Composição final com telas desktop e mobile do Moto Remaza]',
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
      className={`h-full w-full transition duration-500 group-hover:scale-[1.015] ${
        image.fit === 'contain' ? 'object-contain' : 'object-cover'
      }`}
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
  const linkClass = inverted
    ? 'text-white/82 hover:text-white focus-visible:ring-white'
    : 'text-[var(--cinza-escuro)] hover:text-[var(--blue-padrao)] focus-visible:ring-[var(--tradewind-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white';
  const currentClass = inverted
    ? 'text-white'
    : 'text-[var(--blue-padrao)] dark:text-white';
  const separatorClass = inverted
    ? 'text-white/45'
    : 'text-[var(--cinza-escuro)]/45 dark:text-white/36';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex max-w-[calc(100vw-2.5rem)] flex-wrap items-center gap-2 rounded-md border px-3 py-2 font-display text-xs font-bold backdrop-blur-md ${
        inverted
          ? 'border-white/28 bg-black/18 text-white shadow-soft'
          : 'border-[var(--cinza-claro)] bg-white/86 text-[var(--blue-padrao)] shadow-soft dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]/82'
      }`}
    >
      <a
        href="/"
        className={`rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          inverted ? 'focus-visible:ring-offset-[var(--blue-escuro)]' : 'focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--fundo)]'
        } ${linkClass}`}
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
        aria-current="page"
      >
        {currentTitle}
      </a>
    </nav>
  );
}

function ProjectCaseContentHeader({ currentTitle, currentHref }: { currentTitle: string; currentHref: string }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 md:pb-12">
      <ProjectBreadcrumb currentTitle={currentTitle} currentHref={currentHref} />
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
      <div className="grid gap-[30px] md:grid-cols-2">
        {frestoChallengeImages.slice(1).map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
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
              Fluxo {index + 1} - {index === 0 ? 'Conhecer uma unidade' : 'Encontrar uma oportunidade'}
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
      <div className="grid gap-[30px] md:grid-cols-2">
        {frestoDesignSystemImages.slice(0, 2).map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
      <CaseImageSlot image={frestoDesignSystemImages[2]} aspectClass="aspect-[16/8]" />
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
    <div className="mt-12 grid gap-12">
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

function DaitanChallengeVisualBlock() {
  return (
    <div className="mt-12 grid gap-[30px]">
      <CaseImageSlot image={daitanChallengeImages[0]} aspectClass="aspect-[16/8]" />
      <div className="grid gap-[30px] md:grid-cols-2">
        {daitanChallengeImages.slice(1).map((image) => (
          <CaseImageSlot key={image.caption} image={image} aspectClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function ConsorcioRemazaContextBlock() {
  return (
    <CaseContextBlock
      leftTitle="Minha participação"
      leftItems={consorcioRemazaParticipation}
      rightTitle="Características do projeto"
      rightItems={consorcioRemazaProjectCharacteristics}
      image={consorcioRemazaContextImage}
    />
  );
}

function ConsorcioRemazaScopeVisualBlock() {
  return (
    <div className="grid gap-10">
      <ScopeBlock title="Escopo de atuação" items={consorcioRemazaScope} />
      <div className="mt-2 grid gap-[30px] md:grid-cols-[1.12fr_0.88fr] md:items-end">
        <CaseImageSlot image={consorcioRemazaSimulatorImages[0]} aspectClass="aspect-[16/9]" />
        <CaseImageSlot image={consorcioRemazaSimulatorImages[1]} aspectClass="aspect-[4/5]" />
      </div>
    </div>
  );
}

function ConsorcioRemazaImagePairBlock({ images, titles }: { images: CaseImageItem[]; titles: string[] }) {
  return (
    <div className="mt-12 grid gap-12">
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

function CaseVisualBlock({ variant }: { variant: string }) {
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
    return (
      <div className="grid gap-10">
        <ScopeBlock items={frestoScope} />
        <CaseImageSlot image={frestoProcessImage} aspectClass="aspect-[16/8]" />
      </div>
    );
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
    return <MotoRemazaImagePairBlock images={motoRemazaRelationshipImages} titles={['Trabalhe Conosco', 'Canal com a diretoria']} />;
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
        <CaseImageSlot image={gamp21HomeImage} aspectClass="aspect-[16/8] min-h-[22rem]" />
      </div>
    );
  }

  if (variant === 'gamp-audiences') {
    return (
      <div className="mt-12 grid gap-[30px]">
        <CaseImageSlot image={gamp21HeroImage} aspectClass="aspect-[16/8]" />
        <CaseImageSlot image={gamp21AudienceImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'gamp-scope') {
    return (
      <div className="grid gap-10">
        <ScopeBlock title="Escopo de atuação" items={gamp21Participation} />
        <CaseImageSlot image={gamp21ScreenSequenceImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'gamp-care') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={gamp21CareImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'gamp-services') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={gamp21ServicesImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'gamp-blog') {
    return <MotoRemazaImagePairBlock images={gamp21BlogImages} titles={['Blog “Para mães e pais”', 'Artigo interno']} />;
  }

  if (variant === 'gamp-balance') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={gamp21BalanceImage} aspectClass="aspect-[16/7]" />
      </div>
    );
  }

  if (variant === 'gamp-conclusion') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={gamp21ConclusionImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'daitan-context') {
    return (
      <div className="mt-14 grid gap-10">
        <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
          <ContextList title="Minha participação" items={daitanParticipation} />
          <ContextList title="Características do projeto" items={daitanProjectCharacteristics} />
        </div>
        <CaseImageSlot image={daitanHomeImage} aspectClass="aspect-[16/8] min-h-[22rem]" />
      </div>
    );
  }

  if (variant === 'daitan-challenge') {
    return <DaitanChallengeVisualBlock />;
  }

  if (variant === 'daitan-scope') {
    return (
      <div className="grid gap-10">
        <ScopeBlock title="Escopo de atuação" items={daitanParticipation} />
        <CaseImageSlot image={daitanResponsiveCompositionImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'daitan-experience') {
    return <MotoRemazaImagePairBlock images={daitanExperienceImages} titles={['Banners responsivos', 'Chamadas para formulários']} />;
  }

  if (variant === 'daitan-content') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={daitanContentManagementImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'daitan-performance') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={daitanPerformanceImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'daitan-learning') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={daitanLearningImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'consorcio-context') {
    return <ConsorcioRemazaContextBlock />;
  }

  if (variant === 'consorcio-challenge') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={consorcioRemazaChallengeImage} aspectClass="aspect-[16/8]" />
      </div>
    );
  }

  if (variant === 'consorcio-scope') {
    return <ConsorcioRemazaScopeVisualBlock />;
  }

  if (variant === 'consorcio-commercial') {
    return (
      <ConsorcioRemazaImagePairBlock
        images={consorcioRemazaCommercialImages}
        titles={['Central comercial', 'Ferramenta de apoio']}
      />
    );
  }

  if (variant === 'consorcio-trust') {
    return (
      <ConsorcioRemazaImagePairBlock
        images={consorcioRemazaTrustImages}
        titles={['Fotografias dos consultores', 'Presença no atendimento']}
      />
    );
  }

  if (variant === 'consorcio-content') {
    return (
      <ConsorcioRemazaImagePairBlock
        images={consorcioRemazaContentImages}
        titles={['Blog e notícias', 'Presença orgânica']}
      />
    );
  }

  if (variant === 'consorcio-conclusion') {
    return (
      <div className="mt-12">
        <CaseImageSlot image={consorcioRemazaConclusionImage} aspectClass="aspect-[16/8]" />
      </div>
    );
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
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">APP Remaza</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Redesenhando a experiência
                <br className="hidden md:block" />
                da Área do Cliente.
              </h1>
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
        <ProjectCaseContentHeader currentTitle="App Remaza" currentHref="/projetos/app-remaza" />
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
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">Fresto</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                <span className="block">Uma experiência digital</span>
                <span className="block">para despertar</span>
                <span className="block">o apetite.</span>
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
        <ProjectCaseContentHeader currentTitle="Fresto" currentHref="/projetos/fresto" />
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
                Moto Remaza
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Uma experiência digital criada para acompanhar diferentes jornadas sobre duas rodas.
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
        <ProjectCaseContentHeader currentTitle="Moto Remaza" currentHref="/projetos/moto-remaza" />
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
                Conteúdo, educação e acolhimento
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Gamp21
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Uma experiência digital para aproximar mães, pais e empresas de conteúdos, cursos e orientações sobre parentalidade.
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
        <ProjectCaseContentHeader currentTitle="Gamp21" currentHref="/projetos/gamp21" />
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
                Redesign de site automotivo · 2023
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Honda Daitan
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Uma experiência mais rápida, responsiva e fácil de utilizar para clientes e equipes responsáveis pela atualização do site.
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
        <ProjectCaseContentHeader currentTitle="Honda Daitan" currentHref="/projetos/daitan" />
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
                UX/UI Design · Plataforma digital
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.18rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Consórcio Remaza
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-white/82">
                Uma experiência digital criada para aproximar pessoas, possibilidades e o time comercial.
              </p>
              <div className="mt-8 grid gap-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-10">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Simuladores</p>
                  <p className="font-display text-lg font-extrabold text-white">Jornadas comerciais</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Entrega</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">Site institucional</p>
                  <p className="font-display text-lg font-extrabold text-white">Ferramentas comerciais</p>
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
