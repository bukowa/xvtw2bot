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
            <TabItem url="#/injector" name="Injector"></TabItem>
            <TabItem url="#/spies" name="Spies"></TabItem>
            <TabItem url="#/looted" name="Looted"></TabItem>
            <TabItem url="#/quester" name="Quester"></TabItem>
            <TabItem url="#/villages" name="Villages"></TabItem>
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
import HelloWorld from './components/HelloWorld.vue';
import WindowFooter from "./components/WindowFooter.vue";
import WindowScroll from "./components/WindowScroll.vue";
import TabItem from './components/TabItem.vue';
import WindowInjector from "./components/WindowInjector.vue";
import SpyComp from "./components/SpyComp.vue";
import LootedCounter from "./components/LootedCounter.vue";
import Quester from "./components/Quester.vue";
import Villages from "./components/Villages.vue";

const wrapper = document.getElementById('wrapper');

const routes = {
  "/": SpyComp,
  "/settings": HelloWorld,
  "/injector": WindowInjector,
  "/spies": SpyComp,
  "/looted": LootedCounter,
  "/quester": Quester,
  "/villages": Villages
}

export default {
  name: 'App',
  components: {
    WindowFooter,
    WindowScroll,
    HelloWorld,
    TabItem,
  },
  data() {
    return {
      currentPath: window.location.hash,
      visible: false,
      windowIsHidden: true,
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
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
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<style>
#tw2bot .scroll-wrap {
  overflow-y : scroll;
  height     : 100%;
}

#tw2bot-show {
  position    : absolute;
  bottom      : 110px;
  left        : 0;
  margin-left : 9px;
  width       : 44px;
  height      : 44px;
  z-index     : 10;
}

#tw2bot-show:before {
  content             : "";
  background-image    : url(https://twxzz.innogamescdn.com/img/icons/alpha_eee77292f1.png);
  background-position : -272px -1070px;
  width               : 44px;
  height              : 44px;
  margin              : 2px 0 0 -2px;
  display             : inline-block;
}

/*#tw2bot {*/
/*  z-index : 9 !important;*/
/*}*/

#wrapper.woho-window-open .two-menu-container,
#wrapper.woho-window-open #tw2bot-show,
#wrapper.window-open #tw2bot-show {
  left : 713px;
}

/*#wrapper.woho-window-open #topinterface-right-wrapper {*/
/*  z-index : 7;*/
/*}*/
</style>
