<template>
  <section class="withdrawPage">
    <navbar showBack="'true'" title="提现" />
    <div class="selectionBox">
      <h5>请选择代币类型</h5>
      <Select v-model="currentToken">
        <Option v-for="item in coinList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="radioGroup" v-if="currentToken == 'USDT'">
        <RadioGroup v-model="selectedType">
          <Radio label="ERC20" border></Radio>
          <Radio label="OMNI(暂不支持)" disabled border></Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="infoBox">
      <div class="tab">
        <h4>可用</h4>
        <h3>0</h3>
      </div>
      <div class="lineHR"></div>
      <div class="tab">
        <h4>折合（CNY)</h4>
        <h3>≈0.00</h3>
      </div>
    </div>
    <div class="widthdrawTable">
      <Input v-model="amount" placeholder="请输入提现数量">
        <span slot="append">USDT</span>
        <span slot="append">
          <Button type="text">全部</Button>
        </span>
      </Input>
      <div class="amountInfo">
          <div class="rowFS">
              <h4>实际到账:</h4>
              <h3>0</h3>
          </div>
          <div class="rowFS">
              <h4>手续费::</h4>
              <h3>2</h3>
          </div>
      </div>
      <Input v-model="walletAddrAlias" placeholder="地址别名" />
      <div style="margin-top: 1vh">
      <Input v-model="walletAddr" placeholder="输入或粘贴地址" />
      </div>
      <div style="margin-top: 1vh">
      <Input v-model="remarks" placeholder="提现说明 (可选)" />
      </div>
      <p>为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员联系。请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>

      <Button size="large" long class="button">确定</Button>
    </div>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      currentToken: "USDT",
      coinList: [
        {
          value: "USDT",
          label: "USDT"
        },
        {
          value: "SHIN",
          label: "SHIN"
        }
      ],
      selectedType: "ERC20",
      amount: "",
      walletAddr: '',
      walletAddrAlias: '',
      remarks:''
    };
  }
};
</script>

<style scoped>
.withdrawPage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
.selectionBox {
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5% 8%;
}
.selectionBox h5 {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.radioGroup {
  padding: 5% 0% 2%;
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
.amountInfo{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2% 4%;
}
.rowFS{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.rowFS h4{
font-size:11px;
font-family:PingFang SC;
font-weight:500;
line-height:16px;
color:rgba(0,0,0,1);
opacity:0.64;
}
.rowFS h3{
font-size:11px;
font-family:PingFang SC;
font-weight:500;
line-height:16px;
color:rgba(0,0,0,1);
opacity:1;
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