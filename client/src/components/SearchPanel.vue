<template>
  <div class="bg-grey-5">
    <q-list padding bordered class="rounded-borders">

      <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="save_alt"
              label="Descarcare date"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-btn flat no-caps label="Lista monumente [CSV @191KB]" align="between" type="a" href="/data/monumente_cluj.csv" target="_blank"/>
            <q-btn disable flat no-caps label="Arhiva poze [ZIP @27.1GB]" align="between" type="a" href="/data/monumente_cluj.csv" target="_blank"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="done"
              label="Filtrare Tip Patrimoniu"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="" label="Toate tipurile" color="grey-8" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="REPREZENTATIV" label="Reprezentativ" color="purple-9" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="DOMESTIC_URBAN" label="Domestic Urban" color="orange-8" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="DOMESTIC_RURAL" label="Domestic Rural" color="red-8" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="RELIGIOS" label="Religios" color="blue-7" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="ADMINISTRATIV" label="Administrativ " color="yellow-12" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="TRANSPORTURI" label="Transporturi" color="purple-12" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="PREINDUSTRIAL_PRELUCRATOR" label="Preindustrial Prelucrator" color="lime-13" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_EXTRACTIV" label="Industrial Extractiv" color="light-green-13" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_PRELUCRATOR" label="Industrial Prelucrator" color="cyan-12" />
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_ENERGETIC" label="Industrial Energetic" color="green-10" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="done_all"
              label="Filtrare Valoare"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruValoareMon" val="" label="Toate" color="grey-8" />
            <q-radio keep-color v-model="filtruValoareMon" val="A" label="Nationala (A)" color="teal">
              <q-tooltip>
                Categoria A - monumente de interes naţional
              </q-tooltip>
            </q-radio>
            <q-radio keep-color v-model="filtruValoareMon" val="B" label="Locala (B)" color="teal">
              <q-tooltip>
                Categoria B - monumente de interes local
              </q-tooltip>
            </q-radio>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="done_all"
              label="Filtrare Scara"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruScaraMon" val="" label="Toate" color="grey-8" />
            <q-radio keep-color v-model="filtruScaraMon" val="m" label="Monument (m)" color="teal" />
            <q-radio keep-color v-model="filtruScaraMon" val="a" label="Ansamblu (a)" color="teal" />
            <q-radio keep-color v-model="filtruScaraMon" val="s" label="Sit arheologic (s)" color="teal" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
              default-opened
              dense
              dense-toggle
              expand-separator
              icon="search"
              label="Cautare"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">

            <q-input
                    bottom-slots
                    v-model="filterText"
                    label="Căutare"
                    :dense="true"
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon
                        name="close"
                        @click="filterText = ''"
                        class="cursor-pointer"
                />
              </template>

              <template v-slot:hint>
                <div class="row">
                  <p class="col text-left">Total selecție</p>
                  <p class="col text-right">{{ countFilteredList }}</p>
                </div>
              </template>
            </q-input>

            <div style="padding-top: 15px"></div>

            <q-list separator>
              <q-item
                      dense
                      avatar
                      clickable
                      v-ripple
                      v-for="item in monFilteredList"
                      :key="item['cod_lmi']"
                      @click="selectMonument(item['cod_lmi'])"
              >
                <q-item-section>
                  {{ item["denumire"] }}
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="fiber_manual_record" :color="colorCodes[item['icon_code']]"/>
                </q-item-section>
              </q-item>
            </q-list>

          </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </div>
</template>

<script>
export default {

  data () {
    return {
      colorCodes: {
        REPREZENTATIV: 'purple-9',
        DOMESTIC_URBAN: 'orange-8',
        DOMESTIC_RURAL: 'red-8',
        RELIGIOS: 'blue-7',
        ADMINISTRATIV: 'yellow-12',
        TRANSPORTURI: 'purple-12',
        PREINDUSTRIAL_PRELUCRATOR: 'lime-13',
        INDUSTRIAL_EXTRACTIV: 'light-green-13',
        INDUSTRIAL_PRELUCRATOR: 'cyan-12',
        INDUSTRIAL_ENERGETIC: 'green-10',
      },
    };
  },
  computed: {
    filterText: {
      get () {
        return this.$store.state.monuments.filterText || "";
      },
      set: function (value) {
        this.$store.dispatch("monuments/setFilterText", value);
      }
    },
    filtruTipPatrimoniu: {
      get (){
        return this.$store.state.monuments.filtruTipPatrimoniu || "";
      },
      set (value) {
        this.$store.dispatch("monuments/setFiltruTipPatrimoniu", value);
      }
    },
    filtruValoareMon: {
      get (){
        return this.$store.state.monuments.filtruValoareMon || "";
      },
      set (value) {
        this.$store.dispatch("monuments/setFiltruValoareMon", value);
      }
    },
    filtruScaraMon: {
      get (){
        return this.$store.state.monuments.filtruScaraMon || "";
      },
      set (value) {
        this.$store.dispatch("monuments/setFiltruScaraMon", value);
      }
    },
    
    monFilteredList () {
      return this.$store.getters["monuments/filteredArray"];
    },
    countFilteredList () {
      return this.monFilteredList.length;
    },
    getColorCode (value) {
      return this.colorCodes[value];
    }
  },
  methods: {
    selectMonument (codLmi) {
      this.$store.dispatch("monuments/selectItem", codLmi);
    }
  }
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px
</style>
