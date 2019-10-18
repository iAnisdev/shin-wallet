<template>
  <section class="addWalletPage">
    <navbar showBack="'true'" title="添加钱包地址" />
    <div class="selectionBox">
      <Select v-model="currency" placeholder="选择币种">
        <Option v-for="item in coinList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="content">
      <Input v-model="walletAddr" placeholder="输入或粘贴地址" />
      <div style="margin-top: 1vh">
      <Input v-model="remarks" placeholder="备注钱包地址，以便记录" />
      </div>
      <div style="margin-top: 10vh">
      <Button size="large" long class="button">确定</Button>
      </div>
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
      coinList: [
          {
              label: 'USDT',
              value: 'USDT'
          },
          {
              label: 'ETH',
              value: 'ETH'
          },
          {
              label: 'BTC',
              value: 'BTC'
          },
          {
              label: 'SHIN',
              value: 'SHIN'
          }
      ],
      currency: "",
      walletAddr: '',
      remarks:''
    };
  }
};
</script>

<style scoped>
.addWalletPage {
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
.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5% 8%;
}
.button {
  background: rgba(58, 51, 140, 1);
  margin-top: 2vh;
  color: #fff;
}

</style>