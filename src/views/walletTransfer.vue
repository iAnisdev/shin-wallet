<template>
  <section class="recordPage">
    <navbar showBack="'true'" :title="PageTitle" />
    <div v-if="tpassSet">
      <div class="content" v-if="transfertype == 'saving'">
        <div class="header">
          <img src="@/assets/shinLogoRoung.png" class="logo" srcset />
          <div class="headerInfo">
            <h3>可转入资产</h3>
            <p>{{checkingAddBalance| noToFIxed('8')}} SHIN</p>
          </div>
        </div>
        <div class="form">
          <p class="transferOutTitle">转出资产(SHIN)</p>
          <div style="margin-top: 2vh">
            <Input type="number" placeholder="请输入转入数量" v-model="amountToPool" size="large" />
            <h6 class="errorMsg">{{amountToPoolError}}</h6>
          </div>
          <div style="margin-top: 2vh">
            <Input
              prefix="ios-lock"
              type="password"
              placeholder="输入交易密码"
              v-model="tpass"
              size="large"
            />
          </div>
          <div style="margin-top: 2vh">
            <Button long size="large" type="success" class="btn" @click="transferToPool">确认</Button>
          </div>
        </div>
      </div>
      <div class="content" v-if="transfertype == 'checking'">
        <div class="header">
          <img src="@/assets/shinLogoRoung.png" class="logo" srcset />
          <div class="headerInfo">
            <h3>可转入资产</h3>
            <p>{{savingAddBalance| noToFIxed('8')}} SHIN</p>
          </div>
        </div>
        <div class="form">
          <p class="transferOutTitle">转出资产(SHIN)</p>
          <div style="margin-top: 2vh">
            <Input type="number" placeholder="请输入转入数量" v-model="amountoutOfPool" size="large" />
            <h6 class="errorMsg">{{amountOutOfPoolError}}</h6>
          </div>
          <div style="margin-top: 2vh">
            <Input
              prefix="ios-lock"
              type="password"
              placeholder="输入交易密码"
              v-model="tpass"
              size="large"
            />
          </div>
          <div style="margin-top: 2vh">
            <Button long size="large" type="success" class="btn" @click="transferFromPool">确认</Button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!tpassSet" class="tpassUI">
      <h4 class="tpassUIInfo">请先设置交易密码</h4>

      <div style="margin-top: 2vh">
        <Button long size="large" type="success" class="btn" @click="setPasswordNow">现在设置交易密码</Button>
      </div>
    </div>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    navbar
  },
  data() {
    return {
      PageTitle: "",
      transfertype: "",
      amountToPool: "",
      amountoutOfPool: "",
      tpass: "",
      checkingAddBalance: 0,
      savingAddBalance: 0,
      amountOutOfPoolError: "",
      amountToPoolError: "",
      tpassSet: 0
    };
  },
  computed: {
    ...mapGetters({
      userData: "userData",
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress",
      userUID: "getUserUID"
    })
  },
  methods: {
    ...mapActions({
      getWalletBalanceByAddress: "getWalletBalanceByAddress",
      toggelLoader: "toggelLoader",
      transferAmount: "transferAmount",
      transactionsList: "transactionsList"
    }),
    getUserWalletStates() {
      let that = this;
      let addressObj = {
        address: that.userAddress
      };
      let saddressObj = {
        address: that.userSAddress
      };
      that.toggelLoader();
      that
        .getWalletBalanceByAddress(addressObj)
        .then(res => {
          that.checkingAddBalance = res;
          return that.getWalletBalanceByAddress(saddressObj);
        })
        .then(sres => {
          that.savingAddBalance = sres;
          that.toggelLoader(false);
        })
        .catch(err => {
          console.log("getWalletBalanceByAddress ", err);
          that.toggelLoader();
        });
    },
    transferToPool() {
      let that = this;
      if (that.amountToPool.trim() == "") {
        this.$Message.error({
          background: true,
          content: "请输入转入数量"
        });
      } else if (that.tpass.trim() == "") {
        this.$Message.error({
          background: true,
          content: "输入交易密码"
        });
      } else {
        let data = {
          token: that.userToken,
          from: that.userAddress,
          to: that.userSAddress,
          amount: that.amountToPool,
          tpass: that.tpass
        };
        that
          .transferAmount(data)
          .then(res => {
            this.$Message.success({
              background: true,
              content: "交易成功"
            });
            that.$router.go(-1);
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err.message
            });
          });
      }
    },
    transferFromPool() {
      let that = this;
      if (that.amountoutOfPool.trim() == "") {
        this.$Message.error({
          background: true,
          content: "请输入转入数量"
        });
      } else if (that.tpass.trim() == "") {
        this.$Message.error({
          background: true,
          content: "输入交易密码"
        });
      } else {
        let data = {
          token: that.userToken,
          to: that.userAddress,
          from: that.userSAddress,
          amount: that.amountoutOfPool,
          tpass: that.tpass
        };
        that
          .transferAmount(data)
          .then(res => {
            this.$Message.success({
              background: true,
              content: "交易成功"
            });
            that.$router.go(-1);
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err.message
            });
          });
      }
    },
    setPasswordNow() {
      let that = this;
      that.$router.push({
        name: "changeTPassword"
      });
    }
  },
  watch: {
    amountToPool(newVal, oldVal) {
      let that = this;
      if (newVal) {
        if (newVal < 100) {
          that.amountToPoolError = "最少: 100";
        } else {
          let checkingAddBalance = that.checkingAddBalance;
          if (newVal > Number(checkingAddBalance)) {
            that.amountToPoolError = "无效金额";
          } else {
            that.amountToPoolError = "";
          }
        }
      }
    },
    amountoutOfPool(newVal, oldVal) {
      let that = this;
      if (newVal) {
        let savingAddBalance = that.savingAddBalance;
        if (newVal > Number(savingAddBalance)) {
          that.amountOutOfPoolError = "无效金额";
        } else {
          that.amountOutOfPoolError = "";
        }
      }
    }
  },
  mounted() {
    let that = this;
    let transfertype = that.$router.history.current.params.wallet;
    if (transfertype == "saving") {
      that.PageTitle = "转入矿池";
      that.transfertype = "saving";
    } else if (transfertype == "checking") {
      that.PageTitle = "转出";
      that.transfertype = "checking";
    } else {
      that.$router.push("/pool");
    }
    that.getUserWalletStates();
    that.tpassSet = that.userData.tpass;
  }
};
</script>


<style scoped>
.recordPage {
  width: 100%;
  height: 100%;
  text-align: left;
  background: rgba(247, 247, 247, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.header {
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  padding: 2% 5%;
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.headerInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 4%;
}
.transferOutTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.64;
}
.form {
  background: rgba(255, 255, 255, 1);
  padding: 10% 10%;
  opacity: 1;
}
.btn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 2vh;
}
.logo {
  width: 72px;
  height: 72px;
}
.errorMsg {
  color: red;
  font-size: 14px;
}
.tpassUI {
  width: 100%;
  height: 80%;
  text-align: left;
  background: rgba(247, 247, 247, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10% 10%;
}
.tpassUIInfo {
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: 600;
  color: red;
  opacity: 1;
}
</style>