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
          <q-select outlined v-model="arquet" :options="arqOptions" label="Arquétipo" />
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
    return {
      displayOcup: null,
      displayMotiv: null,
      arquet: null,
      context: null,
      alinh: null,
      arqOptions: [
        'The Innocent', 'The Everyman', 'The Hero', 'The Caregiver', 'The Explorer', 'The Rebel', 'The Lover', 'The Creator/Artist', 'The Jester', 'The Sage', 'The Magician', 'The Ruler',
      ],
      contOptions: [
        'Medieval', 'Cyberpunk', 'Recifense',
      ],
      alinOptions: [
        'Lawful good', 'Neutral good', 'Chaotic good', 'Lawful neutral', 'True neutral', 'Chaotic neutral', 'Lawful evil', 'Neutral evil', 'Chaotic evil',
      ],
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
      let rand;
      if (this.context === 'Medieval') {
        rand = Math.floor(Math.random() * this.medieval.length);
        this.displayOcup = this.medieval[rand];
      } else if (this.context === 'Cyberpunk') {
        rand = Math.floor(Math.random() * this.cyberpunk.length);
        this.displayOcup = this.cyberpunk[rand];
      } else {
        rand = Math.floor(Math.random() * this.recifense.length);
        this.displayOcup = this.recifense[rand];
      }

      if (this.alinh === 'Lawful good') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Passar um bom tempo com as pessoas que gosta e conseguir descansar o dia todo. Combater os monstros e as pessoas ruins do mundo.';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = 'Ajudar pessoas que não tem condições de ter uma vida adequada';
        } else {
          this.displayMotiv = 'Escutar sua familia e amigos fofoqueiros e realmente não espalhar pra ninguém. Ceder o lugar no ônibus para os mais velhos, gestates ou PCD';
        }
      } else if (this.alinh === 'Neutral good') {
        if (this.context === 'Medieval') {
          this.displayMotiv = '';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = '';
        } else {
          this.displayMotiv = 'Sair na noite pra acompanhar os amigos e comer no Gildo lanches de madrugada. Só quer ficar de boa e tirar ferias pra ir pra praia.';
        }
      } else if (this.alinh === 'Chaotic good') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Sempre atrás de dinheiro (normalmente jogando em tavernas) para dar a caridade. Faz venda de artefatos / comida / afins, cobrando muito caro de senhores de terra e pouco de camponeses';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = 'Fazer de tudo para seus amigos, até mesmo vender uma perna (de outra pessoa).';
        } else {
          this.displayMotiv = 'Fazer culto no metro / ônibus, no horário de volta, quando todo mundo ta tentando dormir. Gritar que tem tubarão na agua toda vez que vê alguém indo pro fundo na praia de BV';
        }
      } else if (this.alinh === 'Lawful neutral') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Tentar fazer todos pagarem o que fizeram na mesma moeda (olho por olho, dente por dente)';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = '';
        } else {
          this.displayMotiv = 'Dirigir dando a seta (essa pessoa realmente existe em recife?)';
        }
      } else if (this.alinh === 'True neutral') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Sentir a adrenalina de caçar presas, seja animais, monstros ou outra coisa.';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = 'Ficar de boa no mundo virtual e esquecer que tem um corpo fisico.';
        } else {
          this.displayMotiv = 'Terminar sua graduação / mestrado / doutorado dps de incontáveis anos de curso, depois de ter desistido diversas vezes.';
        }
      } else if (this.alinh === 'Chaotic neutral') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Fazer confusão e sempre culpar outra pessoa.';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = '';
        } else {
          this.displayMotiv = 'Gritar “falou da mãe, vai deixar?”, toda vez que vê uma discussão na rua.';
        }
      } else if (this.alinh === 'Lawful evil') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Venerar os mais forte e humilhar os mais fracos.';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = 'Tomar para si partes cibernéticas que ele acha bonito de outras pessoas ';
        } else {
          this.displayMotiv = 'Se autoproclamar dono da rua e cobrar toda vez que estacionam nela';
        }
      } else if (this.alinh === 'Neutral evil') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Conseguir livros de magias, independente dos meios que tenha que usar';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = 'Usar informações roubadas de sistemas para benefícios próprio';
        } else {
          this.displayMotiv = 'Bater carteira no carnaval';
        }
      } else if (this.alinh === 'Chaotic evil') {
        if (this.context === 'Medieval') {
          this.displayMotiv = 'Ver pessoas de poder da cidades voltarem umas contras as outras, até a cidade se auto destruir';
        } else if (this.context === 'Cyberpunk') {
          this.displayMotiv = '';
        } else {
          this.displayMotiv = 'Andar com outra pessoa numa moto pra assaltar. Andar na rua com a moto sem silenciador no escape';
        }
      }
    },
  },
};
</script>
