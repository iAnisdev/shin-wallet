<template>
  <section class="recordPage">
    <navbar showBack="'true'" title="充值详情" />
    <CellGroup>
      <Cell title="代币类型" extra="SHIN" />
      <div class="line"></div>
      <Cell title="代币数量" :extra="getCurrentTrans.amount  | noToFIxed('6')" />
      <div class="line"></div>
      <Cell title="时间" :extra="getCurrentTrans.time | stringToFix('19')" />
      <div class="line"></div>
      <Cell title="时间" :extra="getCurrentTrans.type" />
      <div class="line"></div>
      <Cell title="到" :extra="getCurrentTrans.to" />
      <div class="line"></div>
      <Cell title="提币地址" :extra="getCurrentTrans.id" />
    </CellGroup>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    navbar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      getCurrentTrans: "getCurrentTrans"
    })
  },
  methods: {
    ...mapActions({
      toggelLoader: "toggelLoader",
      getSpecificTransaction: "getSpecificTransaction"
    })
  },
  mounted() {
    let that = this;
    let transId = that.$router.history.current.params.id;
    that.toggelLoader();
    let data = {
      id: transId
    };
    that
      .getSpecificTransaction(data)
      .then(res => {})
      .catch(err => {})
      .finally(() => {
        that.toggelLoader(false);
      });
  }
};
</script>


<style scoped>
.recordPage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.line {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.08;
}
</style>