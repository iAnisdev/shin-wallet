<template>
  <section class="loginPage">
    <div class="layer">
      <img src="@/assets/logo.png" class="logo" srcset />
      <div class="form">
        <div v-if="!codeSent">
          <Input
            prefix="ios-phone-portrait"
            placeholder="请输入手机号"
            type="number"
            v-model="phone"
            size="large"
          />
          <div style="margin-top: 3vh;">
            <Button long size="large" class="smsBtn" @click="sendCode">获取验证码</Button>
          </div>
        </div>
        <div v-if="codeSent">
          <Input prefix="ios-key-outline" placeholder="请输入验证码" v-model="smsCode" size="large" />
          <div style="margin-top: 2vh">
            <Input
              prefix="ios-lock"
              type="password"
              placeholder="输入新密码"
              v-model="password"
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
          <div style="margin-top: 3vh;" v-if="!codeSent">
            <Button long size="large" class="smsBtn">获取验证码</Button>
          </div>
          <div style="margin-top: 3vh;" v-if="codeSent">
            <Button long size="large" type="success" class="recoverBtn" @click="recover">恢复帐户</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="footerRow">
      <h5 class="alreadyRegistered">已有账号，</h5>
      <router-link to="/auth/login">
        <h4 class="login">立即登录</h4>
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      codeSent: false,
      phone: "",
      smsverify: "",
      smsCode: "",
      password: "",
      cpassword: ""
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus"
    })
  },
  methods: {
    ...mapActions({
      sendSMSCode: "sendSMSCode",
      userLogin: "userLogin",
      changePassword: "changePassword",
      toggelLoader: "toggelLoader"
    }),
    sendCode() {
      let that = this;
      if (that.isValid(that.phone)) {
        that.toggelLoader();
        let data = {
          phone: that.phone
        };
        that.sendSMSCode(data).then(res => {
          that.smsverify = res.result.smsverify;
          that.toggelLoader();
          that.codeSent = true;
        });
      } else {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      }
    },
    recover() {
      let that = this;
      if (!that.isValid(that.smsCode)) {
        this.$Message.error({
          background: true,
          content: "无效验证码"
        });
      } else if (!that.isValid(that.password)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.password !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else {
        that.toggelLoader();
        let data = {
          phone: that.phone,
          smscode: that.smsCode,
          smsverify: that.smsverify,
          new: that.password
        };
        that
          .changePassword(data)
          .then(res => {
            return that.userLogin({
              phone: data.phone,
              password: data.new
            });
          })
          .then(res => {
            that.toggelLoader();
            this.$Message.success({
              background: true,
              content: "更新密码"
            });
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
  padding: 8% 10%;
  opacity: 1;
}
.smsBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.recoverBtn {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
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
.alreadyRegistered {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 18px;
  color: rgba(93, 93, 93, 1);
  opacity: 1;
}
.login {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 18px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
</style>