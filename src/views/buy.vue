<template>
  <section class="transactionPage">
    <navbar showBack="'true'" title="充值" />
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
    <div class="qrcodeBox">
      <qrcode :value="walletAddr" class="qrcode" />
      <h4>长按保存至相册</h4>
    </div>
    <div class="contentInfo">
      <h4 class="shinWalletAdd">SHIN充值地址</h4>
      <Input v-model="walletAddr" readonly style="margin-top: 1vh">
        <span slot="append">
          <Button type="primary" class="button" @click="copyTestingCode">复制</Button>
        </span>
      </Input>
      <input type="hidden" id="walletAddr" :value="walletAddr" />
      <ul v-for="(item , index) in uiList" :key="index">
        <li>{{item}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
import Qrcode from "vue-qrcode";
export default {
  components: {
    navbar,
    Qrcode
  },
  data() {
    return {
      currentToken: "USDT",
      coinList: [
        {
          value: "USDT",
          label: "USDT"
        }
      ],
      selectedType: "ERC20",
      walletAddr: "0x405e49b8ad0f733a0ed5cdb432f2de9b9a6f81e3",
      uiList: [
        "禁止向地址充值当前币种以外的资产，任何充入当前币种地址的非当前币种资产将不可找回。",
        "充值完成后，你可以进入充提记录页面跟踪进度。",
        "您的充值地址不会经常改变，可以重复充值；如有改动，我们会尽量通过网站公告或邮件通知您。",
        "请务必确认电脑及浏览器安全，防止信息被篡改或泄露。"
      ]
    };
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
.transactionPage {
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
.qrcodeBox {
  width: 80%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  margin-top: 2vh;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-self: center;
  padding: 2% 2%;
}
.qrcode {
  width: 256px;
  height: 256px;
  margin: auto;
}
.qrcodeBox h4 {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  padding: 2% 2%;
}
.shinWalletAdd {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.contentInfo {
  padding: 2% 8%;
  margin-top: 2vh;
}
.button {
  background: rgba(58, 51, 140, 1);
}
ul {
  padding: 1% 4%;
}
ul li {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
</style>