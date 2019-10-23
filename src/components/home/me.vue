<template>
  <section class="mePage">
    <div class="userInfoBox">
      <div class="userInfoCard">
        <div class="rowSB">
          <h3 class="name">{{userData.username}}</h3>
          <router-link to="/qrcode">
          <v-icon name="qrcode" scale="1.2"></v-icon>
          </router-link>
        </div>
        <div class="rowFS">
          <h5 class="walletAddr">钱包账号：{{userAddress | addressShortner('16')}}</h5>
        <input type="hidden" id="walletAddr" :value="userAddress" />
          <Icon type="md-copy" size="20"  @click="copyTestingCode"/>
        </div>
      </div>
    </div>
    <div class="cellGroup">
      <router-link to="/changePassword">
        <div class="cellWithArrow" >
        <div class="rowFS">
          <img src="@/assets/me/lock.png" alt class="cellImg" />
          <h4 class="cellTitle">交易密码</h4>
        </div>
        <div class="rowFS">
          <h5 class="cellExtra">未设置</h5>
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      </router-link>
      <div class="cellLine"></div>
      <router-link to="/phone">
      <div class="cell">
        <div class="rowFS">
          <img src="@/assets/me/phone.png" alt class="cellImg" />
          <h4 class="cellTitle">绑定手机</h4>
        </div>
        <div class="rowFS">
          <h5 class="cellExtra">已绑定</h5>
        </div>
      </div>
      </router-link>
    </div>
    <div class="cellGroup">
      <!-- <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/message.png" alt class="cellImg" />
          <h4 class="cellTitle">绑定邮箱</h4>
        </div>
        <div class="rowFS">
          <h5 class="cellExtra">未绑定</h5>
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      <div class="cellLine"></div> -->
      <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/refer.png" alt class="cellImg" />
          <h4 class="cellTitle">邀请好友</h4>
        </div>
        <div class="rowFS">
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      <div class="cellLine"></div>
      <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/question.png" alt class="cellImg" />
          <h4 class="cellTitle">SHIN充提币全教程</h4>
        </div>
        <div class="rowFS">
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
    </div>
    <div class="cellGroup">
      <!-- <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/sound.png" alt class="cellImg" />
          <h4 class="cellTitle">绑定邮箱</h4>
        </div>
        <div class="rowFS">
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      <div class="cellLine"></div> -->
      <!-- <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/translate.png" alt class="cellImg" />
          <h4 class="cellTitle">邀请好友</h4>
        </div>
        <div class="rowFS">
          <h5 class="cellExtra">简体中文</h5>
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div> 
      <div class="cellLine"></div>
      -->
      <div class="cellWithArrow">
        <div class="rowFS">
          <img src="@/assets/me/share.png" alt class="cellImg" />
          <h4 class="cellTitle">SHIN充提币全教程</h4>
        </div>
        <div class="rowFS">
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      <div class="cellLine"></div>
      <div class="cell">
        <div class="rowFS">
          <img src="@/assets/me/message.png" alt class="cellImg" />
          <h4 class="cellTitle">SHIN充提币全教程</h4>
        </div>
        <div class="rowFS">
          <h5 class="cellExtra">SHIN@sharein.io</h5>
        </div>
      </div>
    </div>
    <div class="cellGroup">
      <div class="logoutCell">
        <img src="@/assets/me/logout.png" alt class="cellImg" />
          <h4 class="cellTitle">安全退出</h4>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters({
      userData: "userData",
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress",
      userUID: "getUserUID"
    })
  },
  methods:{
    ...mapActions({
      getAccountBalance: "getAccountBalance",
      getDataFromCookies: "getDataFromCookies",
      toggelLoader: "toggelLoader",
      getUserData: "getUserData"
    }),
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
  },
  mounted(){
      let that = this;
    let data = {
      token : that.userToken
    }
    this.getUserData(data);
  }
};
</script>

<style scoped>
.mePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
.userInfoBox {
  margin-top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.userInfoCard {
  width: 96%;
  padding: 4% 5%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 25px;
}
.name {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 28px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.walletAddr {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.refNumber {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.rowSB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rowFS {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.tabIcon {
  width: 32px;
  height: 32px;
}
.cellGroup {
  margin-top: 2vh;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 0%;
}
.cellWithArrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3% 2% 3% 6%;
  width: 100%;
}
.cell {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3% 6%;
  width: 100%;
}
.cellImg {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 15px;
}
.cellArrow {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-left: 5px;
}
.cellTitle {
  font-size: 13px;
  font-family: PingFang SC;
  align-self: center;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.cellExtra {
  font-size: 13px;
  font-family: PingFang SC;
  align-self: center;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.32;
}
.cellLine {
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
}
.logoutCell{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3% 6%;
  width: 100%;
}
</style>