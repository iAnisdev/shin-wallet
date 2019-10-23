<template>
  <section class="qrcodePage">
    <div class="qrcodeCard">
      <div class="walletBox">
        <h4 class="walletAddress">钱包账号：{{userAddress | addressShortner('15')}}</h4>
        <input type="hidden" id="walletAddr" :value="userAddress" />
        <Icon type="md-copy" size="20" @click="copyTestingCode"/>
      </div>
      <div class="qrBox">
      <qrcode :value="userAddress" class="qrcode" />
      </div>
    </div>
  </section>
</template>

<script>
import Qrcode from 'vue-qrcode'
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Qrcode,
  },
  data(){
    return{

    }
  },
  computed:{
  ...mapGetters({
    isLoggedIn: "getLoginStatus",
    userToken: "getUserToken",
    userAddress: "getUserAddress",
    userSAddress: "getUserSAddress",
    userUID: "getUserUID"
  })
  },
  methods:{

    copyTestingCode() {
      let that = this;
      let testingCodeToCopy = document.querySelector("#walletAddr");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
         this.$Message.success({
          background: true,
          content: "Wallet Address Copied"
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style scoped>
.qrcodePage {
  width: 100%;
  height: 100%;
  padding: 1vh 2%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.qrcodeCard {
  margin: auto;
  width: 316px;
  height: 360px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
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
.walletAddress{
  width: 80%;
font-size:16px;
font-family:PingFang SC;
font-weight:600;
line-height:22px;
color:rgba(0,0,0,1);
opacity:1;
}
.qrBox{
  text-align: center;
}
.qrcode{
  width: 90%;
  height: 44vh;
  margin: auto;
}
</style>