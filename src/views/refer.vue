<template>
  <section>
    <navbar showBack="'true'" title="邀请好友" />
    <h1 class="title">ShareIN</h1>
    <h4>币币交易+合约交易+挖扩新纪元</h4>
    <div class="qrcodeCard">
      <div class="walletBox">
        <div class="col">
          <h1 class="referenceCodeTitle">我的邀请码</h1>
          <h2 class="referCode">{{userUID}}</h2>
          <div style="margin-top: 2vh">
            <Button type="warning" size="large" long @click="copyTestingCode">复制邀请码</Button>
          </div>
        </div>
        <input type="hidden" id="userUID" :value="userUID" />
      </div>
      <div class="qrBox">
        <qrcode :value="qrCodeUrl" class="qrcode" />
      </div>
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
      referCode: "",
      qrCodeUrl: "https://shin-wallet.herokuapp.com/signup"
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress",
      userUID: "getUserUID"
    })
  },
  methods: {
    copyTestingCode() {
      let that = this;
      let testingCodeToCopy = document.querySelector("#userUID");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.$Message.success({
          background: true,
          content: "复制邀请码"
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
    let qrCodeUrl = `https://shin-wallet.herokuapp.com/signup?refer=${that.userUID}`;
    that.qrCodeUrl = qrCodeUrl;
  }
};
</script>

<style scoped>
.mePage {
  width: 100%;
  height: 100vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
.title {
  margin-top: 2vh;
  height: 45px;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 45px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.qrcodeCard {
  margin-top: 2vh;
  margin: auto;
  width: 316px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 20px;
}
.walletBox {
  border-bottom: 2px dashed lightgray;
  padding: 2vh 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.referenceCodeTitle {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: bolder;
  line-height: 60px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.referCode {
  font-size: 48px;
  font-family: PingFang SC;
  font-weight: bolder;
  line-height: 60px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.qrBox {
  text-align: center;
}
.qrcode {
  width: 256px;
  height: 256px;
  margin: auto;
}
</style>