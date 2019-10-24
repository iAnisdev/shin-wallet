<template>
  <section class="loginPage">
    <navbar showBack="'true'" title="更新密码" />
    <div class="layer">
      <div class="form">
        <div style="margin-top: 2vh">
          <Input prefix="ios-lock" type="password" placeholder="输入旧密码" v-model="old" size="large" />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="password"
            placeholder="输入新密码"
            v-model="newPassword"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="password"
            placeholder="确认新密码"
            v-model="cpassword"
            size="large"
          />
        </div>
        <Button long size="large" type="success" class="recoverBtn" @click="updatePassword">更新密码</Button>
      </div>
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
    return {
      old: "",
      newPassword: "",
      cpassword: ""
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken"
    })
  },
  methods: {
    ...mapActions({
      changePassword: "changePassword",
      toggelLoader: "toggelLoader"
    }),
    updatePassword() {
      let that = this;
      if (!that.isValid(that.old)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.newPassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.newPassword !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else {
        let data = {
          token: that.userToken,
          old: that.old,
          new: that.newPassword
        };
        that
          .changePassword(data)
          .then(res => {
            console.log(res);
            this.$Message.success({
              background: true,
              content: "更新密码"
            });
            that.$router.push("/me");
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err.message
            });
          });
      }
    },
    isValid(value) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  /* background-image: url("~@/assets/bg.jpeg"); */
  background-size: cover;
}
.layer {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  /* opacity: 0.8; */
  padding: 12vh 1vw 2vh;
}
.logo {
  width: 120px;
  height: 150px;
}
.form {
  background: rgba(255, 255, 255, 1);
  padding: 8% 10%;
  opacity: 1;
}
.recoverBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 2vh;
}
</style>