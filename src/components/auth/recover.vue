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
          <Input prefix="ios-key-outline" placeholder="请输入验证码" v-model="code" size="large" />
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
          <div style="margin-top: 3vh;">
            <Button long size="large" class="smsBtn">恢复帐户</Button>
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
export default {
  data() {
    return {
      codeSent: false,
      phone: "",
      hash: "",
      code: "",
      password: "",
      cpassword: ""
    };
  },
  methods:{
    sendCode(){
      this.codeSent = true
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