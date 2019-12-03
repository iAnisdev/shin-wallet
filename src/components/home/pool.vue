<template>
  <section class="poolPage">
    <div class="walletInfoCardBox">
      <div class="walletInfoCard">
        <div class="col">
          <h4 class="yesterday">昨日收益（SHIN）</h4>
          <h3 class="yesterdayAmount">{{totalEarning | noToFIxed('6')}}</h3>
        </div>
        <div class="lineBtm"></div>
        <div class="rowSB pt-4">
          <div class="col">
            <h4 class="walletAsset">钱包资产（SHIN)</h4>
            <h3 class="amount2">{{checkingAddBalance | noToFIxed('4')}}</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset minepool">矿池资产（SHIN)</h4>
            <h3 class="amount2">{{savingAddBalance | noToFIxed('4')}}</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset promotional">推广算力（SHIN)</h4>
            <h3 class="amount2">{{userData.promopwr | noToFIxed('4')}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="functionInfoBox">
      <div class="functionInfoCard">
        <router-link to="/wallet/transfer/saving">
          <div class="function">
            <div class="col">
              <img src="@/assets/pool/toPool.png" class="functionIcon" />
              <h3 class="functionTitle">转入</h3>
            </div>
          </div>
        </router-link>
        <router-link to="/wallet/transfer/checking">
          <div class="function">
            <div class="col">
              <img src="@/assets/pool/outOfPool.png" class="functionIcon" />
              <h3 class="functionTitle">转出</h3>
            </div>
          </div>
        </router-link>
        <div class="function">
          <div class="col">
            <img src="@/assets/pool/minepool.png" class="functionIcon" />
            <h3 class="functionTitle">矿池</h3>
          </div>
        </div>
        <div class="function">
          <div class="col">
            <img src="@/assets/pool/record.png" class="functionIcon" />
            <h3 class="functionTitle">记录</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="powerBox">
      <div class="powerSection">
        <div class="powerSection__title">
          <h3>持币算力</h3>
        </div>
        <h1 class="powerSection__amount">+{{userData.stakepwr | noToFIxed('4')}}</h1>
      </div>
      <div class="powerSection">
        <div class="powerSection__title">
          <h3>持币算力</h3>
        </div>
        <h1 class="powerSection__amount">+{{userData.promopwr | noToFIxed('4')}}</h1>
      </div>
      <div class="powerSection">
        <div class="powerSection__title">
          <h3>持币算力</h3>
        </div>
        <h1 class="powerSection__amount">+{{userData.indirpromopwr | noToFIxed('4')}}</h1>
      </div>
    </div>
    <div class="chartBox">
      <div class="chartCard">
        <h2 class="chartTitle">最近一周收益（SHIN)</h2>
        <h4 class="chartInfo">挖矿最低持币：100 SHIN</h4>
        <img src="@/assets/chart.png" class="chartImg" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";
export default {
  data() {
    return {
      checkingAddBalance: 0,
      savingAddBalance: 0,
      promotionalRewards: 0,
      totalEarning: 0,
      closable: true,
      transactionStakeReward: [],
      transactionSalesReward: []
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
          let totalWalletAsset =
            Number(that.checkingAddBalance) + Number(that.savingAddBalance);
          that.totalWalletAsset = String(totalWalletAsset);
          that.toggelLoader(false);
        })
        .catch(err => {
          that.toggelLoader();
        });
    },
    getYesterDayRewards() {
      let that = this;
      let transactionStakeReward = that.transactionStakeReward;
      let transactionSalesReward = that.transactionSalesReward;
      let amountList = [];
      _.each(transactionStakeReward, function(trans) {
        amountList.push(trans.amount);
      });
      _.each(transactionSalesReward, function(trans) {
        amountList.push(trans.amount);
      });
      let totalEarning = _.reduce(
        amountList,
        function(memo, num) {
          return Number(memo) + Number(num);
        },
        0
      );
      that.totalEarning = totalEarning;
    }
  },
  mounted() {
    let that = this;
    this.getUserWalletStates();
    let data = {
      address: that.userAddress,
      type: "stakereward"
    };
    that
      .transactionsList(data)
      .then(stakereward => {
        that.transactionStakeReward = stakereward.result;
        return that.transactionsList({
          address: that.userAddress,
          type: "salesreward"
        });
      })
      .then(salesreward => {
        that.transactionSalesReward = salesreward.result;
        that.getYesterDayRewards();
      })
      .catch(err => {
        console.log("error ", err);
      });
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
  text-align: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  padding: 12px 15px;
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

/* New Design Update css */
.powerBox {
  width: 96%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 32px;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  padding: 4% 10%;
}
.powerSection {
  border-bottom: 3px solid rgba(29, 40, 99, 1);
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2vh;
}
.powerSection__title {
  background: rgba(29, 40, 99, 1);
  opacity: 1;
  border-radius: 16px 16px 0px 0px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 8px 12px 1px;
}
.powerSection__amount {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(15, 192, 60, 1);
}
.chartImg {
  width: 100%;
}
</style>