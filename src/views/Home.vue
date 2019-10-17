<template>
  <div class="home">
    <div class="content">
      <router-view class="v-tab-bar-router-view"></router-view>
    </div>
    <v-tab-bar class="tabbar">
      <v-tab-bar-item v-for="(tab , index) in tabBar" :key="index" :to="tab.link">
        <v-icon :name="tab.icon" scale="1.2"></v-icon>
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
          icon: "globe"
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
          icon: "user"
        }
      ]
    };
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
</style>