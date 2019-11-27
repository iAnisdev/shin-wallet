<template>
  <section class="loginPage">
    <div class="layer">
      <img src="@/assets/logo.png" class="logo" srcset />
      <div class="form">
        <!-- <Select v-model="loginMethod" placeholder="Login Method">
          <Option v-for="item in methodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>-->
        <div style="margin-top: 2vh" v-if="loginMethod == 'username'">
          <Input prefix="ios-contact" placeholder="请输入用户名" v-model="userName" size="large" />
        </div>
        <div style="margin-top: 2vh" v-if="loginMethod == 'phone'">
          <Input
            prefix="ios-phone-portrait"
            type="number"
            placeholder="请输入手机号"
            v-model="phone"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            size="large"
          />
        </div>
        <div style="margin-top: 3vh;">
          <Button long size="large" class="loginBtn" @click="login">登录</Button>
        </div>
      </div>
      <router-link to="/auth/recover">
        <h4 class="forgetPass">忘记密码?</h4>
      </router-link>
    </div>
    <div class="line"></div>
    <div class="footerRow">
      <h5 class="noAccount">还没有账号？</h5>
      <router-link to="/auth/signup">
        <h4 class="signup">立即注册</h4>
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      userName: "",
      password: "",
      phone: "",
      loginMethod: "username",
      methodList: [
        {
          label: "用户名登录",
          value: "username"
        },
        {
          label: "手机号登录",
          value: "phone"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus"
    })
  },
  methods: {
    ...mapActions({
      userLogin: "userLogin",
      toggelLoader: "toggelLoader"
    }),
    login() {
      let that = this;
      let data = {};
      let loginMethod = that.loginMethod;
      if (loginMethod == "username") {
        if (!that.isValid(that.userName)) {
          this.$Message.error({
            background: true,
            content: "无效用户名"
          });
          return;
        } else {
          data.username = that.userName;
        }
      } else {
        if (!that.isValid(that.phone)) {
          this.$Message.error({
            background: true,
            content: "无效电话号码"
          });
          return;
        } else {
          data.phone = that.phone;
          data.country = "86";
        }
      }
      if (!that.isValid(that.password)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else {
        data.password = that.password;
        that.toggelLoader();
        that
          .userLogin(data)
          .then(res => {
            that.toggelLoader();
          })
          .catch(err => {
            that.toggelLoader();
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
  },
  mounted() {}
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
  height: 92%;
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
  padding: 5% 10%;
  opacity: 1;
}
.loginBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.forgetPass {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.line {
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.24;
}
.footerRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2vh 5vw;
}
.noAccount {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 18px;
  color: rgba(93, 93, 93, 1);
  opacity: 1;
}
.signup {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 18px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
</style>