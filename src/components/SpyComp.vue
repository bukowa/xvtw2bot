<template>
  <div>
    <table id="tw2bot-spies" class="tbl-border-light tbl-striped basic-config">
      <tbody>
      <tr v-for="v in villages" :key="v">
        <td>{{ v.id }}</td>
        <td v-for="(s, index) in v.spies" :key="s">
          <!-- Spy Icon-->
          <div>
            <div :class="[spyIcon(s.id), s.canRecruit ? '' : 'icon-inactive']">
              <div class="icon-90x90-slot-locked" v-if="!s.canRecruit"></div>
            </div>
          </div>

          {{ s.typeReadable }}
          <div class="spy-actions">
            <input type="button" @click="recruitSpy(v.id, index)" value="Recruit" class="btn-border btn-green">
            <input type="button" @click="cancelRecruit(v.id, index)" value="Cancel" class="btn-border btn-red">
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <json-viewer
        :value="villages"
        :expand-depth=1
        copyable
        boxed
        sort></json-viewer>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";
import {ModelService} from "../modules/services";

// spy 'type'
// 3 = moving
// 0 = not recruited
// 1 = in village
// 2 = recruiting

const getReadableSpyType = function (t) {
  switch (t) {
    case 0:
      return 'not_recruited';
    case 1:
      return 'in_village';
    case 2:
      return 'recruiting';
    case 3:
      return 'moving'
  }
}

const canRecruitSpy = function (tavern, spyID) {
  if (spyID === 1 && tavern >= 1) {
    return true
  }
  if (spyID === 2 && tavern >= 3) {
    return true
  }
  if (spyID === 3 && tavern >= 6) {
    return true
  }
  if (spyID === 4 && tavern >= 9) {
    return true
  }
  if (spyID === 5 && tavern >= 12) {
    return true
  }
  return false
}

export default {
  components: {
    JsonViewer,
  },
  mounted() {
    this.updateSpies()
    window.setInterval(() => {
      this.updateSpies()
    }, 30000)
  },
  data() {
    return {
      'villages': [],
    }
  },
  methods: {
    spyIcon(spyID) {
      return 'no-border icon-120x120-unit-spy' + ((spyID > 1) ? ('-' + spyID) : '')
    },
    updateSpies: function () {
      // let v = ModelService.getVillages()
      // let k = Object.keys(v)
      // for (let i = 0; i < k.length; i++) {
      //   let tavern = v[k[i]]['buildingData']['data']['tavern']['level']
      //   let spies = v[k[i]]['scoutingInfo']['spies']
      //   spies.forEach(function (v, i) {
      //     spies[i]['canRecruit'] = canRecruitSpy(tavern, spies[i].id)
      //     spies[i]['typeReadable'] = getReadableSpyType(spies[i]['type'])
      //   })
      //   this.villages[i] = {
      //     'id': k[i],
      //     'tavern': tavern,
      //     'spies': spies,
      //   }
      // }
    },
    recruitSpy(village_id, index) {
      const vm = this;
      GameApi(Routes.SCOUTING_RECRUIT, {"village_id": village_id, "slot": index + 1}, function () {
        vm.updateSpies()
      })
    },
    cancelRecruit(village_id, index) {
      const vm = this;
      GameApi(Routes.SCOUTING_CANCEL_RECRUIT, {"village_id": village_id, "slot": index + 1}, function () {
        vm.updateSpies()
      })
    },
  }
}
</script>

<style>
#tw2bot-spies {
  margin-bottom : 35px;
}

#tw2bot-spies .spy-actions {
  display         : flex;
  flex-wrap       : nowrap;
  justify-content : center;
}

/*#tw2bot-spies .spy-actions > * {*/
/*  margin : 5px;*/
/*}*/
</style>
