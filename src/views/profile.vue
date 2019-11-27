<template>
  <section class="profilePage">
    <navbar showBack="'true'" title="个人信息" />
    <CellGroup>
      <Cell title="用户名" :extra="userData.username" />
      <div class="cellLine"></div>
      <Cell title="推荐码" :extra="userData.uid" />
      <div class="cellLine"></div>
      <Cell title="手机号" :extra="userData.phones[0].phone" />
      <div class="cellLine"></div>
    </CellGroup>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  name: "Profile",
  components: {
    navbar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userData: "userData"
    })
  }
};
</script>
<style scoped>
.profilePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.cellLine {
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
}
</style>
