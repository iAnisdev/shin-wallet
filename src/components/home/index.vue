<template>
  <section class="homePage">
    <div class="profileInfo">
      <div class="rowSB">
        <h3 class="name">Anis</h3>
        <img src="@/assets/scan.png" class="tabIcon" />
      </div>
      <div class="rowFS">
        <h5 class="walletAddr">钱包账号：215614566</h5>
        <Icon type="md-copy" size="20" />
      </div>
      <h5 class="refNumber">邀请码：1234567</h5>
    </div>
    <div class="walletInfoCardBox">
      <div class="walletInfoCard">
        <div class="col">
          <h4>总资产折合（CNY)</h4>
          <h3>0</h3>
        </div>
        <div class="lineBtm"></div>
        <div class="rowSB pt-4">
          <div class="col">
            <h4>总资产折合（CNY)</h4>
            <h3>0</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4>总资产折合（CNY)</h4>
            <h3>0</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="midbarBox">
      <div class="tabBox">
        <img src="@/assets/icons/invite.png" class="tabIcon" />
        <h4 class="tabText">邀请好友</h4>
      </div>
      <div class="tabBox">
        <img src="@/assets/icons/addTokens.png" class="tabIcon" />
        <h4 class="tabText">充值代币</h4>
      </div>
      <div class="tabBox">
        <img src="@/assets/icons/stats.png" class="tabIcon" />
        <h4 class="tabText">矿池收益</h4>
      </div>
      <div class="tabBox">
        <img src="@/assets/icons/transactions.png" class="tabIcon" />
        <h4 class="tabText">充提记录</h4>
      </div>
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
      <div class="rowFS">
        <h2 class="poolTitle">现货行情</h2>
        <div class="poolLine"></div>
        <h3 class="poolInfo">高频交易，赚钱快</h3>
      </div>
      <div class="rateList" v-for="(rate , index) in exchangeRate" :key="index">
        <div class="rateBar">
          <div class="rowFS rateBarpd">
            <div class="col">
              <h3 class="rateName">
                <b class="rateActive">{{rate.name}}</b>/SHIN
              </h3>
              <h3 class="lastRate">综合 123456.78</h3>
            </div>
          </div>
          <h4 class="activeRate">{{rate.rate}}</h4>
          <div class="percentageBox">
            <h4>{{rate.percentage}} %</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      exchangeRate: [
        {
          name: "BTC",
          rate: "1234.5678",
          percentage: "1.23"
        },
        {
          name: "EOS",
          rate: "1234.5678",
          percentage: "1.23"
        },
        {
          name: "ETCH",
          rate: "1234.5678",
          percentage: "1.23"
        },
        {
          name: "XRP",
          rate: "1234.5678",
          percentage: "1.23"
        }
      ]
    };
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
  width: 60vw;
}
.echangeRateBox {
  padding: 2% 5%;
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
  justify-content: space-around;
  padding: 2% 2%;
}
.rateBar {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  background: rgba(255, 0, 101, 1);
  opacity: 1;
  border-radius: 0px 16px 16px 0px;
  padding: 4% 5%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.rateBarpd {
  padding: 4% 5%;
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
</style>