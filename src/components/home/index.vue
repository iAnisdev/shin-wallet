<template>
  <section class="homePage">
    <div class="profileInfo">
      <div class="rowSB">
        <h3 class="name">{{userData.username}}</h3>
        <img src="@/assets/scan.png" class="tabIcon" @click="scanPage" />
      </div>
      <div class="rowFS">
        <h5 class="walletAddr">钱包账号：{{userAddress | addressShortner('16')}}</h5>
        <input type="hidden" id="walletAddr" :value="userAddress" />
        <Icon type="md-copy" size="20" @click="copyTestingCode" />
      </div>
      <h5 class="refNumber">邀请码：{{userData.uid}}</h5>
    </div>
    <div class="walletInfoCardBox">
      <div class="walletInfoCard">
        <div class="rowSB pt-4">
          <div class="col">
            <h4 class="valueTitle">总资产折合（SHIN)</h4>
            <h3>{{totalWalletAssets | noToFIxed('6')}}</h3>
          </div>
          <!-- <div class="lineHor"></div>
          <div class="col">
            <h4 class="valueTitle">总资产折合（CNY)</h4>
            <h3>{{accountBalanceCYN | noToFIxed('6')}}</h3>
          </div>-->
        </div>
        <div class="lineBtm"></div>
        <div class="rowSB pt-4">
          <div class="col">
            <h4 class="valueTitle">昨日矿池收益（SHIN）</h4>
            <h3>{{getYesterDayMineRewards | noToFIxed('6')}}</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="valueTitle">收益总折算（USDT）</h4>
            <h3>{{totalEarningUSDT | noToFIxed('6')}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="midbarBox">
      <router-link to="/refer">
        <div class="tabBox">
          <img src="@/assets/icons/invite.png" class="tabIcon" />
          <h4 class="tabText">邀请好友</h4>
        </div>
      </router-link>
      <router-link to="/buy">
        <div class="tabBox">
          <img src="@/assets/icons/addTokens.png" class="tabIcon" />
          <h4 class="tabText">充值代币</h4>
        </div>
      </router-link>
      <router-link to="/pool">
        <div class="tabBox">
          <img src="@/assets/icons/stats.png" class="tabIcon" />
          <h4 class="tabText">矿池收益</h4>
        </div>
      </router-link>
      <router-link to="/transaction">
        <div class="tabBox">
          <img src="@/assets/icons/transactions.png" class="tabIcon" />
          <h4 class="tabText">充提记录</h4>
        </div>
      </router-link>
    </div>
    <div class="margeuTag">
      <div class="rowSB">
        <div class="rowFS">
          <Icon type="md-volume-up" color="#fff" size="20" />
          <marquee class="notifications">SHIN技术社区重磅推出SHIN矿池</marquee>
        </div>
        <h3 class="moreText">更多</h3>
      </div>
    </div>
    <div class="echangeRateBox">
      <div class="rowSB">
        <div class="textL">
          <h6 class="tableText">名称</h6>
        </div>
        <div class="textC">
          <h6 class="tableText">市场价格</h6>
        </div>
        <div class="textR">
          <h6 class="tableText">涨跌率</h6>
        </div>
      </div>

      <div class="chartLine"></div>
      <div class="rateList" v-for="(rate , index) in exchangeRate" :key="index">
        <div class="rateBar">
          <div class="rowFS rateBarpd">
            <div class="col">
              <h3 class="rateName">
                <b class="rateActive">{{rate.name}}</b>
              </h3>
              <!-- <h3 class="lastRate">综合 123456.78</h3> -->
            </div>
          </div>
          <h4 class="activeRate">{{rate.rate | noToFIxed(8)}}</h4>
          <div class="percentageBox">
            <h4 class="percentageBTn">+ {{rate.percentage}} %</h4>
          </div>
        </div>
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
      walletaddressSAsset: 0,
      walletaddressAsset: 0,
      totalWalletAssets: 0,
      getYesterDayMineRewards: 0,
      totalEarningUSDT: 0,
      stakingRewards: [],
      promotionsRewards: []
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress",
      userUID: "getUserUID",
      accountBalanceCYN: "getAccountBalanceCYN",
      exchangeRate: "getExchangeValues",
      userData: "userData"
    })
  },
  methods: {
    ...mapActions({
      getAccountBalance: "getAccountBalance",
      getWalletBalanceByAddress: "getWalletBalanceByAddress",
      getDataFromCookies: "getDataFromCookies",
      toggelLoader: "toggelLoader",
      getUserData: "getUserData",
      calculateExchange: "calculateExchange",
      getAccountBalanceCNY: "getAccountBalanceCNY",
      transactionsList: "transactionsList"
    }),
    scanPage() {
      this.$router.push("/scan");
    },
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
          content: "复制钱包地址"
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }
      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    getWalletInfo() {
      let that = this;
      let data = {
        address: that.userAddress
      };
      that
        .getWalletBalanceByAddress(data)
        .then(res => {
          that.walletaddressAsset = res;
          let sdata = {
            address: that.userSAddress
          };
          return that.getWalletBalanceByAddress(sdata);
        })
        .then(sres => {
          that.walletaddressSAsset = sres;
          let totalAssets =
            Number(that.walletaddressAsset) + Number(that.walletaddressSAsset);
          that.totalWalletAssets = totalAssets;
          that.getYesterDayMineIncom();
          return that.getAccountBalanceCNY(totalAssets);
        })
        .catch(err => {
          that.toggelLoader();
        });
    },
    getYesterDayMineIncom() {
      let that = this;
      let data = {
        address: that.userAddress,
        type: "stakereward"
      };
      that
        .transactionsList(data)
        .then(res => {
          if (res.result.length > 0) {
            let transactions = res.result;
            // let amountList = [];
            // _.each(transactions, function(trans) {
            //   amountList.push(trans.amount);
            // });
            // let totalEarning = _.reduce(
            //   amountList,
            //   function(memo, num) {
            //     return Number(memo) + Number(num);
            //   },
            //   0
            // );
            that.getYesterDayMineRewards = transactions[0].amount;
          } else {
            that.getYesterDayMineRewards = 0;
          }
          that.getTotalEarning();
        })
        .catch(err => {
          that.toggelLoader();
        });
    },
    getTotalEarning() {
      let that = this;
      let data = {
        address: that.userAddress,
        type: "stakereward"
      };
      that
        .transactionsList(data)
        .then(res => {
          // console.log('res' , res)
          that.stakingRewards = res.result;
          let promotionData = {
            address: that.userAddress,
            type: "promotion"
          };
          // console.log(that.userAddress , '4677d25f5753b461d96365ea4d964813f5c5c597' )
          return that.transactionsList(promotionData);
        })
        .then(pres => {
          that.promotionsRewards = pres.result;
          let amountList = [];
          _.each(that.stakingRewards, function(trans) {
            amountList.push(trans.amount);
          });
          _.each(that.promotionsRewards, function(trans) {
            amountList.push(trans.amount);
          });
          // console.log('amountList ' , amountList)
          let totalEarning = _.reduce(
            amountList,
            function(memo, num) {
              return Number(memo) + Number(num);
            },
            0
          );
          let calData = {
            amount: totalEarning,
            from: 'SHIN',
            to: 'USDT'
          }
          that.calculateExchange(calData).then((res) =>{
          that.totalEarningUSDT = res;
          that.toggelLoader();
          }).catch((err) => {
          that.toggelLoader();
          })
        })
        .catch(err => {
          that.toggelLoader();
        });
    }
  },
  watch: {},
  mounted() {
    let that = this;
    if (this.isLoggedIn) {
      that.toggelLoader();
      that.getUserData({
        token: that.userToken
      });
      that.getWalletInfo();
    } else {
      this.$router.push("auth");
    }
  }
};
</script>

<style scoped>
.homePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}

.profileInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 1);
  padding: 2vh 10%;
  opacity: 1;
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

.walletInfoCardBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.walletInfoCard {
  background: rgba(58, 51, 140, 1);
  box-shadow: 0px 3px 6px rgba(5, 2, 39, 0.12);
  opacity: 1;
  border-radius: 16px;
  color: white;
  width: 88%;
  padding: 3% 8%;
}

.lineBtm {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.04;
  margin-top: 2vh;
}

.valueTitle {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.6;
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

.midbarBox {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3% 2%;
  margin-top: 2vh;
}

.tabBox {
  text-align: center;
}

.tabIcon {
  width: 32px;
  height: 32px;
}

.tabText {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.6;
}

.margeuTag {
  padding: 2px 10% 2px;
  background: rgba(58, 51, 140, 1);
  opacity: 1;
  align-items: center;
}

.moreText {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
}

.notifications {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: auto;
}

.echangeRateBox {
  padding: 3% 4%;
  background-color: #fff;
}

.poolTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}

.poolLine {
  height: 22px;
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
  margin: auto 2vw;
}

.poolInfo {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.64;
}

.rateList {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 4px;
}

.rateBar {
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.rateBar:last-child {
  border-bottom: none;
}

.rateName {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}

.rateActive {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bolder;
  color: rgba(0, 0, 0, 1);
  opacity: 1.2;
}

.percentageBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.percentageBTn {
  background: rgba(255, 0, 101, 1);
  opacity: 1;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
}

.rateBarpd {
  padding: 4% 1%;
}

.lastRate {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.72;
}

.activeRate {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  align-self: center;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.tableText {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.chartLine {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.08;
}
.textC {
  text-align: center;
}
</style>
