<template>
  <section class="poolPage">
    <div class="walletInfoCardBox">
      <div class="walletInfoCard">
        <div class="col">
          <h4 class="yesterday">昨日收益（SHIN）</h4>
          <h3 class="yesterdayAmount">0</h3>
        </div>
        <div class="lineBtm"></div>
        <div class="rowSB pt-4">
          <div class="col">
            <h4 class="walletAsset">钱包资产（SHIN)</h4>
            <h3 class="amount2">{{totalWalletAsset | noToFIxed('4')}}</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset minepool">矿池资产（SHIN)</h4>
            <h3 class="amount2">{{checkingAddBalance | noToFIxed('4')}}</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset promotional">推广算力（SHIN)</h4>
            <h3 class="amount2">{{savingAddBalance | noToFIxed('4')}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="functionInfoBox">
      <div class="functionInfoCard">
        <div class="function" @click="showToPool">
          <div class="col">
            <h3 class="functionTitle">转入</h3>
            <h3 class="functionInfo">转入到矿池</h3>
          </div>
          <img src="@/assets/pool/toPool.png" class="functionIcon" />
        </div>
        <div class="lineHR"></div>
        <div class="function" @click="showOutofPool">
          <div class="col">
            <h3 class="functionTitle">转出</h3>
            <h3 class="functionInfo">从矿池中转出</h3>
          </div>
          <img src="@/assets/pool/outOfPool.png" class="functionIcon" />
        </div>
        <div class="function bdTP">
          <div class="col">
            <h3 class="functionTitle">矿池</h3>
            <h3 class="functionInfo">矿池</h3>
          </div>
          <img src="@/assets/pool/minepool.png" class="functionIcon" />
        </div>
        <div class="lineHR"></div>
        <router-link to="/transaction" class="function bdTP">
          <div class="col">
            <h3 class="functionTitle">记录</h3>
            <h3 class="functionInfo">收益明细</h3>
          </div>
          <img src="@/assets/pool/record.png" class="functionIcon" />
        </router-link>
      </div>
    </div>
    <div class="chartBox">
      <div class="chartCard">
        <h2 class="chartTitle">最近一周收益（SHIN)</h2>
        <h4 class="chartInfo">挖矿最低持币：100 SHIN</h4>
      </div>
    </div>
    <Modal
      v-model="showToPoolModel"
      title="Transfer to Pool"
      @on-ok="transferToPool"
      ok-text="Transfer"
      @on-cancel="showToPool"
      :closable="closable"
    >
      <div class="popupHeadings">
        <h5>Enter Amount to Transfer</h5>
        <h6>Account Balance: {{checkingAddBalance}}</h6>
        <h6>Minimum Balance: 100 SHIN</h6>
      </div>
      <Input v-model="amountToPool" type="number" prefix="logo-usd" placeholder="Enter Amount" />
      <h6 class="errorMsg">{{amountToPoolError}}</h6>
    </Modal>
    <Modal
      v-model="showOutOfPoolModel"
      title="Transfer Out of Pool"
      ok-text="Transfer Out"
      @on-ok="transferFromPool"
      @on-cancel="showOutofPool"
      :closable="closable"
    >
      <div class="popupHeadings">
        <h5>Enter Amount to Transfer Out</h5>
        <h6>Pool Balance: {{savingAddBalance}}</h6>
      </div>
      <Input v-model="amountoutOfPool" type="number" prefix="logo-usd" placeholder="Enter Amount" />
      <h6 class="errorMsg">{{amountOutOfPoolError}}</h6>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showToPoolModel: false,
      showOutOfPoolModel: false,
      checkingAddBalance: 0,
      savingAddBalance: 0,
      totalWalletAsset: 0,
      amountToPool: 0,
      amountoutOfPool: 0,
      amountToPoolError: "",
      amountOutOfPoolError: "",
      closable: true
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
      transferAmount: 'transferAmount'
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
          let totalWalletAsset =
            Number(that.checkingAddBalance) + Number(that.savingAddBalance);
          that.totalWalletAsset = String(totalWalletAsset);
          that.toggelLoader();
        })
        .catch(err => {
          console.log("getWalletBalanceByAddress ", err);
          that.toggelLoader();
        });
    },

    showToPool() {
      this.showToPoolModel = !this.showToPoolModel;
    },
    showOutofPool() {
      this.showOutOfPoolModel = !this.showOutOfPoolModel;
    },
    transferToPool() {
      console.log('transferToPool called')
      let that = this;
      if (that.amountToPoolError !== "" || that.amountToPool == 0) {
        setTimeout(function() {
          that.showToPoolModel = true;
        }, 10);
      } else {
        let data = {
          token: that.userToken,
          from : that.userAddress,
          to: that.userSAddress,
          amount: that.amountToPool
        }
        console.log(data)
      }
    },
    transferFromPool() {
      console.log('transferFromPool called')
      let that = this;
      if (that.amountOutOfPoolError !== "" || that.amountoutOfPool == 0) {
        setTimeout(function() {
          that.showOutOfPoolModel = true;
        }, 10);
      } else {
         let data = {
          token: that.userToken,
          to : that.userAddress,
          from: that.userSAddress,
          amount: that.amountToPool
        }
        console.log(data)
      }
    }
  },
  watch: {
    amountToPool(newVal, oldVal) {
      let that = this;
      if (newVal) {
        if (newVal < 100) {
          that.amountToPoolError = "Minimum Amount is 100";
        } else {
          let checkingAddBalance = that.checkingAddBalance;
          if (newVal > checkingAddBalance) {
            that.amountToPoolError = "Invalid Amount";
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
        if (newVal > savingAddBalance) {
          that.amountOutOfPoolError = "Invalid Amount";
        } else {
          that.amountOutOfPoolError = "";
        }
      }
    }
  },
  mounted() {
    this.getUserWalletStates();
  }
};
</script>

<style scoped>
.poolPage {
  width: 100%;
  height: 100%;
  padding: 1vh 2%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
.walletInfoCardBox {
  margin-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.walletInfoCard {
  background: rgba(89, 100, 255, 1);
  box-shadow: 0px 3px 6px rgba(58, 51, 140, 0.16);
  opacity: 1;
  opacity: 1;
  border-radius: 16px;
  color: white;
  width: 96%;
  padding: 2% 4%;
}
.lineBtm {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.04;
  margin-top: 2vh;
}
.lineHor {
  width: 2px;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.04;
}
.pt-4 {
  padding-top: 4%;
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
.yesterday {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
}
.yesterdayAmount {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 28px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.walletAsset {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
}
.amount2 {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 22px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}

.functionInfoBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.functionInfoCard {
  margin-top: 1.5vh;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 8px;
  width: 96%;
  padding: 2% 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.function {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 48%;
  padding: 3% 2%;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.functionIcon {
  width: 24px;
  height: 24px;
}
.lineHR {
  width: 1px;
  height: 49px;
  background: lightgray;
}
.functionTitle {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 20px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.functionInfo {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.64;
}
.bdTP {
  border-top: 1px solid lightgray;
}
.chartBox {
  margin-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.chartCard {
  width: 96%;
  height: 275px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 8px;
  padding: 3% 3%;
}
.chartTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.chartInfo {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  margin-top: 1vh;
  color: rgba(58, 51, 140, 1);
  opacity: 0.8;
}
.popupHeadings,
h5 {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 25px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.popupHeadings,
h6 {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 25px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.errorMsg {
  color: red;
  font-size: 14px;
}
</style>