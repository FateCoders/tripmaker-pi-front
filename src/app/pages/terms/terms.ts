import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderTitle } from '../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class TermsComponent {
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  // Variável que pode ser usada para alterar o título dependendo do perfil (opcional)
  pageTitle: string = 'Termos e Condições';
  pageSubtitle: string = 'Leia atentamente antes de usar a plataforma.';
  
  // Conteúdo dos Termos e Condições
  readonly termsContent = [
    { type: 'heading', level: 1, text: 'Termos de Uso e Condições e Política de Privacidade – TripMaker' },
    { type: 'text', content: 'Data da Última Atualização: 04 de Novembro de 2025' },
    
    { type: 'heading', level: 2, text: '1. Introdução e Aceitação dos Termos' },
    { type: 'text', content: 'Estes Termos de Uso e a Política de Privacidade anexa ("Termos") regulamentam o acesso e a utilização da plataforma TripMaker ("Plataforma"), um aplicativo de turismo focado no interior do estado de São Paulo.' },
    { type: 'text', content: 'Ao se cadastrar, acessar ou utilizar a Plataforma, você ("Usuário") – seja ele Viajante, Empreendedor Local, Promotor Turístico ou Administrador – manifesta sua total concordância com estes Termos e Condições, que passam a ser um contrato vinculante entre você e a TripMaker.' },
    
    { type: 'heading', level: 2, text: '2. Perfis de Usuário e Responsabilidades' },
    { type: 'text', content: 'A Plataforma opera com diferentes perfis, cada um com responsabilidades específicas:' },
    { type: 'table', content: [
      ['Perfil', 'Tipo de Conteúdo/Ação', 'Responsabilidade'],
      ['**Viajante**', 'Consome informações, cria roteiros pessoais (via IA) e interage com o conteúdo.', 'Verificar a adequação, segurança e validade de qualquer informação de viagem obtida na Plataforma antes de utilizá-la.'],
      ['**Empreendedor Local**', 'Cadastra e gerencia informações de Comércios, Endereços, Horários e Preços.', 'Garantir a veracidade, exatidão e legalidade (incluindo CNPJ) de todas as informações fornecidas e a qualidade dos serviços/produtos oferecidos aos Viajantes.'],
      ['**Promotor Turístico**', 'Cadastra Eventos, Rotas e Conteúdo Geográfico específico.', 'Garantir a veracidade e legalidade do conteúdo, bem como obter todas as licenças e autorizações necessárias para os eventos divulgados.'],
    ]},
    
    { type: 'heading', level: 2, text: '3. Disposições sobre a Inteligência Artificial (IA)' },
    { type: 'text', content: 'A TripMaker utiliza ferramentas de Inteligência Artificial para gerar roteiros personalizados, sugestões e resumos de forma rápida e eficiente.' },
    { type: 'heading', level: 3, text: '3.1. Isenção de Responsabilidade por Erros da IA' },
    { type: 'text', content: 'O Usuário reconhece e aceita que:' },
    { type: 'list', items: [
      'Inacurácia: Os roteiros e sugestões geradas pela IA são sugestões automáticas baseadas em dados e algoritmos, e podem conter imprecisões, erros de cálculo de tempo, ou não refletir a realidade atual do local (ex.: horários de funcionamento, condições climáticas, fechamento de vias).',
      'Natureza Auxiliar: O conteúdo da IA tem caráter meramente informativo e auxiliar. A TripMaker não garante a exatidão, integridade ou adequação desse conteúdo e se exime de responsabilidade por quaisquer danos ou prejuízos resultantes da confiança depositada exclusivamente nas sugestões da IA.',
      'Verificação Humana: É responsabilidade do Usuário (Viajante) conferir as informações e planejar a viagem considerando o contexto real.',
    ]},

    { type: 'heading', level: 2, text: '4. Lei Geral de Proteção de Dados (LGPD) e Privacidade' },
    { type: 'text', content: 'A TripMaker se compromete com a segurança e a proteção dos dados pessoais de acordo com a Lei nº 13.709/2018 (LGPD).' },
    { type: 'heading', level: 3, text: '4.1. Dados Coletados e Finalidade:' },
    { type: 'table', content: [
      ['Categoria de Dado', 'Tipo de Dado', 'Finalidade'],
      ['**Cadastrais**', 'Nome, Email, Senha, Telefone, Perfil, CNPJ/CPF (quando aplicável).', 'Identificação, Acesso ao Serviço e Comunicações de Segurança.'],
      ['**Comportamentais**', 'Preferências de Viagem, Histórico de Roteiros e Interações no chat de IA.', 'Personalização de sugestões (AI) e melhoria contínua da experiência.'],
      ['**Geográficos**', 'Localização do dispositivo (com consentimento) e Geolocalização de Comércios/Eventos.', 'Mapeamento de rotas e sugestões próximas.'],
    ]},
    { type: 'heading', level: 3, text: '4.2. Tratamento e Compartilhamento:' },
    { type: 'list', items: [
      'Consentimento: O Usuário fornece o consentimento para o tratamento de seus dados ao aceitar estes Termos.',
      'Anonimização: Dados comportamentais e geográficos poderão ser tratados e compartilhados de forma anonimizada (sem identificação direta do Usuário) com terceiros para fins estatísticos, de pesquisa e de marketing do turismo no interior paulista.',
      'Segurança: Adotamos medidas técnicas e organizacionais para proteger os dados pessoais de acessos e tratamentos não autorizados ou ilícitos.',
    ]},

    { type: 'heading', level: 2, text: '5. Disposições Finais' },
    { type: 'list', items: [
      'Propriedade Intelectual: Todo o software, design e código da Plataforma são de propriedade da TripMaker.',
      'Modificações: A TripMaker pode revisar e alterar estes Termos a qualquer momento. A versão mais recente será sempre a publicada no aplicativo.',
      'Lei Aplicável e Foro: Estes Termos são regidos e interpretados exclusivamente de acordo com as leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de Tatuí, São Paulo, para dirimir quaisquer dúvidas ou litígios decorrentes destes Termos, com renúncia expressa a qualquer outro.',
    ]},
  ];

  goBack(): void {
    this.location.back();
  }
}