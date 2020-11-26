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
        <q-toggle
      :label="(isAdding) ? 'Modo Inserção' : 'Modo Consulta'"
      color="pink"
      v-model="isAdding"
    />
          <q-select outlined v-model="arquet"
            :options="arqOptions"
            label="Arquétipo" />
          <q-select outlined v-model="context" :options="contOptions" label="Contexto" />
          <q-select outlined v-model="alinh" :options="alinOptions" label="Alinhamento Moral" />
          <q-input outlined v-if="isAdding" :disable="(!context && !alinh && !arquet)" v-model="newOcup" label="Ocupação" placeholder="Ex: Soldado de guerra" :dense="false" />
          <q-input outlined v-if="isAdding" :disable="(!context && !alinh && !arquet)" v-model="newMotiv" label="Motivação" placeholder="Ex: Combater os monstros e as pessoas ruins do mundo" hint="Utilize uma frase simples com um único verbo" :dense="false" />
          <q-input outlined v-if="isAdding" :disable="(!context && !alinh && !arquet)" v-model="newInter" label="Interesse" placeholder="Ex: Forjar armaduras" hint="Utilize uma frase simples com um único verbo" :dense="false" />
          
          <div>
            <q-btn :label="(isAdding) ? 'Inserir' : 'Gerar'" type="submit" color="primary"/>
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
      isAdding: false,
      newMotiv: '',
      newOcup: '',
      newInter: '',
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
      this.newMotiv = "";
      this.newOcup = "";
      this.newInter = "";
    },
    generateText(ocup, motiv, inter) {
      const baseText = [
        `Um(a) ${ocup} tentando ${inter.toLowerCase()} e ${motiv.toLowerCase()} durante suas andanças da vida.`,
        `Um(a) ${ocup} com fortes interesses em ${inter.toLowerCase()} e motivado por ${motiv.toLowerCase()}.`,
        `Um(a) ${ocup} vivendo para ${inter.toLowerCase()} enquanto pensa em ${motiv.toLowerCase()}.`,
        `Um(a) ${ocup} com planos de ${inter.toLowerCase()} e ${motiv.toLowerCase()} no dia a dia desse mundo cão.`,
        `Um(a) ${ocup} cuja meta é ${inter.toLowerCase()}. Nessa vida, o que o(a) dá força é ${motiv.toLowerCase()}.`,
        `Um(a) ${ocup} com grandes sonhos de ${inter.toLowerCase()} isso sem esquecer de ${motiv.toLowerCase()}.`];

      return baseText[Math.floor(Math.random() * baseText.length)];
    },
    getNPC(context, align, arq) {
      this.possibleInters = [];
      this.possibleOcups = [];
      this.possibleMotivs = [];

      return this.$database()
        .ref('occupations/' + context)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childOcup) => {
            let val = childOcup.val();
            if(typeof val !== 'string' && !(val instanceof String)) {
              val = val.value;
            }
            this.possibleOcups.push(val);
          })
          // this.possibleOcups = snapshot.val();

          return this.$database()
          .ref('interests/' + arq + '/' + context)
          .once('value')
          .then((snapshot) => {
            //this.possibleInters = snapshot.val();

            snapshot.forEach((childInter) => {   
              let val = childInter.val();
              if(typeof val !== 'string' && !(val instanceof String)) {
                val = val.value;
              }
              
              this.possibleInters.push(val);
            })

            return this.$database()
            .ref('motivations/' + align + '/' + context)
            .once('value')
            .then((snapshot) => {
              //this.possibleMotivs = snapshot.val();
              snapshot.forEach((childMotiv) => {
                let val = childMotiv.val();
                if(typeof val !== 'string' && !(val instanceof String)) {
                  val = val.value;
                }
                this.possibleMotivs.push(val);
              })
            });
          });
        });
 
    },

    addNPCData (context, align, arq, newOcup, newMotiv, newInter) {

      if (newOcup.length > 0) {
        this.$database()
        .ref('occupations/' + context).push().set({
          value: newOcup
        })
      }

      if (newMotiv.length > 0) {
        this.$database()
        .ref('motivations/' + align + '/' + context).push().set({
          value: newMotiv
        })
      }

      if (newInter.length > 0) {
        this.$database()
        .ref('interests/' + arq + '/' + context).push().set({
          value: newInter
        })
      }

    },
    async onSubmit() {


      const context = this.contexts[this.context];
      const align = this.aligns[this.alinh];
      const arq = this.arqs[this.arquet];
      
      if (this.isAdding) {
        this.addNPCData(context, align, arq, this.newOcup, this.newMotiv, this.newInter);
        this.$q.notify('Dados inseridos com sucesso');
        this.onReset();
      } else {

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
  }
};
</script>
