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
        <h6> {{displayText}} </h6>
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
      possibleInters: null,
      possibleOcups: null,
      possibleMotivs: null,
      displayInters: null,
      displayText: null,
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
      this.displayOcups = null;
      this.displayMotivs = null;
      this.displayInters = null;
      this.displayText = null;
    },
    generateText(ocup, motiv, inter) {
      return `Um ${ocup} e tenta ${inter.toLowerCase()} e ${motiv.toLowerCase()} durante suas andanças da vida`;
    },
    getNPC(context, align, arq) {
      return this.$database()
        .ref('occupations/' + context)
        .once('value')
        .then((snapshot) => {
          this.possibleOcups = snapshot.val();

          return this.$database()
          .ref('interests/' + arq + '/' + context)
          .once('value')
          .then((snapshot) => {
            this.possibleInters = snapshot.val();

            return this.$database()
            .ref('motivations/' + align + '/' + context)
            .once('value')
            .then((snapshot) => {
              this.possibleMotivs = snapshot.val();
            });
          });
        });
 
    },
    async onSubmit() {
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
          medieval: ['Passar um bom tempo com as pessoas que gosta e conseguir descansar o dia todo', 'Combater os monstros e as pessoas ruins do mundo'],
          cyberpunk: ['Ajudar pessoas que não tem condições de ter uma vida adequada'],
          recifense: ['Escutar sua familia e amigos fofoqueiros e sem espalhar pra ninguém', 'Ceder o lugar no ônibus para os mais velhos'],
        },
        NG: {
          medieval: [''],
          cyberpunk: [''],
          recifense: ['Sair na noite pra acompanhar os amigos e comer no Gildo lanches de madrugada', 'Só quer ficar de boa e tirar ferias pra ir pra praia'],
        },
        CG: {
          medieval: ['Sempre atrás de dinheiro (normalmente jogando em tavernas) para dar a caridade', 'Faz venda de artefatos / comida / afins, cobrando muito caro de senhores de terra e pouco de camponeses'],
          cyberpunk: ['Fazer de tudo para seus amigos, até mesmo vender uma perna (de outra pessoa)'],
          recifense: ['Fazer culto no metro / ônibus, no horário de volta, quando todo mundo ta tentando dormir', 'Gritar que tem tubarão na agua toda vez que vê alguém indo pro fundo na praia de Boa Viagem'],
        },
        LN: {
          medieval: ['Tentar fazer todos pagarem o que fizeram na mesma moeda (olho por olho, dente por dente)'],
          cyberpunk: [''],
          recifense: ['Dirigir dando a seta'],
        },
        TN: {
          medieval: ['Sentir a adrenalina de caçar presas, seja animais, monstros ou outra coisa'],
          cyberpunk: ['Ficar de boa no mundo virtual e esquecer que tem um corpo fisico'],
          recifense: ['Terminar sua graduação / mestrado / doutorado dps de incontáveis anos de curso, depois de ter desistido diversas vezes'],
        },

        CN: {
          medieval: ['Fazer confusão e sempre culpar outra pessoa'],
          cyberpunk: [''],
          recifense: ['Gritar “falou da mãe, vai deixar?”, toda vez que vê uma discussão na rua'],
        },

        LE: {
          medieval: ['Venerar os mais forte e humilhar os mais fracos'],
          cyberpunk: ['Tomar para si partes cibernéticas que ele acha bonito de outras pessoas'],
          recifense: ['Se autoproclamar dono da rua e reclamar toda vez que estacionam nela'],
        },
        NE: {
          medieval: ['Conseguir livros de magias, independente dos meios que tenha que usar'],
          cyberpunk: ['Usar informações roubadas de sistemas para benefícios próprio'],
          recifense: ['Bater carteira no carnaval'],
        },
        CE: {
          medieval: ['Ver pessoas de poder da cidades voltarem umas contras as outras, até a cidade se auto destruir'],
          cyberpunk: [''],
          recifense: ['Andar com outra pessoa numa moto pra assaltar', 'Andar na rua com a moto sem silenciador no escape'],
        },
      };

      const inters = {
        everyman: {
          medieval: ['Se apresentar para uma grande platéia', 'Criar receitas', 'Curar pessoas'],
          cyberpunk: ['Se apresentar para uma grande platéia', 'Criar receitas'],
          recifense: ['Se apresentar para uma grande platéia', 'Criar receitas', 'Curar pessoas', 'Correr numa maratona', 'Ter seu trabalho reconhecido'],
        },
        creator: {
          medieval: ['Se apresentar para uma grande platéia', 'Criar receitas', 'Forjar armaduras', 'Construir prédios', 'Fazer armas', 'Obter matéria prima de origem duvidosa'],
          cyberpunk: ['Se apresentar para uma grande platéia', 'Criar receitas', 'Construir prédios', 'Fazer armas', 'Obter matéria prima de origem duvidosa', 'Pilotar uma máquina voadora'],
          recifense: ['Se apresentar para uma grande platéia', 'Criar receitas', 'Construir prédios', 'Fazer armas', 'Obter matéria prima de origem duvidosa', 'Pilotar uma máquina voadora'],
        },
        caregiver: {
          medieval: ['Fazer móveis', 'Fazer uma carroça', 'Entregar mensagens', 'Forjar armaduras', 'Obter mais hóspedes nas suas instalações', 'Construir prédios', 'Consertar calçados', 'Fazer armas', 'Vender bastante bebida', 'Ter uma grande horta', 'Adestrar animais', 'Sobreviver'],
          cyberpunk: ['Fazer uma carroça', 'Entregar mensagens', 'Obter mais hóspedes nas suas instalações', 'Construir prédios', 'Fazer armas', 'Adestrar animais', 'Sobreviver'],
          recifense: ['Fazer móveis', 'Fazer uma carroça', 'Entregar mensagens', 'Obter mais hóspedes nas suas instalações', 'Entregar boletos', 'Construir prédios', 'Consertar calçados', 'Fazer armas', 'Vender bastante bebida', 'Obter comissão de 10%', 'Repassar conhecimento', 'Vender poca e água', 'Ter uma grande horta', 'Adestrar animais', 'Sobreviver'],
        },
        rebel: {
          medieval: ['Roubar os cofres públicos', 'Obter matéria prima de origem duvidosa', 'Brigar', 'Destruir os oponentes', 'Arrombar portas', 'Não ser notado', 'Fazer do mundo um lugar melhor', 'Matar o patrão'],
          cyberpunk: ['Roubar os cofres públicos', 'Obter matéria prima de origem duvidosa', 'Brigar', 'Arrombar portas', 'Não ser notado', 'Fazer do mundo um lugar melhor'],
          recifense: ['Roubar os cofres públicos', 'Obter matéria prima de origem duvidosa', 'Brigar', 'Arrombar portas', 'Não ser notado', 'Fazer do mundo um lugar melhor', 'Matar o patrão'],
        },
        ruler: {
          medieval: ['Roubar os cofres públicos', 'Converter pessoas', 'Destruir os oponentes', 'Defender sua honra', 'Ser o mais poderoso', 'Ficar rico', 'Defender um território', 'Manipular outras pessoas'],
          cyberpunk: ['Roubar os cofres públicos', 'Converter pessoas', 'Ser o mais poderoso', 'Ficar rico', 'Defender um território', 'Manipular outras pessoas'],
          recifense: ['Roubar os cofres públicos', 'Converter pessoas', 'Ser o mais poderoso', 'Ficar rico', 'Defender um território', 'Manipular outras pessoas'],
        },
        magician: {
          medieval: ['Obter matéria prima de origem duvidosa', 'Colecionar livros', 'Ser o mais poderoso'],
          cyberpunk: ['Obter matéria prima de origem duvidosa', 'Ser o mais poderoso'],
          recifense: ['Fazer macumba', 'Obter matéria prima de origem duvidosa', 'Colecionar livros', 'Ser o mais poderoso'],
        },
        hero: {
          medieval: ['Converter pessoas', 'Ter muitos seguidores', 'Destruir os oponentes', 'Defender sua honra', 'Fazer do mundo um lugar melhor', 'Defender um território', 'Ser campeão numa competição', 'Investigar crimes'],
          cyberpunk: ['Converter pessoas', 'Ter muitos seguidores', 'Fazer do mundo um lugar melhor', 'Defender um território', 'Ser campeão numa competição', 'Investigar crimes'],
          recifense: ['Converter pessoas', 'Ter muitos seguidores', 'Fazer do mundo um lugar melhor', 'Terminar a graduação', 'Defender um território', 'Ser campeão numa competição', 'Investigar crimes'],
        },
        sage: {
          medieval: ['Converter pessoas', 'Ter muitos seguidores', 'Colecionar livros', 'Obter conhecimento', 'Manipular outras pessoas'],
          cyberpunk: ['Converter pessoas', 'Ter muitos seguidores', 'Obter conhecimento', 'Manipular outras pessoas'],
          recifense: ['Converter pessoas', 'Ter muitos seguidores', 'Repassar conhecimento', 'Colecionar livros', 'Obter conhecimento', 'Manipular outras pessoas'],
        },
        jester: {
          medieval: ['Ter muitos seguidores', 'Comer', 'Ter um transporte', 'Ganhar dinheiro fácil', 'Viver na vida mansa'],
          cyberpunk: ['Ter muitos seguidores', 'Comer', 'Ter um veículo', 'Ganhar dinheiro fácil', 'Viver na vida mansa'],
          recifense: ['Ter muitos seguidores', 'Comer', 'Ter um veículo', 'Ganhar dinheiro fácil', 'Viver na vida mansa'],
        },
        innocent: {
          medieval: ['Comer', 'Não ser notado', 'Ficar rico', 'Ter um transporte', 'Ter uma grande horta', 'Ganhar dinheiro fácil', 'Sobreviver', 'Viver na vida mansa'],
          cyberpunk: ['Comer', 'Não ser notado', 'Ficar rico', 'Ter um veículo', 'Ganhar dinheiro fácil', 'Sobreviver', 'Viver na vida mansa'],
          recifense: ['Comer', 'Repassar conhecimento', 'Não ser notado', 'Ficar rico', 'Criar uma startup', 'Ter um veículo', 'Ter uma grande horta', 'Ganhar dinheiro fácil', 'Sobreviver', 'Viver na vida mansa'],
        },
        lover: {
          medieval: ['Encontrar um grande amor', 'Ter um(a) filho(a)'],
          cyberpunk: ['Ter um(a) filho(a)'],
          recifense: ['Encontrar um grande amor', 'Ter um(a) filho(a)'],
        },
        explorer: {
          medieval: ['Matar o patrão'],
          cyberpunk: ['Coletar peças sobressalentes'],
          recifense: ['Terminar a graduação', 'Matar o patrão', 'Criar uma startup'],
        },
      };

      const context = this.contexts[this.context];
      const align = this.aligns[this.alinh];
      const arq = this.arqs[this.arquet];
      
      this.getNPC(context, align, arq).then((response) => {
        
        const displayOcup = this.possibleOcups[Math.floor(Math.random() * this.possibleOcups.length)];

      
        const displayMotiv = this.possibleMotivs[Math.floor(Math.random() * this.possibleMotivs.length)];

      
      const displayInters =
        this.possibleInters[Math.floor(Math.random() * this.possibleInters.length)];
      
      this.displayText = this.generateText(
        displayOcup,
        displayMotiv,
        displayInters
      );

      });

      
    }
  }
};
</script>
