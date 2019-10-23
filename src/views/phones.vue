<template>
  <section class="phonePage">
    <navbar showBack="'true'" title="Registed Phone Numbers" />
    <div class="content">
      <Card
        :bordered="false"
        v-for="(phone , index) in userData.phones"
        :key="index"
        style="margin-top: 1vh"
      >
        <div class="rowSB">
          <p>+{{phone.country}}{{phone.phone}}</p>
          <Icon type="ios-trash" size="24" color="red" @click="deletePhone(phone)" />
        </div>
      </Card>
      <Card :bordered="false" style="margin-top: 1vh" to="/phone/add">
        <div class="rowCenter">
          <Icon type="md-add" size="40" color="lightblue" />
        </div>
      </Card>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar: navbar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userData: "userData"
    })
  },
  methods: {
    ...mapActions({
      toggelLoader: "toggelLoader",
      getUserData: "getUserData",
      deleteUserPhoneNumber: "deleteUserPhoneNumber"
    }),
    deletePhone(phone) {
      let that = this;
      let data = phone;
      data.token = that.userToken;
      that.toggelLoader();
      that
        .deleteUserPhoneNumber(data)
        .then(res => {
          that.toggelLoader();
          that.$Message.success({
            background: true,
            content: "Phone Number deleted"
          });
          this.getUserData({token: that.userToken});
        })
        .catch(err => {
          that.toggelLoader();
          that.$Message.error({
            background: true,
            content: err.message
          });
        });
    }
  },
  mounted() {
    let that = this;
    let data = {
      token: that.userToken
    };
    this.getUserData(data);
  }
};
</script>

<style scoped>
.phonePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(247, 247, 247, 1);
}
.content {
  background: #eee;
  padding: 10px;
  height: 100%;
}
.rowSB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rowCenter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid lightblue;
}
</style>