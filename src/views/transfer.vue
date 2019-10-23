<template>
  <section class="loginPage">
    <navbar showBack="'true'" title="Transfer" />
    <div class="infoBox">
      <div class="tab">
        <h4>可用</h4>
        <h3>{{accountBalance}}</h3>
      </div>
      <div class="lineHR"></div>
      <div class="tab">
        <h4>折合（CNY)</h4>
        <h3>≈{{accountBalanceCYN}}</h3>
      </div>
    </div>
    <div class="widthdrawTable">
      <div style="margin-top: 1vh">
        <Input
          prefix="md-card"
          v-model="walletAddr"
          placeholder="Wallet Address"
          readonly
          size="large"
        />
      </div>
      <div style="margin-top: 1vh">
        <Input prefix="logo-usd" v-model="amount" placeholder="提现说明 (可选)" size="large" />
      </div>
      <Button size="large" long class="button" @click="transferAmount">确定</Button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar: navbar
  },
  data() {
    return {
      walletAddr: "",
      amount: ""
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress",
      userUID: "getUserUID",
      accountBalance: "getAccountBalanceSHIN",
      accountBalanceCYN: "getAccountBalanceCYN"
    })
  },
  methods: {
    ...mapActions({
      toggelLoader: "toggelLoader",
      transferAmount: "transferAmount"
    }),
    transferAmount() {
      let that = this;
      if (!that.isValid(that.walletAddr)) {
        this.$Message.error({
          background: true,
          content: "Invalid Wallet Address"
        });
      } else if (!that.isValid(that.amount)) {
        this.$Message.error({
          background: true,
          content: "Invalid Amount"
        });
      } else if (that.amount > that.accountBalance) {
        this.$Message.error({
          background: true,
          content: "Invalid Amount"
        });
      } else {
        let data = {
          token: that.userToken,
          from: that.userAddress,
          to: that.walletAddr,
          amount: that.amount
        };
      }
    },
    isValid(value) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    let that = this;
    let walletAddr = this.$router.history.current.query.wallet;
    that.walletAddr = walletAddr;
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  /* background-image: url("~@/assets/bg.jpeg"); */
  background-size: cover;
}
.layer {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  /* opacity: 0.8; */
  padding: 12vh 4% 2vh;
}
.recoverBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 2vh;
}

.infoBox {
  width: 90%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 12px;
  align-self: center;
  margin-top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 4% 1%;
  margin: auto;
  margin-top: 2vh;
}
.tab {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}
.tab h4 {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.tab h3 {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.lineHR {
  height: 42px;
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
}
.amountInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2% 4%;
}
.rowFS {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.rowFS h4 {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.64;
}
.rowFS h3 {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.widthdrawTable {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5% 8%;
}
.widthdrawTable p {
  margin-top: 2vh;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 18px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.button {
  background: rgba(58, 51, 140, 1);
  margin-top: 2vh;
  color: #fff;
}
</style>