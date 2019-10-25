<template>
  <section class="appsPage">
    <navbar showBack="'true'" title="下载应用程序" />
    <img src="@/assets/logo.png" class="logo" srcset />
    <div class="buttons">
      <div style="margin-top: 2vh;">
        <Button long size="large" class="loginBtn" @click="downloadIOS">
          <Icon type="logo-apple" size="20" />IOS客户端下载
        </Button>
      </div>
      <div style="margin-top: 3vh;">
        <Button long size="large" class="loginBtn" @click="downloadAndriod">
          <Icon type="logo-android" size="20" />安卓客户端下载
        </Button>
      </div>
      <div style="margin-top: 3vh;">
        <Button long size="large" class="loginBtn" @click="copyWebLink">
          <Icon type="ios-desktop" size="20" />直接登录WEB版本
        </Button>
        <input type="hidden" id="qrCodeUrl" :value="qrCodeUrl" />
      </div>
    </div>
    <div class="qrBox">
      <qrcode :value="qrCodeUrl" class="qrcode" />
    </div>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
import Qrcode from "vue-qrcode";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    navbar,
    Qrcode
  },
  data() {
    return {
      qrCodeUrl: "https://shin-wallet.herokuapp.com/auth/signup"
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userUID: "getUserUID"
    })
  },
  methods: {
    downloadIOS() {},
    downloadAndriod() {},
    copyWebLink() {
      let that = this;
      let testingCodeToCopy = document.querySelector("#qrCodeUrl");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.$Message.success({
          background: true,
          content: "复制链接"
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  },
  mounted() {
    let that = this;
    let qrCodeUrl = `https://shin-wallet.herokuapp.com/auth/signup?refer=${that.userUID}`;
    console.log("qrCodeUrl ", qrCodeUrl);
    that.qrCodeUrl = qrCodeUrl;
  }
};
</script>

<style scoped>
.appsPage {
  width: 100%;
  height: 100vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.logo {
  width: 80px;
  height: 100px;
  margin-top: 5vh;
  align-self: center;
}
.loginBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 15%;
}
.qrBox {
  text-align: center;
}
.qrcode {
  width: 240px;
  height: 240px;
  margin: auto;
}
</style>