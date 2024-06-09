<template>
  <!--  <div @mouseover="visible = true" id="oursecretid"></div>-->
  <!--  <div id="ourhideid"  @mouseout="visible = false"  :class="{visible: visible}" >-->

  <button id="tw2bot-show" class="btn-orange" v-on:click="windowIsHidden = !windowIsHidden"></button>

  <section id="tw2bot" class="twx-window screen left" v-if="!windowIsHidden">
    <div class="win-content">

      <header class="win-head">
        <h2>Tescik</h2>
        <ul class="list-btn">
          <li><a href="#" class="size-34x34 btn-red icon-26x26-close" v-on:click="windowIsHidden = true"></a></li>
        </ul>
      </header>

      <div class="win-main jssb-applied jssb-scrolly jssb-focus" style="position: relative;">
        <div class="tabs tabs-bg">
          <div class="tabs-three-col">
            <TabItem
                v-for="tab in tabs"
                :key="tab.url"
                :url="tab.url"
                :name="tab.name"
                @click="setPath(tab.url)"
            />
<!--            <TabItem url="#/injector" name="Injector" @click="setPath('/injector')"></TabItem>-->
<!--            <TabItem url="#/spies" name="Spies"></TabItem>-->
<!--            <TabItem url="#/looted" name="Looted"></TabItem>-->
<!--            <TabItem url="#/quester" name="Quester"></TabItem>-->
<!--            <TabItem url="#/villages" name="Villages"></TabItem>-->
<!--            <TabItem url="#/runner" name="Runner"></TabItem>-->
<!--            <TabItem url="#/" name="Loader"></TabItem>-->
          </div>
        </div>
        <div class="box-paper footer">
          <div class="scroll-wrap">
            <component :is="currentView"/>
          </div>
        </div>
        <WindowScroll></WindowScroll>
      </div>
      <WindowFooter></WindowFooter>
    </div>
  </section>
</template>

<script>
import WindowFooter from "./components/WindowFooter.vue";
import WindowScroll from "./components/WindowScroll.vue";
import TabItem from './components/TabItem.vue';
import Villages from "./components/Villages.vue";
import Loader from "./components/Loader.vue";

const wrapper = document.getElementById('wrapper');

import * as svc from './modules/services'
import {mapState} from "vuex";
import Recruiter from "./components/Recruiter.vue";

const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));


export default {
  name: 'App',
  components: {
    WindowFooter,
    WindowScroll,
    TabItem,
    Villages,
    Loader,
    Recruiter
  },
  data() {
    return {
      currentPath: window.location.hash,
      visible: false,
      windowIsHidden: true,
      tabs: [
        {url: '/', name: 'Loader'},
        {url: '/villages', name: 'Villages'},
        {url: '/recruiter', name: 'Recruiter'}
      ]
    }
  },
  methods: {
    setPath(path) {
      this.$store.commit('setPath', path)
    }
  },
  computed: {
    ...mapState([
      'path'
    ]),
    currentView() {
      return this.tabs.find(tab=>tab.url === this.path).name
    }
  },
  watch: {
    windowIsHidden(newValue) {
      if (newValue === false) {
        wrapper.classList.add("woho-window-open");
      } else {
        wrapper.classList.remove("woho-window-open");
      }
    }
  },
  async mounted() {
    // window.addEventListener('hashchange', () => {
    //   this.currentPath = window.location.hash
    // })
    // // pick world
    //
    // // skip tutorial
    // if (document.querySelector('[ng-click="openSkipTutorialModal()"]') != null) {
    //   svc.SocketService.emit(svc.RouteProvider.TUTORIAL_SKIP, {}, function () {
    //     svc.$rootScope.$broadcast(svc.EventTypeProvider.NOTIFICATION_ENABLE);
    //     svc.$timeout(function () {
    //       window.location.reload();
    //     }, 100);
    //   });
    // }
    // // take rewards
    //
    // let e = document.querySelector('[ng-click="claimReward()"]');
    // if (e != null) {
    //   e.click();
    // }
    // await sleep(500)
    // // skip news
    // e = document.querySelector('[ng-click="cancel(content); hide(notificationId);"]')
    // while (!e.classList.contains('ng-hide')) {
    //   await sleep(500)
    //   e.click();
    // }
  }
}
</script>

<style>
#tw2bot .scroll-wrap {
  overflow-y: scroll;
  height: 100%;
}

#tw2bot-show {
  position: absolute;
  bottom: 110px;
  left: 0;
  margin-left: 9px;
  width: 44px;
  height: 44px;
  z-index: 10;
}

#tw2bot-show:before {
  content: "";
  background-image: url(https://twxzz.innogamescdn.com/img/icons/alpha_eee77292f1.png);
  background-position: -272px -1070px;
  width: 44px;
  height: 44px;
  margin: 2px 0 0 -2px;
  display: inline-block;
}

/*#tw2bot {*/
/*  z-index : 9 !important;*/
/*}*/

#wrapper.woho-window-open .two-menu-container,
#wrapper.woho-window-open #tw2bot-show,
#wrapper.window-open #tw2bot-show {
  left: 713px;
}

/*#wrapper.woho-window-open #topinterface-right-wrapper {*/
/*  z-index : 7;*/
/*}*/
</style>
