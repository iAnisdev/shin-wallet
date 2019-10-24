<template>
  <section class="transPage">
    <navbar showBack="'true'" title="交易" />
    <Tabs value="one">
      <TabPane label="充值记录" name="one">
        <div class="content" v-for="(tran , index) in transactionTostake" :key="index">
          <div class="transCard">
            <div class="cardContent">
              <div class="rowSP">
                <div class="row">
                  <h4 class="date">{{tran.time | stringToFix('19')}}</h4>
                </div>
                <h5 class="transStatus">{{tran.type | capitalize}}</h5>
              </div>
              <h4 class="tokenName">{{tran.symbol}}</h4>
              <div class="row">
                <h3 class="qty">数量：</h3>
                <h4 class="qtyAmount">{{tran.amount | noToFIxed('6')}}</h4>
              </div>
            </div>
            <div class="detialButton" @click="viewTransInfo(tran)">查看详情</div>
          </div>
        </div>
        <div class="content" v-if="transactionTostake.length == 0">
          <Card :bordered="false" style="margin-top: 1vh">
            <h3>无法查询到该笔交易</h3>
          </Card>
        </div>
      </TabPane>
      <TabPane label="提币记录" name="two">
        <div class="content" v-for="(tran , index) in transactionFromStake" :key="index">
          <div class="transCard">
            <div class="cardContent">
              <div class="rowSP">
                <div class="row">
                  <h4 class="date">{{tran.time | stringToFix('19')}}</h4>
                </div>
                <h5 class="transStatus">{{tran.type | capitalize}}</h5>
              </div>
              <h4 class="tokenName">SHIN</h4>
              <div class="rowSP">
                <div class="row">
                  <h3 class="qty">数量：</h3>
                  <h4 class="qtyAmount">{{tran.balance | noToFIxed('5')}}</h4>
                </div>
                <div class="row">
                  <h3 class="tfeeTitle">数量：</h3>
                  <h4 class="qtyAmount">{{tran.amount | noToFIxed('5')}}</h4>
                </div>
              </div>
            </div>
            <div class="detialButton" @click="viewTransInfo(tran)">查看详情</div>
          </div>
        </div>
        <div class="content" v-if="transactionFromStake.length == 0">
          <Card :bordered="false" style="margin-top: 1vh">
            <h3>无法查询到该笔交易</h3>
          </Card>
        </div>
      </TabPane>
    </Tabs>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      transactionTostake: [],
      transactionFromStake: []
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userAddress: "getUserAddress",
      userSAddress: "getUserSAddress"
    })
  },
  methods: {
    ...mapActions({
      toggelLoader: "toggelLoader",
      transactionsList: "transactionsList",
      setCurrentTransaction: "setCurrentTransaction"
    }),
    viewTransInfo(trans) {
      let that = this;
      that.setCurrentTransaction(trans).then(() => {
        that.$router.push(`/record/$trans.id`);
      });
      console.log("trans ", trans);
    }
  },
  mounted() {
    let that = this;
    let data = {
      address: that.userAddress,
      type: "tostake"
    };
    that
      .transactionsList(data)
      .then(res => {
        that.transactionTostake = res.result;
        return that.transactionsList({
          address: that.userAddress,
          type: "service"
        });
      })
      .then(toStackRes => {
        that.transactionFromStake = toStackRes.result;
      })
      .catch(err => {
        console.log("error ", err);
      });
  }
};
</script>

<style scoped>
.transPage {
  width: 100%;
  min-height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 1% 5%;
}
.transCard {
  width: 316px;
  height: 98px;
  align-self: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cardContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2% 4%;
}
.rowSP {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.date {
  width: 140px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 600;
  display: block;
  color: rgba(0, 0, 0, 1);
  opacity: 0.32;
}
.transStatus {
  width: 100px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  opacity: 0.72;
  margin-left: 25%;
}
.detialButton {
  width: 10%;
  padding: 2% 2%;
  height: 100%;
  background: rgba(58, 51, 140, 1);
  opacity: 1;
  border-radius: 0px 12px 12px 0px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  text-align: center;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 18px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.tokenName {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 25px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.qty {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  align-self: center;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.qtyAmount {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  align-self: center;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.tfeeTitle {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  align-self: center;
  color: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
.feeAmount {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  align-self: center;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
</style>