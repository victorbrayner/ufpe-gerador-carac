<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 600px">
      <div class="q-gutter-md">
        <h3>Gerador de Características</h3>
        <q-form
          class="q-gutter-md"
          @reset="onReset"
          @submit="onSubmit"
        >
          <q-select outlined v-model="arquet"
            :options="arqOptions"
            label="Arquétipo" />
          <q-select outlined v-model="context" :options="contOptions" label="Contexto" />
          <q-select outlined v-model="alinh" :options="alinOptions" label="Alinhamento Moral" />
          <div>
            <q-btn label="Gerar" type="submit" color="primary"/>
            <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
        <h6>{{ displayOcup }} - {{ displayMotiv }}</h6>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    const arqs = {
      'The Innocent': 'innocent',
      'The Everyman': 'everyman',
      'The Hero': 'hero',
      'The Caregiver': 'caregiver',
      'The Explorer': 'explorer',
      'The Rebel': 'rebel',
      'The Lover': 'lover',
      'The Creator/Artist': 'creator',
      'The Jester': 'jester',
      'The Sage': 'sage',
      'The Magician': 'magician',
      'The Ruler': 'ruler',
    };
    const contexts = {
      Medieval: 'medieval',
      Cyberpunk: 'cyberpunk',
      Recifense: 'recifense',
    };
    const aligns = {
      'Lawful good': 'LG',
      'Neutral good': 'NG',
      'Chaotic good': 'CG',
      'Lawful neutral': 'LN',
      'True neutral': 'TN',
      'Chaotic neutral': 'CN',
      'Lawful evil': 'LE',
      'Neutral evil': 'NE',
      'Chaotic evil': 'CE',
    };
    return {
      displayOcup: null,
      displayMotiv: null,
      arquet: null,
      context: null,
      alinh: null,
      arqOptions: Object.keys(arqs),
      arqs,
      contOptions: Object.keys(contexts),
      contexts,
      alinOptions: Object.keys(aligns),
      aligns,
    };
  },
  methods: {
    onReset() {
      this.arquet = null;
      this.context = null;
      this.alinh = null;
      this.displayOcup = null;
      this.displayMotiv = null;
    },
    onSubmit() {
      const ocup = {
        medieval: [
          'Ator', 'Ferreiro', 'Taverneiro', 'Carpinteiro', 'Construtor', 'Sapateiro', 'Cozinheiro', 'Carteiro', 'Mestre da Guilda', 'Mago', 'Escultora', 'Açougueira', 'Lorde', 'Professora', 'Advogada', 'Pirata', 'Necromante', 'Açougueira', 'Fazendeira', 'Cavaleiro', 'Bruxo',
        ],
        cyberpunk: [
          'Atriz', 'Médico', 'Médica', 'Prefeito', 'Padre', 'Coletor de Impostos', 'Músico', 'Professor', 'Prefeito', 'Mendigo', 'Caçador', 'Caçadora', 'Ladra', 'Torturadora', 'Banqueiro', 'Mercador', 'Mercadora', 'Soldado', 'Programadora', 'Youtuber', 'Policial',
        ],
        recifense: [
          'Vendedor Ambulante', 'Veterinário', 'Estudante', 'Programador', 'Entregador de Pizza', 'Investidor de Criptomoeda', 'Chaveiro', 'Vendedora Ambulante', 'Padeiro', 'Bibliotecário', 'Pintor', 'Pintora', 'Gari', 'Investidora de Criptomoeda', 'Doméstica',
        ],
      };

      const motivs = {
        LG: {
          medieval: ['Passar um bom tempo com as pessoas que gosta e conseguir descansar o dia todo.', 'Combater os monstros e as pessoas ruins do mundo.'],
          cyberpunk: ['Ajudar pessoas que não tem condições de ter uma vida adequada'],
          recifense: ['Escutar sua familia e amigos fofoqueiros e realmente não espalhar pra ninguém.', 'Ceder o lugar no ônibus para os mais velhos.'],
        },
        NG: {
          medieval: [''],
          cyberpunk: [''],
          recifense: ['Sair na noite pra acompanhar os amigos e comer no Gildo lanches de madrugada.', 'Só quer ficar de boa e tirar ferias pra ir pra praia.'],
        },
        CG: {
          medieval: ['Sempre atrás de dinheiro (normalmente jogando em tavernas) para dar a caridade.', 'Faz venda de artefatos / comida / afins, cobrando muito caro de senhores de terra e pouco de camponeses'],
          cyberpunk: ['Fazer de tudo para seus amigos, até mesmo vender uma perna (de outra pessoa).'],
          recifense: ['Fazer culto no metro / ônibus, no horário de volta, quando todo mundo ta tentando dormir.', 'Gritar que tem tubarão na agua toda vez que vê alguém indo pro fundo na praia de BV'],
        },
        LN: {
          medieval: ['Tentar fazer todos pagarem o que fizeram na mesma moeda (olho por olho, dente por dente)'],
          cyberpunk: [''],
          recifense: ['Dirigir dando a seta.'],
        },
        TN: {
          medieval: ['Sentir a adrenalina de caçar presas, seja animais, monstros ou outra coisa.'],
          cyberpunk: ['Ficar de boa no mundo virtual e esquecer que tem um corpo fisico.'],
          recifense: ['Terminar sua graduação / mestrado / doutorado dps de incontáveis anos de curso, depois de ter desistido diversas vezes.'],
        },

        CN: {
          medieval: ['Fazer confusão e sempre culpar outra pessoa.'],
          cyberpunk: [''],
          recifense: ['Gritar “falou da mãe, vai deixar?”, toda vez que vê uma discussão na rua.'],
        },

        LE: {
          medieval: ['Venerar os mais forte e humilhar os mais fracos.'],
          cyberpunk: ['Tomar para si partes cibernéticas que ele acha bonito de outras pessoas.'],
          recifense: ['Se autoproclamar dono da rua e cobrar toda vez que estacionam nela.'],
        },
        NE: {
          medieval: ['Conseguir livros de magias, independente dos meios que tenha que usar'],
          cyberpunk: ['Usar informações roubadas de sistemas para benefícios próprio'],
          recifense: ['Bater carteira no carnaval'],
        },
        CE: {
          medieval: ['Ver pessoas de poder da cidades voltarem umas contras as outras, até a cidade se auto destruir.'],
          cyberpunk: [''],
          recifense: ['Andar com outra pessoa numa moto pra assaltar.', 'Andar na rua com a moto sem silenciador no escape.'],
        },
      };

      const context = this.contexts[this.context];
      const align = this.aligns[this.alinh];

      const possibleOcups = ocup[context];
      this.displayOcup = possibleOcups[Math.floor(Math.random() * possibleOcups.length)];

      const possibleMotivs = motivs[align][context];
      this.displayMotiv = possibleMotivs[Math.floor(Math.random() * possibleMotivs.length)];
    },
  },
};
</script>
