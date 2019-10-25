<template>
  <section class="loginPage">
    <div class="layer">
      <h2 class="singupTitle">欢迎注册SHIN</h2>
      <div class="form">
        <Input prefix="ios-contact" placeholder="请输入用户名" v-model="userName" size="large" />
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-phone-portrait"
            type="number"
            placeholder="请输入手机号"
            v-model="phone"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input prefix="ios-key-outline" placeholder="请输入验证码" v-model="smsCode" size="large">
            <span slot="prepend">
              <Icon type="ios-key-outline" />
            </span>
            <span slot="append" class="sendSMSBtn">
              <Button @click="sendCode">获取验证码</Button>
            </span>
          </Input>
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            :type="inputType"
            on-click="togglepassword"
            placeholder="请输入密码"
            v-model="password"
            size="large"
          >
            <span slot="prepend">
              <Icon type="ios-lock" />
            </span>
            <span slot="append" @click="togglepassword">
              <Icon :type="eyeIcon" />
            </span>
          </Input>
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
        <div style="margin-top: 2vh">
          <Input prefix="ios-keypad" placeholder="请输入推荐码" v-model="refer" size="large" />
        </div>
        <div style="margin-top: 3vh;">
          <Button long size="large" class="signUpbtn" @click="registerUser">注册</Button>
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
import Cookies from "@/plugins/cookies";
export default {
  data() {
    return {
      userName: "",
      phone: "",
      smsCode: "",
      smsverify: "",
      password: "",
      cpassword: "",
      refer: "",
      //show and hide password
      inputType: "password",
      eyeIcon: "md-eye"
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
      userRegister: "userRegister",
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
        });
      } else {
        this.$Message.error({
          background: true,
          content: "Invalid phone number"
        });
      }
    },
    registerUser() {
      let that = this;
      if (!that.isValid(that.userName)) {
        this.$Message.error({
          background: true,
          content: "无效用户名"
        });
      } else if (!that.isValid(that.phone)) {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      } else if (!that.isValid(that.smsCode)) {
        this.$Message.error({
          background: true,
          content: "无效SMS 代码"
        });
      } else if (!that.isValid(that.smsverify)) {
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
      } else if (!that.isValid(that.refer)) {
        this.$Message.error({
          background: true,
          content: "无效复用代码"
        });
      } else {
        let data = {
          username: that.userName,
          country: "86",
          phone: that.phone,
          smscode: that.smsCode,
          smsverify: that.smsverify,
          refer: that.refer,
          password: that.password
        };
        that.toggelLoader();
        that
          .userRegister(data)
          .then(res => {
            that.toggelLoader();
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err.message
            });
            that.toggelLoader();
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
    },
    togglepassword() {
      let that = this
      if(that.inputType == "password"){
        that.inputType = 'text'
        that.eyeIcon = "md-eye-off"
      }else{
        that.inputType = 'password'
        that.eyeIcon = "md-eye"
      }
    }
  },
  mounted() {
    let that = this;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var referCode = url.searchParams.get("refer");
    if (referCode) {
      Cookies.setCookie("referCode", referCode, 24);
      that.refer = referCode;
    } else {
      let referCode = Cookies.getCookies("referCode");
      if (referCode) {
        that.refer = referCode;
      } else {
        console.log("no refer code");
      }
    }
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.layer {
  width: 100%;
  height: 92%;
  background: rgba(255, 255, 255, 1);
  padding: 12vh 1vw 2vh;
}
.singupTitle {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 45px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.form {
  background: rgba(255, 255, 255, 1);
  padding: 6vh 10%;
  opacity: 1;
}
.sendSMSBtn {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 18px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.signUpbtn {
  background: rgba(58, 51, 140, 1);
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