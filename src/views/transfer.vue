<template>
  <section class="loginPage">
    <navbar showBack="'true'" title="划转" />
    <div class="infoBox">
      <div class="tab">
        <h4>可用</h4>
        <h3>{{accountBalance | noToFIxed('6')}}</h3>
      </div>
      <div class="lineHR"></div>
      <div class="tab">
        <h4>折合（CNY)</h4>
        <h3>≈{{accountBalanceCYN | noToFIxed('6')}}</h3>
      </div>
    </div>
    <div class="widthdrawTable">
      <div style="margin-top: 1vh">
        <Input prefix="md-card" v-model="walletAddr" placeholder="输入钱包地址" size="large" />
      </div>
      <div style="margin-top: 1vh">
        <Input prefix="logo-usd" v-model="amount" placeholder="输入金额" size="large" />
      </div>
      <Button size="large" long class="button" @click="transferAmount">划转</Button>
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
      transferAmountToWallet: "transferAmount",
      getAccountBalance: "getAccountBalance"
    }),
    transferAmount() {
      let that = this;
      if (!that.isValid(that.walletAddr)) {
        this.$Message.error({
          background: true,
          content: "输入钱包地址"
        });
      } else if (!that.isValid(that.amount)) {
        this.$Message.error({
          background: true,
          content: "无效金额"
        });
      } else if (that.amount > that.accountBalance) {
        this.$Message.error({
          background: true,
          content: "无效金额"
        });
      } else {
        let data = {
          token: that.userToken,
          from: that.userAddress,
          to: that.walletAddr,
          amount: that.amount
        };
        that.toggelLoader();
        that
          .transferAmountToWallet(data)
          .then(res => {
            this.$Message.success({
              background: true,
              content: "交易成功"
            });
            that.toggelLoader();
          })
          .catch(err => {
            that.toggelLoader();
            console.log("transferAmountToWallet err", err);
            this.$Message.error({
              background: true,
              content: err.message
            });
          });
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
    if (walletAddr) {
      that.walletAddr = walletAddr;
    }
    if (that.isLoggedIn) {
      let data = {
        address: that.userAddress
      };
      that.toggelLoader();
      that
        .getAccountBalance(data)
        .then(res => {
          that.toggelLoader();
        })
        .catch(err => {
          that.toggelLoader();
        });
    } else {
      this.$router.push("auth");
    }
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