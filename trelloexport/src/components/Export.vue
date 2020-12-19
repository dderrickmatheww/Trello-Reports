<template>
  <div class="row">
    <div class="col-6">
      <b-dropdown id="dropdown-1" variant="primary" block menu-class="w-100" :text="trelloBoardSelected.Name">
        <b-dropdown-item class="selection" v-for="(item) in trelloBoard" :key="item.Key" v-on:click="selectTrelloBoard(item)"><img class="icon" src="../assets/images/trello.png" /> {{item.Name}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="col-6">
        <b-button v-on:click="exportTrelloData(trelloData)" block class="exportBtn"><img class="icon" src="../assets/images/excel.png" /> Export Data </b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import saveExcel from '@progress/kendo-vue-excel-export';

export default {
  name: 'Export',
  methods: {
    selectTrelloBoard: function (item) {
      this.$store.commit('selectTrelloBoard', item);
    },
    exportTrelloData: function (trelloData) {
      let cardSelectAll = false;
      let cards = trelloData.cards.filter((data) => {
        if(cardSelectAll) {
          return data;
        }
        else {
          var values = Object.values(data.labels);
          if(values.includes('Priority for Current Sprint') 
          && (
            !values.includes('Development Complete') 
            || !values.includes('UAT TBI P - Tested & Approved') 
            || !values.includes('PROD TBI P - Tested & Approved')
            )
          && data.name.includes('Story Points:')
          && (data.name.includes('TFS') || data.name.includes('TBI'))
          && (!data.name.includes('PROC'))) {
            return data;
          }
        }
      });
      saveExcel({
          data: cards,
          fileName: "TrelloReports",
          columns: [
            { field: 'Name', title: 'Trello Card'},
            { field: 'Story Points', title: cards.name.split('Story Points:')[1].split('/')[1] }
        ]
      });
    }
  },
  computed: mapState({
    trelloData: state => state.trelloCards,
    trelloBoard: state => state.trelloBoards,
    trelloBoardSelected: state => state.trelloBoardSelected
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  font-size: 250px;
  color: #1D6F42;
}
.row {
  margin-top: 5%;
}
#dropdown-1 {
  margin-left: 5%;
  margin-right: 5%;
  max-width: 100%;
}
.exportBtn {
  padding-left: 5%;
  padding-right: 5%;
  width: 97%;
  background-color:  #1D6F42;
}
.icon {
  width: 30px;
  height: 30px;
}
.selection {
  max-width: 90%;
}
</style>
