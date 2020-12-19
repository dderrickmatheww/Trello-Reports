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
import { saveExcel } from '@progress/kendo-vue-excel-export';

export default {
  name: 'Export',
  methods: {
    selectTrelloBoard: function (item) {
      this.$store.commit('selectTrelloBoard', item);
    },
    exportTrelloData: function (trelloData) {
      //Left off - the data obj in the filter is not returning anything to the export
      let cardSelectAll = false;
      let cards = trelloData.cards.filter((data) => {
        if(cardSelectAll) {
          return data;
        }
        else {
          var values = data.labels ? Object.values(data.labels) : [];
          
          //Grabs all cards that have:
          //@1) Have ['Story Points', 'TBIIP:', 'TFS'] in the title
          //@2) Do not have ['PROC', 'SP:'] in the title
          //@3) That have any of these labels: ['Development Complete', 'In Development', 'Priority for Current Sprint labels']
          //@4) That do not have these labels: ['UAT TBI P - Tested & Approved', 'PROD TBI P - Tested & Approved', 'More Info Required']

          for(var i = 0; i < values.length; i++) {
            if (
              (
                !values[i].name.includes('UAT TBI P - Tested & Approved') 
                || !values[i].name.includes('PROD TBI P - Tested & Approved')
                || !values[i].name.includes('More Info Required')
              )
              &&
              (
                values[i].name.includes('Development Complete')
                || values[i].name.includes('In Development')
                || values[i].name.includes('Priority for Current Sprint')
              )
              && (data.name.includes('TBIP:') || data.name.includes('TFS'))
              && (data.name.includes('Story Points'))
              && (!data.name.includes('PROC') || !data.name.includes('SP:'))
            ) {
              return data;
            }
          }
        }
      });
      var labelArr = [];
      cards.map((data) => {
        labelArr.push(data.labels);
        var storyPoint = data.name.split('Story Points:')[1];
        storyPoint = parseInt(storyPoint.match(/(\d+)/));
        data['storyPoint'] = storyPoint;
        return data;
      });
      saveExcel({
          data: cards,
          fileName: "TrelloReports",
          columns: [
            { field: 'name', title: 'Trello Card'},
            { field: 'storyPoint', title: 'Story Points' }
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
