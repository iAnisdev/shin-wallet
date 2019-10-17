<template>
  <section class="poolPage">
    <div class="walletInfoCardBox">
      <div class="walletInfoCard">
        <div class="col">
          <h4 class="yesterday">总资产折合（CNY)</h4>
          <h3 class="yesterdayAmount">0</h3>
        </div>
        <div class="lineBtm"></div>
        <div class="rowSB pt-4">
          <div class="col">
            <h4 class="walletAsset">钱包资产（SHIN))</h4>
            <h3 class="amount2">0</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset">钱包资产（SHIN))</h4>
            <h3 class="amount2">0</h3>
          </div>
          <div class="lineHor"></div>
          <div class="col">
            <h4 class="walletAsset">钱包资产（SHIN))</h4>
            <h3 class="amount2">0</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="functionInfoBox">
      <div class="functionInfoCard">
        <div class="function">
          <div class="col">
            <h3 class="functionTitle">转入</h3>
            <h3 class="functionInfo">转入到矿池</h3>
          </div>
          <img src="@/assets/pool/toPool.png" class="functionIcon" />
        </div>
        <div class="lineHR"></div>
        <div class="function">
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
          <img src="@/assets/pool/minePool.png" class="functionIcon" />
        </div>
        <div class="lineHR"></div>
        <div class="function bdTP">
          <div class="col">
            <h3 class="functionTitle">记录</h3>
            <h3 class="functionInfo">收益明细</h3>
          </div>
          <img src="@/assets/pool/record.png" class="functionIcon" />
        </div>
      </div>
    </div>
    <div class="chartBox">
      <div class="chartCard">
        <h2 class="chartTitle">最近一周收益（SHIN)</h2>
        <h4 class="chartInfo">挖矿最低持币：100 SHIN</h4>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
   return {
     
   }
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
.bdTP{
  border-top: 1px solid lightgray;
}
.chartBox{
  margin-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.chartCard{
  width:96%;
height:275px;
background:rgba(255,255,255,1);
box-shadow:0px 3px 6px rgba(0,0,0,0.16);
opacity:1;
border-radius:8px;
  padding: 3% 3%;
}
.chartTitle{
font-size:16px;
font-family:PingFang SC;
font-weight:600;
line-height:22px;
color:rgba(0,0,0,1);
opacity:0.8;
}
.chartInfo{
font-size:11px;
font-family:PingFang SC;
font-weight:500;
margin-top: 1vh;
color:rgba(58,51,140,1);
opacity:0.8;
}
</style>