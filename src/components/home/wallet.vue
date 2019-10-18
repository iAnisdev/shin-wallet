<template>
  <section class="qrcodePage">
    <div class="headingBar">
      <div class="col">
        <div class="rowFS">
          <h4 class="pageTitle">总资产折合（CNY)</h4>
          <div style="margin-left: 5px;" v-if="showNumbers">
            <Icon type="ios-eye-outline" size="32" @click="showNumbers = !showNumbers" />
          </div>
          <div style="margin-left: 5px;" v-if="!showNumbers">
            <Icon type="ios-eye-off-outline" size="32" @click="showNumbers = !showNumbers" />
          </div>
        </div>
        <h2 class="pagePrice">0</h2>
      </div>
      <img src="@/assets/transfer.png" class="icon" />
    </div>
    <div class="cardGroup" v-for="i in 4" :key="i">
      <div class="card">
        <div class="cardTitleBar" :style="`background-color: ${bgColors[i-1]}`">
          <h3 class="tokenName">SHIN</h3>
          <h3 class="tokenAmount">0.0000</h3>
        </div>
        <div class="cardContent">
          <div class="amountTab">
            <h3>可用:</h3>
            <h2>0</h2>
          </div>
            <div class="amountTab">
            <h3>冻结::</h3>
            <h2>0</h2>
          </div>
            <div class="amountTab">
            <h3>折合(CNY):</h3>
            <h2>0</h2>
          </div>
        </div>
        <div class="lineH"></div>
        <div class="buttonContent">
        <Button size="large" class="button">提币</Button>
        <div class="lineBR"></div>
        <Button size="large" class="button">站内转出</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showNumbers: true,
      bgColors: ["#3A338C", "#5C7FFE", "#FD7936", "#FF3282"]
    };
  }
};
</script>

<style scoped>
.qrcodePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
.headingBar {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  padding: 2% 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pageTitle {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 14px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.64;
}
.pagePrice {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 28px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.rowFS {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.icon {
  height: 36px;
  width: 36px;
  align-self: center;
}
.cardGroup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 5%;
}
.card {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 16px;
}
.cardTitleBar {
  width: 100%;
  padding: 4% 4%;
  opacity: 1;
  border-radius: 16px 16px 0px 0px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 17px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cardContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2% 4%;
}
.amountTab h3{
font-size:12px;
font-family:PingFang SC;
font-weight:500;
line-height:17px;
color:rgba(0,0,0,1);
opacity:0.4;
}
.amountTab h2{
  margin-top: 1px;
font-size:12px;
font-family:PingFang SC;
font-weight:500;
line-height:17px;
color:rgba(0,0,0,1);
opacity:0.64;
}
.lineH{
  margin-top: 1vh;
border: 1px solid rgba(0,0,0,0.08);
}
.buttonContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button{
  width: 100%;
  border: none;
}
.button:first-child{
  border-radius: 0px 0px 0px 16px;
}
.button:last-child{
  border-radius: 0px 0px 16px 0px;
}
.lineBR{
height:40px;
border:1px solid rgba(0,0,0,1);
opacity:0.08;
}
</style>