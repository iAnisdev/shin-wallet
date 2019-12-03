<template>
  <section class="scanPage">
    <navbar showBack="'true'" title="Scan Qrcode" />
    <div class="qrcodeScan" v-if="tpassSet">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
    <div v-if="!tpassSet" class="tpassUI">
      <h4 class="tpassUIInfo">请先设置交易密码</h4>

      <div style="margin-top: 2vh">
        <Button long size="large" type="success" class="btn" @click="setPasswordNow">现在设置交易密码</Button>
      </div>
    </div>
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
      tpassSet: 0
    };
  },
  computed: {
    ...mapGetters({
      userData: "userData"
    })
  },
  methods: {
    onDecode(decodedString) {
      this.$router.push(`/transfer?wallet=${decodedString}`);
    },
    setPasswordNow() {
      let that = this;
      that.$router.push({
        name: "changeTPassword"
      });
    }
  },
  watch: {
    userData(newVal, oldVal) {
      let that = this;
      if (newVal) {
        that.tpassSet = newVal.tpass;
      }
    }
  },
  mounted() {
    let that = this;
    that.tpassSet = that.userData.tpass;
  }
};
</script>

<style scoped>
.scanPage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.qrcodeScan {
  width: 300px;
  height: 40vh;
  border: 2px solid black;
  margin: auto;
}
.tpassUI {
  width: 100%;
  height: 80%;
  text-align: left;
  background: rgba(247, 247, 247, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10% 10%;
}
.tpassUIInfo {
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: 600;
  color: red;
  opacity: 1;
}
</style>