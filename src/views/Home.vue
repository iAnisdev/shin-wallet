<template>
  <div class="home">
    <div class="content">
      <router-view class="v-tab-bar-router-view"></router-view>
    </div>
    <v-tab-bar class="tabbar">
      <v-tab-bar-item v-for="(tab , index) in tabBar" :key="index" :to="tab.link">
        <div v-if="tab.icon == 'home'">
          <div v-if="currentRoute == 'home'">
          <img src="~@/assets/tabbar/homeActive.png" alt class="tabbarImg" />
          </div>
          <div v-if="currentRoute !== 'home'">
          <img src="~@/assets/tabbar/home.png" alt class="tabbarImg" />
          </div>
        </div>
         <div v-if="tab.icon == 'pool'">
           <div v-if="currentRoute == 'pool'">
          <img src="~@/assets/tabbar/poolActive.png" alt class="tabbarImg" />
          </div>
          <div v-if="currentRoute !== 'pool'">
          <img src="~@/assets/tabbar/pool.png" alt class="tabbarImg" />
          </div>
        </div>
         <div v-if="tab.icon == 'qrcode'">
           <div v-if="currentRoute == 'qrcode'">
          <img src="~@/assets/tabbar/qrActive.png" alt class="tabbarImg" />
          </div>
          <div v-if="currentRoute !== 'qrcode'">
          <img src="~@/assets/tabbar/qr.png" alt class="tabbarImg" />
          </div>
        </div>
         <div v-if="tab.icon == 'wallet'">
           <div v-if="currentRoute == 'wallet'">
          <img src="~@/assets/tabbar/walletActive.png" alt class="tabbarImg" />
          </div>
          <div v-if="currentRoute !== 'wallet'">
          <img src="~@/assets/tabbar/wallet.png" alt class="tabbarImg" />
          </div>
        </div>
         <div v-if="tab.icon == 'me'">
           <div v-if="currentRoute == 'me'">
          <img src="~@/assets/tabbar/meActive.png" alt class="tabbarImg" />
          </div>
          <div v-if="currentRoute !== 'me'">
          <img src="~@/assets/tabbar/me.png" alt class="tabbarImg" />
          </div>
        </div>
        <h3 class="tabText">{{tab.name}}</h3>
      </v-tab-bar-item>
    </v-tab-bar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tabBar: [
        {
          name: "首页",
          link: "/home",
          icon: "home"
        },
        {
          name: "矿池",
          link: "/pool",
          icon: "pool"
        },
        {
          name: "交易",
          link: "/qrcode",
          icon: "qrcode"
        },
        {
          name: "资产",
          link: "/wallet",
          icon: "wallet"
        },
        {
          name: "我的",
          link: "/me",
          icon: "me"
        }
      ]
    };
  },
  computed:{
    currentRoute(){
      return this.$route.name
    }
  },
  mounted(){

      console.log()
  },
  watch:{
    currentRoute(newVal , oldVal){
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content {
  height: 90vh;
}
.tabbar {
  height: 10vh;
  max-width: 600px;
  margin: auto;
  bottom: 0;
}
.icon {
  height: 20px;
  width: 20px;
}
.tabText {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
}
.tabbarImg{
  height: 20px;
  width: 20px;
}
</style>