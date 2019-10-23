<template>
  <section class="scanPage">
    <navbar showBack="'true'" title="Scan Qrcode" />
    <div class="qrcodeScan">

    <qrcode-stream @decode="onDecode"></qrcode-stream>
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
    return {};
  },
  methods: {
    onDecode(decodedString) {
      this.$router.push(`/transfer?wallet=${decodedString}`)
    }
  }
};
</script>

<style scoped>
.scanPage{
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.qrcodeScan{
  width: 300px;
  height: 50vh;
  border: 2px solid black;
  margin: auto;
}
</style>