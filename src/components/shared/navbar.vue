<template>
  <section class="navbar">
    <div class="backButton" v-if="showBack">
    <Icon type="md-arrow-round-back" class="backIcon" size="24" @click="goBack()" />
    </div>
    <h3 class="pageTitle">{{title}}</h3>
  </section>
</template>

<script>
export default {
  props: ['showBack' , 'title'],
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 8vh;
  width: 100%;
  padding: 2% 4%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid lightgray;
}
.backButton{
  align-self: center;
}
.backIcon {
  align-self: center;
}
.pageTitle {
  width: 80%;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  align-self: center;
  text-align: center;
}
</style>